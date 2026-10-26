/**
 * Chooses which Google accounts can edit the portfolio from /admin.
 *
 *   bun run admin:add you@example.com
 *   bun run admin:remove old@example.com
 *
 * Writes the email into config/admins, which the Firestore rules check before
 * any write and the upload-signing function checks before any upload. Uses the
 * same service account key as the seed script (GOOGLE_APPLICATION_CREDENTIALS).
 */
import { readFileSync } from "node:fs";
import { applicationDefault, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const removing = process.argv.includes("--remove");
const email = process.argv.slice(2).find((arg) => !arg.startsWith("--"))?.trim().toLowerCase();
if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
  throw new Error(`Usage: bun run admin:${removing ? "remove" : "add"} you@example.com`);
}

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!keyPath) throw new Error("Set GOOGLE_APPLICATION_CREDENTIALS to your service account key file.");
const projectId: string = JSON.parse(readFileSync(keyPath, "utf8")).project_id;
if (projectId !== process.env.VITE_FIREBASE_PROJECT_ID) {
  throw new Error(`The key is for "${projectId}" but .env.local points the site at "${process.env.VITE_FIREBASE_PROJECT_ID}".`);
}

initializeApp({ credential: applicationDefault(), projectId });
const db = getFirestore();
// REST instead of gRPC: grpc-js crashes on Bun's HTTP/2 implementation.
db.settings({ preferRest: true });

await db
  .doc("config/admins")
  .set({ emails: removing ? FieldValue.arrayRemove(email) : FieldValue.arrayUnion(email) }, { merge: true });
const { emails } = (await db.doc("config/admins").get()).data() as { emails: string[] };
console.log(`Admins for ${projectId}: ${emails.join(", ")}`);
