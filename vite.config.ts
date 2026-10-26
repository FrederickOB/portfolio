import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Serves the Netlify Functions in netlify/functions on the dev server too, so
 * `bun run dev` behaves like production without the Netlify CLI.
 */
function netlifyFunctionsInDev(routes: Record<string, string>): Plugin {
  return {
    name: "netlify-functions-in-dev",
    configureServer(server) {
      for (const [route, file] of Object.entries(routes)) {
        server.middlewares.use(route, async (req, res) => {
          const { default: handler } = await server.ssrLoadModule(file);
          const headers = new Headers();
          for (const [key, value] of Object.entries(req.headers)) {
            if (typeof value === "string") headers.set(key, value);
          }
          const response: Response = await handler(
            new Request(`http://localhost${req.originalUrl ?? route}`, { method: req.method, headers }),
          );
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(await response.text());
        });
      }
    },
  };
}

/** The site can't reach Firebase without these, and Vite bakes them in at build time. */
const FIREBASE_SETTINGS = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_APP_ID",
];

export default defineConfig(({ command, mode }) => {
  // Functions read server-only settings (like CLOUDINARY_URL) from process.env.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  // Changing these on Netlify only takes effect in the next build, so fail
  // loudly rather than deploy a site that can't load anything.
  if (command === "build") {
    const missing = FIREBASE_SETTINGS.filter((name) => !process.env[name]);
    if (missing.length) {
      throw new Error(
        `Missing ${missing.join(", ")}. On Netlify add them under Site configuration → Environment variables (scope must include Builds), then redeploy.`,
      );
    }
    console.log(`Building for Firebase project ${process.env.VITE_FIREBASE_PROJECT_ID}`);
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      netlifyFunctionsInDev({ "/api/sign-upload": "/netlify/functions/sign-upload.ts" }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
