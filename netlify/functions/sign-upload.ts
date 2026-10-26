import { createHash } from "node:crypto";

/**
 * Signs a Cloudinary image upload for the /admin page, so the API secret stays
 * on the server. The caller sends their Firebase ID token; only admins may read
 * config/admins under the Firestore rules, so a successful read with that token
 * is the admin check, and Firestore stays the single source of who is an admin.
 *
 * Runs as a Netlify Function in production and through the dev server locally
 * (see vite.config.ts). Needs CLOUDINARY_URL and VITE_FIREBASE_PROJECT_ID.
 */
export const UPLOAD_FOLDER = "portfolio/works";

export default async function signUpload(request: Request): Promise<Response> {
  if (request.method !== "POST") return Response.json({ error: "Use POST." }, { status: 405 });

  const token = request.headers.get("authorization")?.match(/^Bearer (.+)$/)?.[1];
  if (!token) return Response.json({ error: "Sign in first." }, { status: 401 });

  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  const credentials = process.env.CLOUDINARY_URL?.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
  if (!projectId || !credentials) {
    return Response.json({ error: "Uploads aren't configured on the server." }, { status: 500 });
  }
  const [, apiKey, apiSecret, cloudName] = credentials;

  const adminCheck = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/config/admins`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!adminCheck.ok) return Response.json({ error: "This account can't upload images." }, { status: 403 });

  // Cloudinary signs the alphabetically sorted parameters followed by the secret.
  const timestamp = Math.round(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`folder=${UPLOAD_FOLDER}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  return Response.json({ cloudName, apiKey, folder: UPLOAD_FOLDER, timestamp, signature });
}

export const config = { path: "/api/sign-upload" };
