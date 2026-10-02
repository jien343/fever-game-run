import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userCodeQuery = req.query?.userCode;
  if (!userCodeQuery) {
    return res.status(400).json({ error: 'Missing userCode query parameter' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: 'DATABASE_URL environment variable is not configured' });
  }

  try {
    const sql = neon(databaseUrl);
    const clean = String(userCodeQuery).trim();
    const userRows = await sql`
      SELECT * FROM fever_checkins WHERE user_code = ${clean} LIMIT 1;
    `;

    if (userRows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userRows[0];
    const rankCount = await sql`
      SELECT COUNT(*) as higher_count 
      FROM fever_checkins 
      WHERE checkin_count > ${user.checkin_count}
         OR (checkin_count = ${user.checkin_count} AND id < ${user.id});
    `;
    const rank = Number(rankCount[0].higher_count) + 1;

    const totalRows = await sql`SELECT COUNT(*) as total FROM fever_checkins;`;
    const total = Number(totalRows[0]?.total || 10);

    return res.status(200).json({ user, rank, total });
  } catch (err) {
    console.error('Error querying rank:', err);
    return res.status(500).json({ error: err.message || 'Database query error' });
  }
}
