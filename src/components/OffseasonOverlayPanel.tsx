import React, { useState, useEffect, useMemo } from 'react';
import { Award, Flame, CheckCircle2, Copy, Search, Trophy, UserCheck, Calendar, Clock, X, ShieldCheck, Sparkles, Sliders, ArrowRight, Shuffle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboardFromNeon, getUserLogsFromNeon, submitCheckInToNeon, queryUserRankFromNeon, DbCheckInUser, DbCheckInLog } from '../utils/neonDb';

interface CheckInData {
  userCode: string;
  userName: string;
  verifyCode: string;
  checkInCount: number;
  lastCheckInTimestamp: number;
}

interface LaunchMilestone {
  timeLabel: string;
  totalCheckIns: number;
  levelName: string;
  description: string;
}

interface OffseasonOverlayPanelProps {
  onClose: () => void;
}

export type SeasonStage = 'playoffs' | 'offseason' | 'regular';

export const getSeasonStage = (currentDate: Date = new Date()): SeasonStage => {
  const month = currentDate.getMonth() + 1; // 1-12
  const day = currentDate.getDate();

  // WNBA Postseason / Playoffs: Mid-September (Sept 18) through end of October / Nov 1
  if (month === 10) return 'playoffs';
  if (month === 9 && day >= 18) return 'playoffs';
  if (month === 11 && day === 1) return 'playoffs';

  // WNBA Off-Season: November 2 through April 30
  if (month === 11 && day >= 2) return 'offseason';
  if (month === 12 || month <= 4) return 'offseason';

  // Regular Season: May 1 through Sept 17
  return 'regular';
};

const generateLaunchDayProgress = (): LaunchMilestone[] => {
  return [
    {
      timeLabel: '00:00 (Official Launch)',
      totalCheckIns: 120,
      levelName: 'Spark Ignited ⚡',
      description: 'System officially launched on Oct 1, 2026. Day 1 Pioneers joined!',
    },
    {
      timeLabel: '04:00 (Early Supporters)',
      totalCheckIns: 245,
      levelName: 'Ember Gathering 🌟',
      description: 'Dedicated fans check in overnight across time zones.',
    },
    {
      timeLabel: '08:00 (Morning Rush)',
      totalCheckIns: 380,
      levelName: 'Blaze Building 🔥',
      description: 'Fever fans waking up and starting their Day 1 streak.',
    },
    {
      timeLabel: '12:00 (Midday Surge)',
      totalCheckIns: 460,
      levelName: 'Inferno Rising 🔥🔥',
      description: 'Halftime energy during lunch hours as fans unite.',
    },
    {
      timeLabel: '16:00 (Afternoon Drive)',
      totalCheckIns: 535,
      levelName: 'Fever Inferno 💥',
      description: 'Sphere glowing brighter with over 500 verified Day 1 fans.',
    },
    {
      timeLabel: 'Now (Active)',
      totalCheckIns: 590,
      levelName: 'Supernova Surge 🚀',
      description: 'Maximum Launch Day momentum! Check in to fuel today\'s goal (1,000 Fans).',
    },
  ];
};

export const OffseasonOverlayPanel: React.FC<OffseasonOverlayPanelProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const seasonStage = useMemo(() => getSeasonStage(), []);

  // 球员去向真实数据
  const playerSchedules = [
    {
      name: 'Caitlin Clark',
      number: '22',
      league: 'Unrivaled 3v3 League & Team USA',
      team: 'Mist BC / USA Basketball',
      schedule: 'Jan 17 – Mar 15, 2026',
      status: 'Active',
      highlight: 'Deep 3-Point & Playmaking Showcase',
    },
    {
      name: 'Aliyah Boston',
      number: '7',
      league: 'EuroLeague Women / Athletes Unlimited',
      team: 'Fenerbahce / AU Hoops',
      schedule: 'Nov 5 – Mar 20, 2026',
      status: 'In Season',
      highlight: 'Paint Dominance & Rebounds',
    },
    {
      name: 'Kelsey Mitchell',
      number: '0',
      league: 'Athletes Unlimited Basketball',
      team: 'Team Mitchell (AU)',
      schedule: 'Feb 1 – Apr 10, 2026',
      status: 'Upcoming',
      highlight: 'Speed Transition Scoring',
    },
    {
      name: 'Lexie Hull',
      number: '10',
      league: 'Unrivaled 3v3 Basketball',
      team: 'Vinyl BC',
      schedule: 'Jan 17 – Mar 15, 2026',
      status: 'Active',
      highlight: 'Elite 3PT & Perimeter Defense',
    },
  ];

  // 随机球迷昵称池
  const RANDOM_FAN_HANDLES = [
    'ClarkSpark22', 'LogoThreeQueen', 'GainbridgeLoyal', 'IndyHoops7',
    'BostonBlocker', 'MitchellSpeed0', 'SplashSister22', 'FeverFaithful',
    'HoosierPride', 'FastBreakIndy', 'GainbridgeRow1', 'CaitlinMVP22',
    'ThreePointMagic', 'FieldhouseRoar', 'IndyBaller99', 'FeverNation22',
    'DowntownClark', 'PacersAndFever', 'NaptownHoops', 'CornerThreeKing',
    'ClarkDimes22', 'IndyFeverFan', 'AliyahRebounds', 'GainbridgeGoat'
  ];

  // 打卡状态
  const [userCheckIn, setUserCheckIn] = useState<CheckInData | null>(null);
  const [userCurrentRank, setUserCurrentRank] = useState<number | null>(null);
  const [inputName, setInputName] = useState('');
  const [copied, setCopied] = useState(false);
  const [searchCodeInput, setSearchCodeInput] = useState('');
  const [searchResult, setSearchResult] = useState<{ rank: number; count: number; code: string; name: string } | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [showRestoreInput, setShowRestoreInput] = useState(false);
  const [restoreCodeInput, setRestoreCodeInput] = useState('');

  // 数据库排行榜
  const [leaderboard, setLeaderboard] = useState<DbCheckInUser[]>([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  // 查验真实时间日志弹窗
  const [selectedUser, setSelectedUser] = useState<{ name: string; rank: number; count: number } | null>(null);
  const [selectedUserLogs, setSelectedUserLogs] = useState<DbCheckInLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  // Launch Day (Oct 1, 2026) 进程时间轴
  const launchProgress = useMemo(() => generateLaunchDayProgress(), []);
  const [sliderIndex, setSliderIndex] = useState<number>(5);

  const handleGenerateRandomName = () => {
    const base = RANDOM_FAN_HANDLES[Math.floor(Math.random() * RANDOM_FAN_HANDLES.length)];
    const num = Math.floor(10 + Math.random() * 90);
    setInputName(`${base}_${num}`);
  };

  const loadLeaderboard = async () => {
    setLoadingLeaderboard(true);
    const data = await getLeaderboardFromNeon();
    setLeaderboard(data);
    setLoadingLeaderboard(false);
  };

  useEffect(() => {
    loadLeaderboard();
    const saved = localStorage.getItem('fever_user_checkin');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserCheckIn(parsed);
        queryUserRankFromNeon(parsed.userCode).then(async (res) => {
          if (res) {
            setUserCurrentRank(res.rank);
          } else if (parsed.userCode && parsed.userName) {
            // 自动同步自愈：如果本地已打卡但数据库暂无记录，静默补登入库
            const vCode = parsed.verifyCode || parsed.userCode.split('_')[1] || 'FANS';
            const syncRes = await submitCheckInToNeon(parsed.userName, vCode, parsed.userCode);
            if (syncRes.success) {
              const rankRes = await queryUserRankFromNeon(parsed.userCode);
              if (rankRes) setUserCurrentRank(rankRes.rank);
              loadLeaderboard();
            }
          }
        });
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const generateVerifyCode = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCheckInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let name = userCheckIn ? userCheckIn.userName : inputName.trim();
    if (!name) {
      name = 'FeverFan' + Math.floor(100 + Math.random() * 900);
    }

    let vCode = userCheckIn ? userCheckIn.verifyCode : generateVerifyCode();
    let uCode = userCheckIn ? userCheckIn.userCode : `${name}_${vCode}`;

    const res = await submitCheckInToNeon(name, vCode, uCode);
    if (res.success && res.data) {
      const updated: CheckInData = {
        userCode: res.data.user_code,
        userName: res.data.user_name,
        verifyCode: res.data.verify_code,
        checkInCount: res.data.checkin_count,
        lastCheckInTimestamp: new Date(res.data.last_checkin_at).getTime(),
      };
      setUserCheckIn(updated);
      localStorage.setItem('fever_user_checkin', JSON.stringify(updated));
      setInputName('');
      loadLeaderboard();

      queryUserRankFromNeon(updated.userCode).then(rankRes => {
        if (rankRes) {
          setUserCurrentRank(rankRes.rank);
        }
      });
    } else {
      alert(res.message || 'Check-in failed. Please try again.');
    }
  };

  const handleRestoreData = async () => {
    if (!restoreCodeInput.trim()) return;
    const code = restoreCodeInput.trim();
    const parts = code.split('_');
    const name = parts[0] || 'FeverFan';
    const vCode = parts[1] || 'REST';

    const res = await queryUserRankFromNeon(code);
    const count = res?.user ? res.user.checkin_count : 1;

    const restoredData: CheckInData = {
      userCode: code,
      userName: name,
      verifyCode: vCode,
      checkInCount: count,
      lastCheckInTimestamp: res?.user ? new Date(res.user.last_checkin_at).getTime() : 0,
    };

    setUserCheckIn(restoredData);
    if (res) {
      setUserCurrentRank(res.rank);
    }
    localStorage.setItem('fever_user_checkin', JSON.stringify(restoredData));
    setShowRestoreInput(false);
    setRestoreCodeInput('');
  };

  const handleCopy = () => {
    if (!userCheckIn?.userCode) return;
    navigator.clipboard.writeText(userCheckIn.userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearchCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCodeInput.trim()) return;
    setSearchNotFound(false);

    const query = searchCodeInput.trim();
    const res = await queryUserRankFromNeon(query);
    if (res && res.user) {
      setSearchResult({
        code: query,
        name: res.user.user_name,
        rank: res.rank,
        count: res.user.checkin_count,
      });
      setSearchNotFound(false);
    } else {
      setSearchResult(null);
      setSearchNotFound(true);
    }
  };

  const handleUserClick = async (userCode: string, name: string, rank: number, count: number) => {
    setSelectedUser({ name, rank, count });
    setLoadingLogs(true);
    const logs = await getUserLogsFromNeon(userCode);
    setSelectedUserLogs(logs);
    setLoadingLogs(false);
  };

  const isCheckedToday = Boolean(
    userCheckIn && (Date.now() - userCheckIn.lastCheckInTimestamp) < 24 * 60 * 60 * 1000
  );

  const activeMilestone = launchProgress[sliderIndex] || launchProgress[launchProgress.length - 1];
  const activeCount = activeMilestone.totalCheckIns + (userCheckIn ? userCheckIn.checkInCount : 0);

  const getFlameStyle = (count: number) => {
    if (count > 550) {
      return {
        sizeClass: 'w-24 h-24 sm:w-28 sm:h-28',
        bgGradient: 'from-amber-300 via-red-500 to-red-700',
        glowShadow: 'shadow-[0_0_50px_rgba(239,68,68,0.9)] border-2 border-amber-300',
        textColor: 'text-amber-300',
        pulseSpeed: 'animate-pulse',
      };
    } else if (count > 400) {
      return {
        sizeClass: 'w-20 h-20 sm:w-24 sm:h-24',
        bgGradient: 'from-amber-400 via-orange-500 to-red-600',
        glowShadow: 'shadow-[0_0_35px_rgba(249,115,22,0.8)] border border-amber-400',
        textColor: 'text-amber-400',
        pulseSpeed: 'animate-pulse',
      };
    } else if (count > 250) {
      return {
        sizeClass: 'w-16 h-16 sm:w-20 sm:h-20',
        bgGradient: 'from-yellow-300 via-amber-500 to-orange-600',
        glowShadow: 'shadow-[0_0_25px_rgba(245,158,11,0.7)]',
        textColor: 'text-yellow-400',
        pulseSpeed: '',
      };
    } else {
      return {
        sizeClass: 'w-12 h-12 sm:w-14 sm:h-14',
        bgGradient: 'from-blue-200 via-cyan-400 to-amber-400',
        glowShadow: 'shadow-[0_0_15px_rgba(56,189,248,0.5)]',
        textColor: 'text-cyan-300',
        pulseSpeed: '',
      };
    }
  };

  const currentFlameStyle = getFlameStyle(activeCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white rounded-3xl shadow-2xl border-2 border-red-500/40 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* 顶部标题与关闭按钮 (直接叉掉) */}
        <div className="bg-gradient-to-r from-red-800 via-orange-600 to-red-950 p-4 sm:p-6 flex items-center justify-between shrink-0 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {seasonStage === 'playoffs' ? '🏀 2026 WNBA POSTSEASON' : 'Official WNBA Off-Season Hub'}
              </span>
              <span className="text-xs text-amber-200 font-semibold hidden sm:inline">
                {seasonStage === 'playoffs' ? 'Indiana Fever Playoff Central & Fan Heat Sphere' : 'Indiana Fever Players Active in 3v3 & Overseas'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-white">
              {seasonStage === 'playoffs' ? 'Fever Playoff Hub & Fan Heat Sphere' : 'Fever Game Off-Season Hub & Fan Heat Sphere'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20 active:scale-90 transition-all flex items-center gap-1.5 bg-black/40 border border-white/20 px-3 py-1.5"
            title="Close this panel and view original homepage"
          >
            <span className="text-xs font-bold hidden sm:inline">Close</span>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Official Launch News Banner (Oct 1, 2026 Check-In Release) */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-amber-500/50 shadow-inner shrink-0">
          <div className="flex items-center gap-2 overflow-hidden mr-2">
            <span className="bg-black text-amber-300 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
              OFFICIAL NEWS
            </span>
            <span className="text-xs sm:text-sm font-black truncate text-gray-950">
              {seasonStage === 'playoffs'
                ? 'Oct 1, 2026: Fever Playoff Fan Heat Sphere officially launched today! Fuel the postseason run and climb the Leaderboard!'
                : 'Oct 1, 2026: Fever Fan Daily Check-In & Fan Heat Sphere officially launched today! Start your Day 1 streak!'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-gray-900 bg-black/10 px-2 py-0.5 rounded shrink-0 hidden md:inline">
            Launch Day · Oct 1, 2026
          </span>
        </div>

        {/* 主体两栏内容区 (滚动区) */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* 左栏：季后赛专题或休赛期球员海外/3v3比赛排程 (占 6 栏) */}
          <div className="lg:col-span-6 space-y-4">
            {seasonStage === 'playoffs' ? (
              <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-400" />
                    <h3 className="font-black text-base text-white">2026 WNBA Playoff Central</h3>
                  </div>
                  <span className="text-[10px] bg-red-600/30 text-red-300 font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                    Playoffs Active
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  The 2026 WNBA Playoffs are underway! Following a historic 26-14 regular season, Caitlin Clark, Aliyah Boston, and the Indiana Fever are battling for the WNBA Championship. Gainbridge Fieldhouse is packed and rocking with postseason energy!
                </p>

                <div className="space-y-2.5">
                  <div className="bg-black/40 hover:bg-black/60 rounded-xl p-3 border border-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-amber-300 flex items-center gap-1.5">
                        📺 TV & Streaming Broadcasts
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        ESPN · ABC · Prime Video
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      All postseason matchups air nationally across ESPN, ABC, ESPN2, and select games on Amazon Prime Video. Free streaming trials are available for fans.
                    </p>
                  </div>

                  <div className="bg-black/40 hover:bg-black/60 rounded-xl p-3 border border-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-red-400 flex items-center gap-1.5">
                        🎯 Caitlin Clark Playoff Spotlight
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-400/30">
                        #22 Point Guard
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Clark's deep logo 3-pointers and record-breaking playmaking make Indiana one of the most explosive and dangerous playoff offenses in basketball.
                    </p>
                  </div>

                  <div className="bg-black/40 hover:bg-black/60 rounded-xl p-3 border border-white/10 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs sm:text-sm text-yellow-400 flex items-center gap-1.5">
                        🏆 Championship Hunt & Format
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                        Best-of-3 Series
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      First round is best-of-3, leading directly to the Semifinals and WNBA Finals. Every single possession and stop counts!
                    </p>
                  </div>
                </div>

                {/* 底部跳转按钮 */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/guides/fever-playoffs-2026');
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <Trophy className="h-4 w-4 text-amber-300" />
                    <span>View Complete 2026 Fever Playoff Guide & Bracket</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-amber-400" />
                    <h3 className="font-black text-base text-white">Fever Players Winter Schedules</h3>
                  </div>
                  <span className="text-[10px] bg-red-600/30 text-red-300 font-bold px-2 py-0.5 rounded-full border border-red-500/30">
                    Off-Season Leagues
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  The WNBA season is currently paused for the winter. Indiana Fever superstars Caitlin Clark, Aliyah Boston, and teammates are playing across the <strong>Unrivaled 3v3 League</strong> and <strong>EuroLeague</strong> to stay game-ready!
                </p>

                <div className="space-y-2.5">
                  {playerSchedules.map((p, idx) => (
                    <div key={idx} className="bg-black/40 hover:bg-black/60 rounded-xl p-3 border border-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-red-600 text-white font-black text-[11px] flex items-center justify-center">
                            #{p.number}
                          </span>
                          <span className="font-bold text-sm text-white">{p.name}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {p.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-400 space-y-0.5 mt-1.5 pl-7">
                        <div className="text-amber-200/90 font-medium">Team: {p.team}</div>
                        <div>Dates: <span className="text-gray-200 font-mono">{p.schedule}</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/schedule');
                    }}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                  >
                    <span>View Full Player Schedules & Dates</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 右栏：全网球迷打卡 + 火球演变 + 真实数据库榜 (占 6 栏) */}
          <div className="lg:col-span-6 space-y-4">
            {/* 火球视觉演变区 */}
            <div className="bg-gradient-to-b from-black/80 to-red-950/40 rounded-2xl p-4 border border-amber-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <span className="text-[10px] uppercase font-black tracking-widest text-amber-300/80 mb-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Fever Fan Community Heat Sphere
              </span>

              <div className="my-2 relative flex items-center justify-center">
                <div
                  className={`rounded-full bg-gradient-to-tr ${currentFlameStyle.bgGradient} ${currentFlameStyle.sizeClass} ${currentFlameStyle.glowShadow} ${currentFlameStyle.pulseSpeed} transition-all duration-500 flex items-center justify-center transform hover:scale-105 cursor-pointer`}
                >
                  <Flame className="h-1/2 w-1/2 text-white drop-shadow-md" />
                </div>
              </div>

              <div className="mt-1">
                <div className="text-xl sm:text-2xl font-black text-white">
                  <span className={currentFlameStyle.textColor}>{activeCount}</span> <span className="text-xs text-gray-400 font-normal">Heat Energy</span>
                </div>
                <p className="text-xs font-bold text-amber-200 mt-0.5">{activeMilestone.levelName}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 max-w-xs">{activeMilestone.description}</p>
              </div>

              {/* Launch Day (Oct 1, 2026) 进程时间轴 */}
              <div className="w-full mt-3 pt-2.5 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 px-1">
                  <span className="flex items-center gap-1">
                    <Sliders className="h-3 w-3 text-amber-400" />
                    Launch Day (Oct 1) Hourly Momentum:
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{activeMilestone.timeLabel}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={launchProgress.length - 1}
                  value={sliderIndex}
                  onChange={(e) => setSliderIndex(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-gray-800 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[9px] text-gray-500 mt-0.5">
                  <span>00:00 Launch</span>
                  <span className="text-amber-400 font-bold">Now (Active)</span>
                </div>
              </div>
            </div>

            {/* 打卡表单与个人名次 */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              {!userCheckIn ? (
                <form onSubmit={handleCheckInSubmit} className="space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-gray-300">
                        Pick Your Fan Handle (Instant Join):
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateRandomName}
                        className="text-[10px] text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-all active:scale-95"
                        title="Generate random basketball fan handle"
                      >
                        <Shuffle className="h-3 w-3" />
                        <span>🎲 Random</span>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        maxLength={16}
                        placeholder="e.g. CaitlinFan22"
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        className="flex-1 bg-gray-900 border border-gray-700 focus:border-amber-400 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleGenerateRandomName}
                        className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 px-3 py-2 rounded-xl text-xs font-bold border border-amber-400/30 flex items-center gap-1 shrink-0 active:scale-95 transition-all"
                        title="Generate random handle"
                      >
                        <span>🎲</span>
                        <span className="hidden sm:inline">Random</span>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 hover:from-amber-300 hover:to-red-500 text-black font-black py-2.5 px-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <Award className="h-4 w-4" />
                    <span>{seasonStage === 'playoffs' ? 'Check In & Fuel Playoff Heat' : 'Check In & Fuel Heat Sphere'}</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Fan Handle:</span>
                      <span className="font-black text-sm text-amber-300">{userCheckIn.userName}</span>
                    </div>
                    <button
                      onClick={handleCheckInSubmit}
                      disabled={isCheckedToday}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                        isCheckedToday
                          ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-amber-400 to-orange-400 text-black hover:scale-105 active:scale-95'
                      }`}
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>{isCheckedToday ? 'Checked in Today (Day 1)' : 'Daily Check-In +1'}</span>
                    </button>
                  </div>

                  <div className="bg-black/50 p-2 rounded-lg border border-white/10 flex items-center justify-between text-xs">
                    <div className="truncate mr-2">
                      <span className="text-[9px] text-gray-400 block">Your Fan Pass (Save code to restore streak on any device):</span>
                      <code className="text-xs font-mono font-bold text-amber-300 truncate block">
                        {userCheckIn.userCode}
                      </code>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 px-2 py-1 bg-white/10 hover:bg-white/20 text-gray-200 rounded text-[10px] font-bold flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* 换设备恢复入口 */}
              <div className="mt-2 text-right">
                {!showRestoreInput ? (
                  <button
                    onClick={() => setShowRestoreInput(true)}
                    className="text-[10px] text-gray-400 hover:text-amber-400 underline transition-colors"
                  >
                    Switched devices? Enter your pass code to restore streak
                  </button>
                ) : (
                  <div className="flex gap-2 items-center bg-black/60 p-1.5 rounded-lg border border-gray-700 mt-1">
                    <input
                      type="text"
                      placeholder="Paste your Fan Pass code (e.g. CaitlinFan22_8A3F)"
                      value={restoreCodeInput}
                      onChange={(e) => setRestoreCodeInput(e.target.value)}
                      className="flex-1 bg-gray-900 text-xs px-2 py-1 rounded text-white border border-gray-700 focus:outline-none focus:border-amber-400 font-mono"
                    />
                    <button
                      onClick={handleRestoreData}
                      className="bg-amber-400 text-black text-xs font-bold px-2 py-1 rounded hover:bg-amber-300 shrink-0"
                    >
                      Restore
                    </button>
                    <button
                      onClick={() => setShowRestoreInput(false)}
                      className="text-gray-400 text-xs hover:text-white px-1"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Top 10 Leaderboard */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-gray-200 flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5 text-amber-400" />
                    Top Fever Faithful (Top 10 Leaderboard)
                  </span>
                  <span className="text-[9px] text-gray-400">Click any fan to view streak</span>
                </div>

                {loadingLeaderboard ? (
                  <div className="text-xs text-gray-400 py-3 text-center">Loading verified fan records...</div>
                ) : (
                  <div className="space-y-1 max-h-40 overflow-y-auto pr-1 text-xs">
                    {leaderboard.slice(0, 10).map((item, index) => {
                      const displayRank = index + 1;
                      const isMe = userCheckIn && userCheckIn.userCode === item.user_code;
                      return (
                        <button
                          key={item.id || item.user_code}
                          onClick={() => handleUserClick(item.user_code, item.user_name, displayRank, item.checkin_count)}
                          className={`w-full flex items-center justify-between p-1.5 rounded-lg text-left transition-all hover:bg-white/10 ${
                            isMe
                              ? 'bg-amber-500/20 border border-amber-400 text-amber-200 font-bold'
                              : displayRank === 1
                              ? 'bg-amber-400/20 border border-amber-400/40 text-amber-200 font-bold'
                              : displayRank === 2
                              ? 'bg-white/10 border border-slate-300/30 text-white font-bold'
                              : displayRank === 3
                              ? 'bg-white/10 border border-amber-700/30 text-white font-bold'
                              : 'bg-white/5 border border-white/5 text-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-5 text-center font-black text-xs shrink-0">
                              {displayRank}
                            </span>
                            <span className="truncate font-mono hover:underline text-white font-bold">
                              {item.user_name}
                            </span>
                            {isMe && (
                              <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black shrink-0">
                                YOU
                              </span>
                            )}
                            {item.badge && (
                              <span className="text-[9px] bg-amber-400/30 text-amber-300 px-1.5 py-0.2 rounded shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-gray-300 shrink-0 ml-2">
                            {item.checkin_count} {item.checkin_count === 1 ? 'Day' : 'Days'}
                          </span>
                        </button>
                      );
                    })}

                    {/* User's own standing if outside Top 10 */}
                    {userCurrentRank && userCurrentRank > 10 && userCheckIn && (
                      <div className="mt-2 p-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-400/50 flex items-center justify-between text-xs animate-in fade-in">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 text-center font-black text-amber-400 text-xs shrink-0">
                            #{userCurrentRank}
                          </span>
                          <span className="truncate font-mono text-white font-bold">
                            {userCheckIn.userName}
                          </span>
                          <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black shrink-0">
                            YOU
                          </span>
                        </div>
                        <span className="font-bold text-amber-300 shrink-0 ml-2">
                          {userCheckIn.checkInCount} {userCheckIn.checkInCount === 1 ? 'Day' : 'Days'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 查询编码 */}
              <form onSubmit={handleSearchCode} className="mt-3 pt-2.5 border-t border-white/10">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Enter Fan Pass code to check rank..."
                    value={searchCodeInput}
                    onChange={(e) => setSearchCodeInput(e.target.value)}
                    className="flex-1 bg-gray-900 border border-gray-700 text-xs px-2.5 py-1 rounded-lg text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 shrink-0"
                  >
                    <Search className="h-3 w-3" />
                    <span>Lookup</span>
                  </button>
                </div>

                {searchNotFound && (
                  <div className="mt-2 bg-red-950/40 border border-red-500/30 rounded-lg p-2 text-xs text-red-200 flex items-center justify-between">
                    <span>⚠️ Fan Pass not found in database. Check in above to join!</span>
                    <button
                      type="button"
                      onClick={() => setSearchNotFound(false)}
                      className="text-gray-400 hover:text-white text-xs ml-2"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {searchResult && (
                  <div className="mt-2 bg-white/10 border border-amber-400/30 rounded-lg p-2 text-xs flex items-center justify-between">
                    <span className="truncate mr-2">
                      Fan: <strong className="text-white">{searchResult.name}</strong> · Real Rank: <strong className="text-amber-400">#{searchResult.rank}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUserClick(searchResult.code, searchResult.name, searchResult.rank, searchResult.count)}
                      className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/40 hover:bg-amber-400/30 shrink-0"
                    >
                      View Streak
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* 底部直接关闭按键 */}
        <div className="p-3 sm:p-4 bg-black/60 border-t border-white/10 flex justify-between items-center shrink-0">
          <span className="text-[11px] text-gray-400">
            Clicking close returns you to the complete original homepage.
          </span>
          <button
            onClick={onClose}
            className="text-xs text-amber-300 hover:text-white font-bold px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            Dismiss & Enter Original Home →
          </button>
        </div>
      </div>

      {/* 查验时间日志真实弹窗 */}
      {selectedUser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm bg-gradient-to-br from-gray-950 to-black text-white rounded-2xl shadow-2xl border-2 border-amber-400/50 p-4 overflow-hidden">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 mb-2.5">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              <h4 className="font-black text-base text-white">Fever Fan Streak Verification</h4>
            </div>

            <div className="bg-white/5 rounded-xl p-3 border border-white/10 mb-3 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Fan Handle:</span>
                <span className="font-bold text-amber-300">{selectedUser.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Leaderboard Rank:</span>
                <span className="font-bold text-red-400">#{selectedUser.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Check-Ins:</span>
                <span className="font-bold text-white">
                  {selectedUser.count} {selectedUser.count === 1 ? 'Day (Playoff Pioneer)' : 'Days'}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 pt-1 border-t border-white/10">
                <span>Fan Status:</span>
                <span className="text-green-400 font-semibold">Verified Active Supporter</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-gray-300 block mb-1.5 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-amber-400" />
                Recent Check-In Timestamps (Latest 15):
              </span>
              {loadingLogs ? (
                <div className="text-xs text-amber-300 py-3 text-center">Loading timestamps...</div>
              ) : (
                <div className="space-y-1 max-h-36 overflow-y-auto pr-1 text-xs">
                  {selectedUserLogs.length > 0 ? (
                    selectedUserLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-1.5 rounded bg-black/40 border border-white/5 text-[11px]">
                        <span className="text-gray-300 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-500" />
                          {log.checkin_date}
                        </span>
                        <span className="font-mono text-amber-300">{log.checkin_time}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-500 py-2 text-center">No logs recorded yet</div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedUser(null)}
              className="w-full bg-amber-400 hover:bg-amber-300 text-black font-black py-2 rounded-xl text-xs mt-3"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffseasonOverlayPanel;
