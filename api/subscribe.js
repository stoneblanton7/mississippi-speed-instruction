import crypto from 'node:crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, first_name, parent_type } = req.body || {};

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    return res.status(500).json({ error: 'Mailchimp not configured' });
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
      return res.status(response.status).json({
        error: data.detail || 'Subscription failed',
      });
    }

    return res.status(200).json({ success: true, email: normalizedEmail });
  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
