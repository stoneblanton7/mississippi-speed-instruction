import crypto from 'node:crypto';
import { createReadStream, existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const port = Number(process.env.PORT || 80);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function writeRuntimeConfig() {
  const config = `window.__MSI_CONFIG__ = {\n  N8N_CONTACT_WEBHOOK_URL: "${process.env.N8N_CONTACT_WEBHOOK_URL || ''}"\n};\n`;
  await writeFile(path.join(distDir, 'config.js'), config);
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
}

async function readJson(req) {
  const chunks = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

async function handleSubscribe(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    return sendJson(res, 400, { error: 'Invalid JSON' });
  }

  const { email, first_name, parent_type } = body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return sendJson(res, 400, { error: 'Valid email required' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    return sendJson(res, 500, { error: 'Mailchimp not configured' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const subscriberHash = crypto
    .createHash('md5')
    .update(normalizedEmail)
    .digest('hex');

  const tagMap = {
    boys_parent: ['general', 'boys_parent'],
    girls_parent: ['general', 'girls_parent'],
    both_parent: ['general', 'boys_parent', 'girls_parent'],
    future_parent: ['general', 'future_parent'],
  };
  const tags = tagMap[parent_type] || ['general'];

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: normalizedEmail,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: first_name || '',
          PTYPE: parent_type || 'general',
        },
        tags,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Mailchimp error:', data);
      return sendJson(res, response.status, {
        error: data.detail || 'Subscription failed',
      });
    }

    return sendJson(res, 200, { success: true, email: normalizedEmail });
  } catch (err) {
    console.error('Subscribe error:', err);
    return sendJson(res, 500, { error: 'Internal error' });
  }
}

function serveFile(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const requestedPath = decodeURIComponent(url.pathname);
  const safePath = path.normalize(requestedPath).replace(/^([/\\])+/, '');
  const filePath = path.join(distDir, safePath || 'index.html');
  const resolvedPath = existsSync(filePath) && !filePath.endsWith(path.sep)
    ? filePath
    : path.join(distDir, 'index.html');
  const ext = path.extname(resolvedPath);
  const isRuntimeConfig = path.basename(resolvedPath) === 'config.js';

  res.writeHead(200, {
    'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    'Cache-Control': isRuntimeConfig
      ? 'no-store, no-cache, must-revalidate, proxy-revalidate'
      : ext === '.html'
        ? 'no-cache'
        : 'public, max-age=31536000, immutable',
  });

  createReadStream(resolvedPath).pipe(res);
}

await writeRuntimeConfig();

createServer((req, res) => {
  if (req.url?.startsWith('/api/subscribe')) {
    handleSubscribe(req, res);
    return;
  }

  serveFile(req, res);
}).listen(port, '0.0.0.0', () => {
  console.log(`MSI server listening on ${port}`);
});
