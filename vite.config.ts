import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function inlineLocalImages(html: string, publicDir: string): string {
  return html.replace(
    /(<img[^>]+src=")([^"]+)("[^>]*>)/gi,
    (match, before, src, after) => {
      if (src.startsWith("data:") || src.startsWith("http")) return match;
      const filePath = path.join(publicDir, src);
      if (!fs.existsSync(filePath)) return match;
      const ext = path.extname(filePath).toLowerCase();
      const mime = MIME[ext];
      if (!mime) return match;
      const base64 = fs.readFileSync(filePath).toString("base64");
      return `${before}data:${mime};base64,${base64}${after}`;
    }
  );
}

function parseBody(req: any): Promise<string> {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk: any) => (body += chunk));
    req.on("end", () => resolve(body));
  });
}

function emailApiPlugin() {
  return {
    name: "email-api",
    configureServer(server: any) {
      // Force full reload when template or email component files change
      // (React Fast Refresh can't propagate updates through import.meta.glob)
      const watchPaths = [
        path.resolve(__dirname, "src/templates"),
        path.resolve(__dirname, "src/components/email"),
      ];
      server.watcher.on("change", (filePath: string) => {
        if (watchPaths.some((dir) => filePath.startsWith(dir))) {
          server.hot.send({ type: "full-reload" });
        }
      });

      // Export HTML to output/
      server.middlewares.use("/api/export", async (req: any, res: any) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          return res.end("Method not allowed");
        }
        try {
          const { fileName, html } = JSON.parse(await parseBody(req));
          const publicDir = path.resolve(__dirname, "public");
          const finalHtml = inlineLocalImages(html, publicDir);
          const outputDir = path.resolve(__dirname, "output");
          if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
          const filePath = path.join(outputDir, `${fileName}.html`);
          fs.writeFileSync(filePath, finalHtml, "utf-8");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: true, path: filePath }));
        } catch (e: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      });

      // Create new template from scaffold
      server.middlewares.use("/api/create-template", async (req: any, res: any) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          return res.end("Method not allowed");
        }
        try {
          const { slug, name, description, title, preview } = JSON.parse(await parseBody(req));

          const templateDir = path.resolve(__dirname, "src/templates", slug);
          if (fs.existsSync(templateDir)) {
            res.statusCode = 409;
            return res.end(JSON.stringify({ error: `Le template "${slug}" existe déjà.` }));
          }

          fs.mkdirSync(templateDir, { recursive: true });

          const today = new Date().toISOString().slice(0, 10);
          const meta = { name, description, createdAt: today };
          fs.writeFileSync(
            path.join(templateDir, "meta.json"),
            JSON.stringify(meta, null, 2) + "\n",
            "utf-8"
          );

          const escapedTitle = title.replace(/`/g, "\\`").replace(/\$/g, "\\$");
          const escapedPreview = preview.replace(/`/g, "\\`").replace(/\$/g, "\\$");

          const indexContent = `import EmailLayout from "../../components/email/EmailLayout";
import EmailHeader from "../../components/email/EmailHeader";
import EmailFooter from "../../components/email/EmailFooter";
import EmailBody, {
  EmailText,
  EmailHeading,
} from "../../components/email/EmailBody";
import EmailButton from "../../components/email/EmailButton";

const CAMPAIGN = "${slug}";

export default function ${toPascalCase(slug)}Email() {
  return (
    <EmailLayout campaign={CAMPAIGN} preview="${escapedPreview}">
      <EmailHeader campaign={CAMPAIGN} title="${escapedTitle}" />
      <EmailBody>
        <EmailHeading>Bonjour !</EmailHeading>
        <EmailText>
          Ceci est le contenu de votre email. Modifiez ce fichier dans votre
          éditeur pour personnaliser le message.
        </EmailText>
        <div style={{ textAlign: "center", margin: "24px 0" }}>
          <EmailButton campaign={CAMPAIGN} href="https://plan-appetit.fr">
            Découvrir Plan'Appétit
          </EmailButton>
        </div>
      </EmailBody>
      <EmailFooter campaign={CAMPAIGN} />
    </EmailLayout>
  );
}
`;

          fs.writeFileSync(path.join(templateDir, "index.tsx"), indexContent, "utf-8");

          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: true, slug }));
        } catch (e: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    },
  };
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join("");
}

export default defineConfig({
  plugins: [react(), tailwindcss(), emailApiPlugin()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/email"),
      "@templates": path.resolve(__dirname, "src/templates"),
    },
  },
});
