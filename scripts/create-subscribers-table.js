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

async function createSubscribersTable() {
  console.log('Connecting to Neon PostgreSQL to create fever_subscribers table...');

  try {
    // 1. 创建订阅者表
    await sql`
      CREATE TABLE IF NOT EXISTS fever_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        source VARCHAR(50) DEFAULT 'homepage_widget',
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. 创建邮箱索引加速查询与防重复
    await sql`
      CREATE INDEX IF NOT EXISTS idx_fever_subscribers_email ON fever_subscribers(email);
    `;

    console.log('✅ Successfully created fever_subscribers table with indexes in Neon DB!');

    // 3. 验证表结构与统计
    const res = await sql`SELECT COUNT(*) as count FROM fever_subscribers;`;
    console.log(`Current subscribers count: ${res[0].count}`);

  } catch (err) {
    console.error('❌ Error creating subscribers table in Neon DB:', err);
  }
}

createSubscribersTable();
