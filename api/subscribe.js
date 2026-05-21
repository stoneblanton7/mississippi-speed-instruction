import crypto from 'node:crypto';

// Parent types the newsletter form can send. Anything else is treated as a
// plain "general" subscriber rather than trusted blindly.
const ALLOWED_PARENT_TYPES = new Set([
  'boys_parent',
  'girls_parent',
  'both_parent',
  'future_parent',
]);

const TAG_MAP = {
  boys_parent: ['general', 'boys_parent'],
  girls_parent: ['general', 'girls_parent'],
  both_parent: ['general', 'boys_parent', 'girls_parent'],
  future_parent: ['general', 'future_parent'],
};

// Modest email check — something@something.tld, no whitespace. Not RFC-perfect
// on purpose; Mailchimp does the authoritative validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 100;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};

  const email =
    typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const firstName =
    typeof body.first_name === 'string'
      ? body.first_name.trim().slice(0, MAX_NAME_LENGTH)
      : '';
  // Unknown/missing parent types fall back to a general subscriber.
  const parentType = ALLOWED_PARENT_TYPES.has(body.parent_type)
    ? body.parent_type
    : 'general';

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    return res.status(500).json({ error: 'Mailchimp not configured' });
  }

  const subscriberHash = crypto.createHash('md5').update(email).digest('hex');
  const tags = TAG_MAP[parentType] || ['general'];

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${subscriberHash}`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          PTYPE: parentType,
        },
        tags,
      }),
    });

    // Mailchimp normally returns JSON, but guard against empty or non-JSON
    // bodies (gateway errors, maintenance pages) so the handler never throws
    // on an unexpected response shape.
    const raw = await response.text();
    let data = {};
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        console.error(
          'Mailchimp returned non-JSON response:',
          response.status,
          raw.slice(0, 500)
        );
        return res
          .status(502)
          .json({ error: 'Unexpected response from mail provider' });
      }
    }

    if (!response.ok) {
      console.error('Mailchimp error:', data);
      return res.status(response.status).json({
        error: data.detail || 'Subscription failed',
      });
    }

    return res.status(200).json({ success: true, email });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
