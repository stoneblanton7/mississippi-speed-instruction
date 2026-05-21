// Uploads email-templates/msi-base.html to Mailchimp as a saved template.
// Re-running updates the existing "MSI Base" template in place.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

for (const line of readFileSync(join(REPO_ROOT, '.env'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] ??= m[2];
}

const API_KEY = process.env.MAILCHIMP_API_KEY;
const SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
const BASE = `https://${SERVER}.api.mailchimp.com/3.0`;
const AUTH = `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`;

async function mc(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: AUTH },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, data: text ? JSON.parse(text) : {} };
}

const TEMPLATE_NAME = 'MSI Base';
const html = readFileSync(join(REPO_ROOT, 'email-templates/msi-base.html'), 'utf8');

const list = await mc('GET', '/templates?type=user&count=200&fields=templates.id,templates.name');
const existing = (list.data.templates || []).find((t) => t.name === TEMPLATE_NAME);

if (existing) {
  console.log(`Updating existing template "${TEMPLATE_NAME}" (id=${existing.id})…`);
  const res = await mc('PATCH', `/templates/${existing.id}`, { name: TEMPLATE_NAME, html });
  if (!res.ok) { console.error('Update failed:', res.data); process.exit(1); }
  console.log(`✓ Updated. id=${res.data.id}, name="${res.data.name}"`);
} else {
  console.log(`Creating new template "${TEMPLATE_NAME}"…`);
  const res = await mc('POST', '/templates', { name: TEMPLATE_NAME, html });
  if (!res.ok) { console.error('Create failed:', res.data); process.exit(1); }
  console.log(`✓ Created. id=${res.data.id}, name="${res.data.name}"`);
}

console.log('\nFind it in Mailchimp at: Content → Email templates → Saved (filter by user templates).');
