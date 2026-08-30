import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.join(__dirname, 'dist');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  next();
});

app.get('/healthz', (_req, res) => {
  res.status(200).json({ ok: true, service: 'qubaisa-virtual-palace' });
});

app.use(express.static(distDir, {
  etag: true,
  index: false,
  setHeaders: (res, filePath) => {
    const normalized = filePath.replaceAll('\\', '/');

    if (normalized.endsWith('/index.html')) {
      res.setHeader('Cache-Control', 'no-store');
      return;
    }

    // Vite's /assets files are content-hashed and safe to cache indefinitely.
    if (normalized.includes('/assets/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return;
    }

    // Public 3D/media assets keep stable names, so use revalidation instead of a 1-year stale cache.
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
  },
}));

app.get('*', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Qubaisa Virtual Palace listening on 0.0.0.0:${PORT}`);
});
