import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userCode = req.query?.userCode;
  if (!userCode) {
    return res.status(400).json({ error: 'Missing userCode query parameter' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: 'DATABASE_URL environment variable is not configured' });
  }

  try {
    const sql = neon(databaseUrl);
    const rows = await sql`
      SELECT id, user_code, checkin_date, checkin_time, created_at
      FROM fever_checkin_logs
      WHERE user_code = ${String(userCode)}
      ORDER BY id DESC
      LIMIT 20;
    `;
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching user logs:', err);
    return res.status(500).json({ error: err.message || 'Database query error' });
  }
}
