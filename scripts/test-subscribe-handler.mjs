// Invokes api/subscribe.js directly with a mock req/res. Validates that the
// real Vercel handler successfully creates a contact in Mailchimp and is
// then deleted. Runs without needing `vercel dev`.

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

// load .env
for (const line of readFileSync(join(REPO_ROOT, '.env'), 'utf8').split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] ??= m[2];
}

const handler = (await import(pathToFileURL(join(REPO_ROOT, 'api/subscribe.js')).href)).default;

const TEST_EMAIL = 'stoneblanton7+msi-claude-test@gmail.com';

function mockRes() {
  const res = {
    statusCode: 200,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  return res;
}

// --- exercise handler ---
const req = {
  method: 'POST',
  body: { email: TEST_EMAIL, first_name: 'Test', parent_type: 'future_parent' },
};
const res = mockRes();
await handler(req, res);
console.log(`handler returned status=${res.statusCode}`, JSON.stringify(res.body));

if (res.statusCode !== 200) {
  console.error('FAIL: handler did not return 200');
  process.exit(1);
}

// --- verify Mailchimp side ---
const KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
const auth = `Basic ${Buffer.from(`anystring:${KEY}`).toString('base64')}`;
const hash = createHash('md5').update(TEST_EMAIL.toLowerCase()).digest('hex');

const r = await fetch(`https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE}/members/${hash}?fields=email_address,merge_fields,tags,status`, { headers: { Authorization: auth } });
const member = await r.json();
console.log('mailchimp record:', JSON.stringify({
  email: member.email_address,
  status: member.status,
  fname: member.merge_fields?.FNAME,
  ptype: member.merge_fields?.PTYPE,
  tags: (member.tags || []).map((t) => t.name),
}));

const tags = (member.tags || []).map((t) => t.name);
const hasGeneral = tags.includes('general');
const hasFuture = tags.includes('future_parent');
console.log(`tags include 'general': ${hasGeneral}, 'future_parent': ${hasFuture}`);

// --- delete test contact ---
const del = await fetch(`https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE}/members/${hash}/actions/delete-permanent`, { method: 'POST', headers: { Authorization: auth } });
console.log(`delete status=${del.status} (expect 204)`);

if (hasGeneral && hasFuture && del.status === 204) {
  console.log('\nALL CHECKS PASSED');
} else {
  console.error('\nONE OR MORE CHECKS FAILED');
  process.exit(1);
}
