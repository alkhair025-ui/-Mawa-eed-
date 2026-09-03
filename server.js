import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import businessesHandler from './api/businesses.js';
import servicesHandler from './api/services.js';
import staffHandler from './api/staff.js';
import appointmentsHandler from './api/appointments.js';
import statsHandler from './api/stats.js';
import ledgerHandler from './api/ledger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Parse JSON bodies for API routes.
app.use(express.json({ limit: '10mb' }));

// --- API routes (must be mounted BEFORE static serving so /api is not shadowed) ---
app.all('/api/health', (_req, res) => res.json({ ok: true, ts: Date.now() }));
app.all('/api/businesses', businessesHandler);
app.all('/api/services', servicesHandler);
app.all('/api/staff', staffHandler);
app.all('/api/appointments', appointmentsHandler);
app.all('/api/stats', statsHandler);
app.all('/api/ledger', ledgerHandler);

// --- Static production build ---
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath, { index: 'index.html' }));

// --- SPA fallback: any non-API, non-static route returns the app shell ---
app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Mawa'eed server listening on :${port}`);
});

export default app;
