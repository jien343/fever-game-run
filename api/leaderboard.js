import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: 'DATABASE_URL environment variable is not configured' });
  }

  try {
    const sql = neon(databaseUrl);
    const rows = await sql`
      SELECT id, user_name, verify_code, user_code, checkin_count, rank_override, badge, last_checkin_at
      FROM fever_checkins
      ORDER BY 
        checkin_count DESC,
        id ASC
      LIMIT 20;
    `;
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    return res.status(500).json({ error: err.message || 'Database query error' });
  }
}
