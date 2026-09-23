import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Pxxl binds to PORT environment variable or container port (e.g. 8888 or 3000)
const PORT = Number(process.env.PORT) || 8888;
const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Lightweight health check endpoint for Pxxl and container orchestration
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Serve static assets from the Vite build output (dist)
app.use(express.static(distPath, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    // Cache service worker & manifest with zero cache to ensure immediate updates
    if (filePath.endsWith('sw.js') || filePath.endsWith('manifest.webmanifest')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// SPA catch-all fallback: route everything to index.html for client-side routing
app.get('*', (_req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(503).send('Application is building. Please refresh in a few moments.');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HurtBreak server running on http://0.0.0.0:${PORT}`);
});
