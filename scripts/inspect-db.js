import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

function getDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/^DATABASE_URL\s*=\s*(.+)$/m);
      if (match) {
        return match[1].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  } catch (e) {}
  return null;
}

const DATABASE_URL = getDatabaseUrl();
if (!DATABASE_URL) {
  console.error('❌ Error: DATABASE_URL is not set. Please set DATABASE_URL in your .env file or environment variables.');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function inspect() {
  console.log('--- Inspecting fever_checkins ---');
  const checkins = await sql`SELECT * FROM fever_checkins;`;
  console.log('Total checkins rows:', checkins.length);
  console.log(JSON.stringify(checkins, null, 2));

  console.log('\n--- Inspecting fever_checkin_logs ---');
  const logs = await sql`SELECT * FROM fever_checkin_logs ORDER BY id DESC LIMIT 10;`;
  console.log('Recent logs:', logs.length);
  console.log(JSON.stringify(logs, null, 2));
}

inspect().catch(console.error);
