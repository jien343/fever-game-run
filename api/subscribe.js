import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { email, source = 'homepage_widget' } = body || {};

  const cleanEmail = email ? String(email).trim().toLowerCase() : '';
  if (!cleanEmail || !cleanEmail.includes('@')) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ success: false, message: 'DATABASE_URL is not configured' });
  }

  try {
    const sql = neon(databaseUrl);
    await sql`
      INSERT INTO fever_subscribers (email, source, updated_at)
      VALUES (${cleanEmail}, ${source}, NOW())
      ON CONFLICT (email) DO UPDATE SET updated_at = NOW();
    `;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving subscriber:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database insert error' });
  }
}
