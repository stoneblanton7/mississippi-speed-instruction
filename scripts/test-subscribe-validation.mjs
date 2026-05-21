// No-network validation tests for api/subscribe.js. Mocks global fetch so it
// never touches Mailchimp. Complements test-subscribe-handler.mjs (which does a
// real end-to-end create/delete against Mailchimp).
//
// Run: node scripts/test-subscribe-validation.mjs

import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const handler = (
  await import(pathToFileURL(join(REPO_ROOT, 'api/subscribe.js')).href)
).default;

let passed = 0;
let failed = 0;
function check(name, cond) {
  if (cond) {
    console.log(`  PASS  ${name}`);
    passed++;
  } else {
    console.error(`  FAIL  ${name}`);
    failed++;
  }
}

function mockRes() {
  return {
    statusCode: 200,
    body: null,
    status(c) {
      this.statusCode = c;
      return this;
    },
    json(p) {
      this.body = p;
      return this;
    },
  };
}

async function run(req) {
  const res = mockRes();
  await handler(req, res);
  return res;
}

// --- env-independent validation (runs before the Mailchimp config check) ---
delete process.env.MAILCHIMP_API_KEY;
delete process.env.MAILCHIMP_AUDIENCE_ID;
delete process.env.MAILCHIMP_SERVER_PREFIX;

check('rejects non-POST with 405', (await run({ method: 'GET', body: {} })).statusCode === 405);
check(
  'rejects missing email with 400',
  (await run({ method: 'POST', body: { first_name: 'A' } })).statusCode === 400
);
check(
  'rejects malformed email with 400',
  (await run({ method: 'POST', body: { email: 'not-an-email' } })).statusCode === 400
);
check(
  'rejects email with no TLD with 400',
  (await run({ method: 'POST', body: { email: 'a@b' } })).statusCode === 400
);

// --- missing Mailchimp config (valid email, no env) ---
{
  const res = await run({ method: 'POST', body: { email: 'parent@example.com' } });
  check(
    'rejects missing Mailchimp config with 500',
    res.statusCode === 500 && /not configured/i.test(res.body?.error || '')
  );
}

// --- valid path with mocked fetch ---
process.env.MAILCHIMP_API_KEY = 'test-key';
process.env.MAILCHIMP_AUDIENCE_ID = 'testaudience';
process.env.MAILCHIMP_SERVER_PREFIX = 'us00';

let captured = null;
function mockOkFetch() {
  globalThis.fetch = async (url, opts) => {
    captured = { url, opts };
    return {
      ok: true,
      status: 200,
      text: async () =>
        JSON.stringify({ id: 'abc', email_address: 'parent@example.com' }),
    };
  };
}

// 1. valid request normalizes input and sends the expected payload
mockOkFetch();
{
  captured = null;
  const res = await run({
    method: 'POST',
    body: { email: '  Parent@Example.com  ', first_name: '  Pat  ', parent_type: 'both_parent' },
  });
  const payload = captured ? JSON.parse(captured.opts.body) : {};
  check('valid request returns 200', res.statusCode === 200 && res.body?.success === true);
  check('response email trimmed + lowercased', res.body?.email === 'parent@example.com');
  check('PUT to members endpoint', captured?.opts?.method === 'PUT' && /\/members\//.test(captured.url));
  check('payload email normalized', payload.email_address === 'parent@example.com');
  check('first_name trimmed', payload.merge_fields?.FNAME === 'Pat');
  check(
    'both_parent maps to general+boys+girls tags',
    JSON.stringify(payload.tags) === JSON.stringify(['general', 'boys_parent', 'girls_parent'])
  );
}

// 2. unknown parent_type falls back to general
mockOkFetch();
{
  captured = null;
  const res = await run({
    method: 'POST',
    body: { email: 'parent2@example.com', parent_type: 'inject-me' },
  });
  const payload = captured ? JSON.parse(captured.opts.body) : {};
  check('unknown parent_type still returns 200', res.statusCode === 200);
  check(
    'unknown parent_type falls back to [general] tags',
    JSON.stringify(payload.tags) === JSON.stringify(['general'])
  );
  check('unknown parent_type stored as general PTYPE', payload.merge_fields?.PTYPE === 'general');
}

// 3. overly long first_name is capped
mockOkFetch();
{
  captured = null;
  await run({
    method: 'POST',
    body: { email: 'parent3@example.com', first_name: 'x'.repeat(500) },
  });
  const payload = captured ? JSON.parse(captured.opts.body) : {};
  check('first_name capped at 100 chars', (payload.merge_fields?.FNAME || '').length === 100);
}

// 3b. honeypot: a filled `website` field is silently accepted, never sent
{
  globalThis.fetch = async () => {
    throw new Error('fetch must not be called when honeypot is tripped');
  };
  const res = await run({
    method: 'POST',
    body: { email: 'bot@example.com', website: 'http://spam.example' },
  });
  check('honeypot returns 200 without contacting Mailchimp', res.statusCode === 200 && res.body?.success === true);
}

// 4. non-JSON upstream response returns 502 instead of throwing
{
  globalThis.fetch = async () => ({
    ok: true,
    status: 200,
    text: async () => '<html>502 Bad Gateway</html>',
  });
  const res = await run({ method: 'POST', body: { email: 'parent4@example.com' } });
  check('non-JSON upstream returns 502 (no crash)', res.statusCode === 502);
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
