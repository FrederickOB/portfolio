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

export default defineConfig(({ mode }) => {
  // Functions read server-only settings (like CLOUDINARY_URL) from process.env.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

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
