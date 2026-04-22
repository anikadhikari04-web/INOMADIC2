import { defineConfig, loadEnv } from "vite";
import { Resend } from "resend";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-contact-stub',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/contact' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk.toString(); });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body);
                  const resend = new Resend(env.RESEND_API_KEY);
                  const result = await resend.emails.send({
                    from: 'INOMADIC Studio <onboarding@resend.dev>',
                    to: ['innomadic.official@gmail.com'],
                    subject: `New Project Inquiry from ${data.name}`,
                    text: `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`,
                  });
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, ...result }));
                } catch(e) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: String(e) }));
                }
              });
              return;
            }
            
            // LOCAL SERVERLESS STUB FOR MULTIPART PORTFOLIO FORM
            if (req.url === '/api/portfolio' && req.method === 'POST') {
              let body = Buffer.alloc(0);
              req.on('data', chunk => { body = Buffer.concat([body, chunk]); });
              req.on('end', async () => {
                try {
                  const text = body.toString('utf-8');
                  // Rough hacky regex extractor just for extracting simple strings from local multipart streams.
                  // Real vercel environments use Native Request.formData() inside api/portfolio.ts
                  const extract = (field: string) => {
                    const regex = new RegExp(`name="${field}"(?:\\r\\n|\\n){2}([\\s\\S]*?)(?:\\r\\n|\\n)------WebKitFormBoundary`, 'i');
                    const match = text.match(regex);
                    return match ? match[1].trim() : '';
                  };
                  
                  const data = {
                    name: extract('name'),
                    email: extract('email'),
                    message: extract('message'),
                    portfolioLink: extract('portfolioLink')
                  };
                  
                  let emailText = `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`;
                  if (data.portfolioLink) emailText += `\nPortfolio Link: ${data.portfolioLink}`;

                  const resend = new Resend(env.RESEND_API_KEY);
                  const result = await resend.emails.send({
                    from: 'INOMADIC Studio <onboarding@resend.dev>',
                    to: ['innomadic.official@gmail.com'],
                    subject: `New Portfolio Submission from ${data.name}`,
                    text: emailText,
                  });
                  
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, ...result }));
                } catch(e) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, message: String(e) }));
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },
  };
});
