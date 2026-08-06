import React from 'react';
import { Clock, MapPin, Flame, Play, ExternalLink, BarChart3, Video } from 'lucide-react';

interface MobileGameCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'finished';
  platform?: string;
}

const MobileGameCard: React.FC<MobileGameCardProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
  venue,
  status,
  platform
}) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'live':
        return { gradient: 'from-red-600 to-orange-500', text: '🔴 LIVE NOW', pulse: true };
      case 'finished':
        return { gradient: 'from-green-600 to-emerald-500', text: '✅ FINAL', pulse: false };
      default:
        return { gradient: 'from-blue-600 to-indigo-500', text: '⏰ UPCOMING', pulse: false };
    }
  };

  const shortenTeam = (name: string) => {
    const map: Record<string, string> = {
      'Las Vegas Aces': 'Aces',
      'Indiana Fever': 'Fever',
      'New York Liberty': 'Liberty',
      'Connecticut Sun': 'Sun',
      'Chicago Sky': 'Sky',
      'Seattle Storm': 'Storm',
      'Minnesota Lynx': 'Lynx',
      'Phoenix Mercury': 'Mercury',
      'Dallas Wings': 'Wings',
      'Atlanta Dream': 'Dream',
      'Washington Mystics': 'Mystics',
      'Los Angeles Sparks': 'Sparks',
      'Golden State Valkyries': 'Valkyries',
    };
    for (const [full, short] of Object.entries(map)) {
      if (name.includes(full) || name.includes(short)) return short;
    }
    // Fallback: use last word
    return name.split(' ').pop() || name;
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
      {/* Status Header */}
      <div className={`bg-gradient-to-r ${statusInfo.gradient} px-4 py-2.5 flex items-center justify-between`}>
        <span className={`text-white text-sm font-extrabold tracking-wide ${statusInfo.pulse ? 'animate-pulse' : ''}`}>
          {statusInfo.text}
        </span>
        {platform && (
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            📺 {platform}
          </span>
        )}
      </div>

      {/* Scoreboard */}
      <div className="px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Away Team */}
          <div className="flex-1 text-center">
            <div className="text-sm font-black text-gray-800 mb-2 tracking-tight">
              {shortenTeam(awayTeam)}
            </div>
            <div className={`text-3xl font-black tabular-nums rounded-xl py-2 px-3 inline-block min-w-[4rem] ${
              status === 'finished' && typeof awayScore === 'number' && typeof homeScore === 'number' && awayScore > homeScore
                ? 'text-green-700 bg-green-50 ring-2 ring-green-200'
                : 'text-gray-800 bg-gray-50'
            }`}>
              {typeof awayScore === 'number' ? awayScore : '—'}
            </div>
          </div>

          {/* VS Divider */}
          <div className="mx-3 flex flex-col items-center">
            {status === 'live' ? (
              <Flame className="h-6 w-6 text-red-500 animate-pulse" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">VS</span>
              </div>
            )}
          </div>

          {/* Home Team */}
          <div className="flex-1 text-center">
            <div className="text-sm font-black text-gray-800 mb-2 tracking-tight">
              {shortenTeam(homeTeam)}
            </div>
            <div className={`text-3xl font-black tabular-nums rounded-xl py-2 px-3 inline-block min-w-[4rem] ${
              status === 'finished' && typeof homeScore === 'number' && typeof awayScore === 'number' && homeScore > awayScore
                ? 'text-green-700 bg-green-50 ring-2 ring-green-200'
                : 'text-gray-800 bg-gray-50'
            }`}>
              {typeof homeScore === 'number' ? homeScore : '—'}
            </div>
          </div>
        </div>

        {/* Game Info */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span>{date} · {time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-gray-400" />
            <span className="truncate max-w-[120px]">{venue}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {status === 'live' && (
            <>
              <button
                onClick={() => window.open('https://www.amazon.com/gp/video/offers?tag=fevergame01-20', '_blank')}
                className="flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl py-3 font-bold text-sm shadow-md shadow-red-200 active:scale-95 transition-transform"
              >
                <Play className="h-4 w-4 mr-1.5" />
                Watch Live
              </button>
              <button
                onClick={() => document.getElementById('player-stats')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center bg-gray-800 text-white rounded-xl py-3 font-bold text-sm active:scale-95 transition-transform"
              >
                <BarChart3 className="h-4 w-4 mr-1.5" />
                Live Stats
              </button>
            </>
          )}
          {status === 'upcoming' && (
            <>
              <button
                onClick={() => window.open('https://seatgeek.com/indiana-fever-tickets', '_blank')}
                className="flex items-center justify-center bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 rounded-xl py-3 font-bold text-sm shadow-md shadow-amber-100 active:scale-95 transition-transform"
              >
                🎟️ Tickets
              </button>
              <button
                onClick={() => window.open('https://www.amazon.com/gp/video/offers?tag=fevergame01-20', '_blank')}
                className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl py-3 font-bold text-sm shadow-md shadow-blue-200 active:scale-95 transition-transform"
              >
                <ExternalLink className="h-4 w-4 mr-1.5" />
                Prime Video
              </button>
            </>
          )}
          {status === 'finished' && (
            <>
              <button
                onClick={() => window.open('https://amzn.to/4oPJpPw', '_blank')}
                className="flex items-center justify-center bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl py-3 font-bold text-sm shadow-md shadow-red-200 active:scale-95 transition-transform"
              >
                🛒 CC Figure
              </button>
              <button
                onClick={() => document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center bg-gray-800 text-white rounded-xl py-3 font-bold text-sm active:scale-95 transition-transform"
              >
                <Video className="h-4 w-4 mr-1.5" />
                Recap
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileGameCard;