// One-off importer: pushes the 2026 + 2025 boys camp CSVs into Mailchimp.
// Reads .env at the repo root. Run with: node scripts/mailchimp-import.mjs
// Safe to re-run: PUT upserts merge fields, tag POST adds without duplicating.

import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

function loadDotenv() {
  const raw = readFileSync(join(REPO_ROOT, '.env'), 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) process.env[m[1]] ??= m[2];
  }
}
loadDotenv();

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
const SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
if (!API_KEY || !AUDIENCE_ID || !SERVER) {
  throw new Error('Missing Mailchimp env vars in .env');
}
const BASE = `https://${SERVER}.api.mailchimp.com/3.0`;
const AUTH = `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`;

async function mc(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: AUTH },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  return { ok: res.ok, status: res.status, data };
}

const md5 = (s) => createHash('md5').update(s).digest('hex');

// --- CSV parser (handles quoted fields with embedded commas) ---
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* skip */ }
      else field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

function loadCsv(path) {
  const text = readFileSync(join(REPO_ROOT, path), 'utf8');
  const rows = parseCSV(text);
  const header = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, (r[i] ?? '').trim()])));
}

// --- Phase 2A: merge fields ---
const REQUIRED_MERGE_FIELDS = [
  { name: 'First Name', tag: 'FNAME', type: 'text' },
  { name: 'Last Name', tag: 'LNAME', type: 'text' },
  { name: 'Phone', tag: 'PHONE', type: 'phone' },
  { name: 'Athlete First Name', tag: 'AFNAME', type: 'text' },
  { name: 'Athlete Last Name', tag: 'ALNAME', type: 'text' },
  { name: 'Athlete Age', tag: 'AAGE', type: 'number' },
  { name: 'Athlete DOB', tag: 'ADOB', type: 'date' },
  { name: 'School', tag: 'SCHOOL', type: 'text' },
  { name: 'City', tag: 'CITY', type: 'text' },
  { name: 'State', tag: 'STATE', type: 'text' },
  { name: 'Zip', tag: 'ZIP', type: 'zip' },
  { name: 'Camp Year', tag: 'CAMPYEAR', type: 'number' },
  { name: 'Camp Cohort', tag: 'COHORT', type: 'text' },
  { name: 'Parent Type', tag: 'PTYPE', type: 'text' },
];

async function ensureMergeFields() {
  const { data } = await mc('GET', `/lists/${AUDIENCE_ID}/merge-fields?count=200`);
  const existing = new Set((data.merge_fields || []).map((f) => f.tag));
  let created = 0, kept = 0;
  for (const f of REQUIRED_MERGE_FIELDS) {
    if (existing.has(f.tag)) {
      kept++;
      console.log(`  · merge field ${f.tag} (${f.name}) already exists`);
      continue;
    }
    const res = await mc('POST', `/lists/${AUDIENCE_ID}/merge-fields`, {
      name: f.name, tag: f.tag, type: f.type, required: false, public: false,
    });
    if (res.ok) { created++; console.log(`  + created ${f.tag} (${f.name})`); }
    else console.error(`  ! failed ${f.tag}:`, res.data?.detail || res.data);
  }
  return { created, kept };
}

// --- helpers ---
function buildMergeFields(row, year, cohort) {
  const out = {
    FNAME: row['First Name'] || '',
    LNAME: row['Last Name'] || '',
    PHONE: row['Phone'] || '',
    AFNAME: row['Athlete First Name'] || '',
    ALNAME: row['Athlete Last Name'] || '',
    SCHOOL: row['School'] || '',
    CITY: row['City'] || '',
    STATE: row['State'] || '',
    ZIP: row['Zip'] || '',
    CAMPYEAR: Number(year),
    COHORT: cohort,
    PTYPE: 'boys_parent',
  };
  if (row['Athlete Age']) out.AAGE = Number(row['Athlete Age']);
  if (row['Athlete DOB']) out.ADOB = row['Athlete DOB']; // already YYYY-MM-DD
  return out;
}

async function upsertMember(row, year, cohort, extraTagName) {
  const email = (row['Email Address'] || '').toLowerCase().trim();
  if (!email) return { skipped: true };
  const hash = md5(email);
  const body = {
    email_address: email,
    status_if_new: 'subscribed',
    merge_fields: buildMergeFields(row, year, cohort),
    tags: ['past_boys_camp', extraTagName],
  };
  return mc('PUT', `/lists/${AUDIENCE_ID}/members/${hash}`, body);
}

async function addTagsOnly(email, tagNames) {
  const hash = md5(email);
  return mc('POST', `/lists/${AUDIENCE_ID}/members/${hash}/tags`, {
    tags: tagNames.map((name) => ({ name, status: 'active' })),
  });
}

async function memberExists(email) {
  const hash = md5(email);
  const res = await mc('GET', `/lists/${AUDIENCE_ID}/members/${hash}`);
  return res.status === 200;
}

// --- run ---
(async () => {
  console.log('\n=== Phase 2A: ensure merge fields ===');
  const mf = await ensureMergeFields();
  console.log(`  result: ${mf.created} created, ${mf.kept} pre-existing`);

  console.log('\n=== Phase 2B: import 2026 CSV ===');
  const rows2026 = loadCsv('data/mailchimp-import/MSI_2026_Boys_Camp_Participants.csv');
  let added2026 = 0, errs2026 = 0;
  for (const row of rows2026) {
    const email = (row['Email Address'] || '').toLowerCase().trim();
    if (!email) { console.log('  · skipped empty email row'); continue; }
    const res = await upsertMember(row, 2026, 'boys', 'boys_camp_2026');
    if (res.ok) {
      added2026++;
      console.log(`  + ${email}  (${row['Athlete First Name']} ${row['Athlete Last Name']})`);
    } else {
      errs2026++;
      console.error(`  ! ${email}:`, res.data?.detail || res.data?.title, '— row:', row);
    }
  }
  console.log(`  2026 done: ${added2026} ok, ${errs2026} errors (of ${rows2026.length} rows)`);

  console.log('\n=== Phase 2C: import 2025 CSV (preserve 2026 merge fields on repeats) ===');
  const rows2025 = loadCsv('data/mailchimp-import/MSI_2025_Boys_Camp_Participants.csv');
  let new2025 = 0, updated2025 = 0, errs2025 = 0;
  const seenThisRun = new Set(); // emails we already PUT or tagged this run
  for (const row of rows2025) {
    const email = (row['Email Address'] || '').toLowerCase().trim();
    if (!email) { console.log('  · skipped empty email row'); continue; }
    const exists = seenThisRun.has(email) || (await memberExists(email));
    if (exists) {
      const res = await addTagsOnly(email, ['past_boys_camp', 'boys_camp_2025']);
      if (res.ok) {
        updated2025++;
        seenThisRun.add(email);
        console.log(`  ~ tags only: ${email}  (${row['Athlete First Name']} ${row['Athlete Last Name']})`);
      } else {
        errs2025++;
        console.error(`  ! tag fail ${email}:`, res.data?.detail || res.data?.title);
      }
    } else {
      const res = await upsertMember(row, 2025, 'boys', 'boys_camp_2025');
      if (res.ok) {
        new2025++;
        seenThisRun.add(email);
        console.log(`  + ${email}  (${row['Athlete First Name']} ${row['Athlete Last Name']})`);
      } else {
        errs2025++;
        console.error(`  ! ${email}:`, res.data?.detail || res.data?.title);
      }
    }
  }
  console.log(`  2025 done: ${new2025} new, ${updated2025} tag-only, ${errs2025} errors (of ${rows2025.length} rows)`);

  console.log('\n=== Phase 2D: verify ===');
  const list = await mc('GET', `/lists/${AUDIENCE_ID}`);
  console.log(`  total member_count: ${list.data?.stats?.member_count}`);

  // Sample 3 contacts
  const sample = await mc('GET', `/lists/${AUDIENCE_ID}/members?count=3&fields=members.email_address,members.merge_fields,members.tags`);
  console.log('  sample contacts:');
  for (const m of sample.data.members || []) {
    const tags = (m.tags || []).map((t) => t.name).join(', ');
    const mf = m.merge_fields || {};
    console.log(`    ${m.email_address} | tags: [${tags}] | athlete=${mf.AFNAME} ${mf.ALNAME}, year=${mf.CAMPYEAR}, school=${mf.SCHOOL}`);
  }

  // Per-tag member counts via segments endpoint
  const seg = await mc('GET', `/lists/${AUDIENCE_ID}/segments?type=static&count=200`);
  const tagCounts = {};
  for (const s of seg.data.segments || []) tagCounts[s.name] = s.member_count;
  console.log('  tag counts:');
  for (const name of ['past_boys_camp', 'boys_camp_2026', 'boys_camp_2025']) {
    console.log(`    ${name}: ${tagCounts[name] ?? '(not found)'}`);
  }

  console.log('\n--- SUMMARY ---');
  console.log(JSON.stringify({
    merge_fields_created: mf.created,
    merge_fields_existing: mf.kept,
    contacts_2026_imported: added2026,
    contacts_2026_errors: errs2026,
    contacts_2025_new: new2025,
    contacts_2025_tag_only: updated2025,
    contacts_2025_errors: errs2025,
    total_members: list.data?.stats?.member_count,
    tag_counts: {
      past_boys_camp: tagCounts.past_boys_camp,
      boys_camp_2026: tagCounts.boys_camp_2026,
      boys_camp_2025: tagCounts.boys_camp_2025,
    },
  }, null, 2));
})().catch((e) => { console.error('FATAL:', e); process.exit(1); });
