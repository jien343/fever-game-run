import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { userName, verifyCode, userCode } = body || {};

  if (!userName || !verifyCode || !userCode) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ success: false, message: 'DATABASE_URL is not configured' });
  }

  try {
    const sql = neon(databaseUrl);
    const now = new Date();
    const nowDateStr = now.toISOString().split('T')[0];
    const nowTimeStr = now.toTimeString().split(' ')[0];

    const existing = await sql`
      SELECT * FROM fever_checkins WHERE user_code = ${userCode} LIMIT 1;
    `;

    let userData;

    if (existing.length === 0) {
      const inserted = await sql`
        INSERT INTO fever_checkins (user_name, verify_code, user_code, checkin_count, last_checkin_at)
        VALUES (${userName}, ${verifyCode}, ${userCode}, 1, ${now.toISOString()})
        RETURNING *;
      `;
      userData = inserted[0];
    } else {
      const lastAt = new Date(existing[0].last_checkin_at);
      const lastDateStr = lastAt.toISOString().split('T')[0];
      const hoursPassed = (now.getTime() - lastAt.getTime()) / (1000 * 3600);

      // 同一自然日且间隔不足 16 小时视为今日已打卡
      if (nowDateStr === lastDateStr && hoursPassed < 16) {
        return res.status(200).json({
          success: false,
          message: `You've already checked in today! Streak is active (${existing[0].checkin_count} Days). Come back tomorrow!`
        });
      }

      const updated = await sql`
        UPDATE fever_checkins
        SET checkin_count = checkin_count + 1, last_checkin_at = ${now.toISOString()}
        WHERE user_code = ${userCode}
        RETURNING *;
      `;
      userData = updated[0];
    }

    await sql`
      INSERT INTO fever_checkin_logs (user_code, checkin_date, checkin_time)
      VALUES (${userCode}, ${nowDateStr}, ${nowTimeStr});
    `;

    return res.status(200).json({ success: true, data: userData });
  } catch (err) {
    console.error('Submit check-in error:', err);
    return res.status(500).json({ success: false, message: err.message || 'Database error' });
  }
}
