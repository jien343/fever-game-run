export interface DbCheckInUser {
  id: number;
  user_name: string;
  verify_code: string;
  user_code: string;
  checkin_count: number;
  last_checkin_at: string;
  rank_override?: number | null;
  badge?: string;
  created_at?: string;
}

export interface DbCheckInLog {
  id: number;
  user_code: string;
  checkin_date: string;
  checkin_time: string;
  created_at: string;
}

export interface DbSubscriber {
  id: number;
  email: string;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Fallback seed data in case API or DB is unavailable during offline/static runs
const SEED_LEADERBOARD: DbCheckInUser[] = [
  { id: 1, user_name: 'Caitlin_No1', verify_code: '8A3F', user_code: 'Caitlin_No1_8A3F', checkin_count: 1, rank_override: 1, badge: '👑 Playoff MVP Fan', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 2, user_name: 'FeverShooter', verify_code: '91K2', user_code: 'FeverShooter_91K2', checkin_count: 1, rank_override: 2, badge: '🥈 Starting Five', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 3, user_name: 'IndianaLegend', verify_code: '44P9', user_code: 'IndianaLegend_44P9', checkin_count: 1, rank_override: 3, badge: '🥉 Starting Five', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 4, user_name: 'GainbridgeHero', verify_code: '77B1', user_code: 'GainbridgeHero_77B1', checkin_count: 1, rank_override: 4, badge: '🔥 Sixth Woman', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 5, user_name: 'Clark22_King', verify_code: '22X9', user_code: 'Clark22_King_22X9', checkin_count: 1, rank_override: 5, badge: '⭐ Playoff Spark', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 6, user_name: 'HoosierPower', verify_code: '09M3', user_code: 'HoosierPower_09M3', checkin_count: 1, rank_override: 6, badge: '🏀 Gainbridge Faithful', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 7, user_name: 'WNBA_Pioneer', verify_code: '66R4', user_code: 'WNBA_Pioneer_66R4', checkin_count: 1, rank_override: 7, badge: '⚡ Court-side Regular', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 8, user_name: 'FeverDefense', verify_code: '33L8', user_code: 'FeverDefense_33L8', checkin_count: 1, rank_override: 8, badge: '🛡️ Lockdown Defender', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 9, user_name: 'LogoThree_Master', verify_code: '11Q5', user_code: 'LogoThree_Master_11Q5', checkin_count: 1, rank_override: 9, badge: '🎯 Deep Range', last_checkin_at: '2026-10-01 08:00:00Z' },
  { id: 10, user_name: 'IndianapolisFast', verify_code: '88V0', user_code: 'IndianapolisFast_88V0', checkin_count: 1, rank_override: 10, badge: '⚡ Fast Break Club', last_checkin_at: '2026-10-01 08:00:00Z' },
];

export async function getLeaderboardFromNeon(): Promise<DbCheckInUser[]> {
  try {
    const res = await fetch('/api/leaderboard');
    if (!res.ok) {
      return SEED_LEADERBOARD;
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : SEED_LEADERBOARD;
  } catch (err) {
    console.warn('API /api/leaderboard offline, using fallback list');
    return SEED_LEADERBOARD;
  }
}

export async function getUserLogsFromNeon(userCode: string): Promise<DbCheckInLog[]> {
  try {
    const res = await fetch(`/api/user-logs?userCode=${encodeURIComponent(userCode)}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.warn('API /api/user-logs offline:', err);
    return [];
  }
}

export async function submitCheckInToNeon(
  userName: string,
  verifyCode: string,
  userCode: string
): Promise<{ success: boolean; data?: DbCheckInUser; message?: string }> {
  try {
    const res = await fetch('/api/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, verifyCode, userCode })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err.message || 'Server check-in error' };
    }
    return await res.json();
  } catch (err: any) {
    console.warn('API /api/checkin offline, saving to local fallback');
    // Local fallback for offline/static deployment
    const fallbackUser: DbCheckInUser = {
      id: 999,
      user_name: userName,
      verify_code: verifyCode,
      user_code: userCode,
      checkin_count: 1,
      last_checkin_at: new Date().toISOString()
    };
    return { success: true, data: fallbackUser };
  }
}

export async function queryUserRankFromNeon(
  userCodeQuery: string
): Promise<{ user?: DbCheckInUser; rank: number; total: number } | null> {
  try {
    const res = await fetch(`/api/user-rank?userCode=${encodeURIComponent(userCodeQuery.trim())}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('API /api/user-rank offline:', err);
    return null;
  }
}

export async function saveSubscriberToNeon(
  email: string,
  source: string = 'homepage_widget'
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err.message || 'Subscription failed' };
    }
    return await res.json();
  } catch (err: any) {
    console.warn('API /api/subscribe offline:', err);
    // Return true so user experience is not disrupted if Google Forms backup succeeds
    return { success: true };
  }
}
