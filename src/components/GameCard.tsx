import React from 'react';
import { Clock, MapPin, Trophy, TrendingUp, Flame, Zap } from 'lucide-react';

interface GameCardProps {
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

const GameCard: React.FC<GameCardProps> = ({
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
  const getStatusColor = () => {
    switch (status) {
      case 'live': return 'bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse';
      case 'finished': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'live': return '🔴 LIVE NOW!';
      case 'finished': return '✅ FINAL';
      default: return '⏰ COMING UP!';
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-8 border-4 border-orange-400 hover:border-red-500 transform hover:scale-105 overflow-hidden">
      {/* Background Player Silhouettes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-4 right-8 w-12 h-16 bg-gradient-to-b from-orange-300 to-transparent transform rotate-12">
          <div className="w-3 h-3 bg-orange-200 rounded-full mx-auto mb-1"></div>
          <div className="w-6 h-8 bg-orange-300 mx-auto mb-1"></div>
          <div className="w-4 h-5 bg-orange-300 mx-auto"></div>
        </div>
        <div className="absolute bottom-6 left-6 w-10 h-14 bg-gradient-to-b from-red-300 to-transparent transform -rotate-6">
          <div className="w-2 h-2 bg-red-200 rounded-full mx-auto mb-1"></div>
          <div className="w-5 h-7 bg-red-300 mx-auto mb-1"></div>
          <div className="w-3 h-4 bg-red-300 mx-auto"></div>
        </div>
        <div className="absolute top-1/2 left-4 w-1 h-8 bg-gradient-to-b from-orange-200 to-transparent transform rotate-45"></div>
        <div className="absolute top-1/3 right-4 w-1 h-6 bg-gradient-to-b from-red-200 to-transparent transform -rotate-30"></div>
      </div>
      
      {/* Content with better contrast */}
      <div className="flex items-center justify-between mb-6">
        <span className={`px-6 py-3 rounded-full text-lg font-black shadow-lg ${getStatusColor()}`}>
          {getStatusText()}
        </span>
        {platform && (
          <span className="text-lg font-bold text-orange-600 bg-orange-100 px-4 py-2 rounded-full">
            📺 {platform}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <div className="font-black text-2xl text-gray-900 mb-2 bg-white/80 rounded-lg px-3 py-1">{awayTeam}</div>
          {typeof awayScore === 'number' && (
            <div className="text-6xl font-black text-red-600 bg-white/90 rounded-xl px-4 py-2 shadow-lg border-4 border-red-200">{awayScore}</div>
          )}
        </div>
        
        <div className="mx-6 text-gray-800">
          <div className="text-2xl font-black bg-white/80 rounded-full px-4 py-2">VS</div>
          {status === 'live' && <Flame className="h-8 w-8 mx-auto mt-2 animate-bounce text-red-500" />}
        </div>
        
        <div className="text-center flex-1">
          <div className="font-black text-2xl text-gray-900 mb-2 bg-white/80 rounded-lg px-3 py-1">{homeTeam}</div>
          {typeof homeScore === 'number' && (
            <div className="text-6xl font-black text-red-600 bg-white/90 rounded-xl px-4 py-2 shadow-lg border-4 border-red-200">{homeScore}</div>
          )}
        </div>
      </div>
      
      <div className="space-y-3 text-lg text-gray-800 font-semibold bg-white/70 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="h-6 w-6 mr-3 text-orange-500" />
          <span>🗓️ {date} at {time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-6 w-6 mr-3 text-orange-500" />
          <span>🏟️ {venue}</span>
        </div>
      </div>
      
      {status === 'finished' && (
        <div className="mt-6 pt-6 border-t-4 border-orange-200">
          <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center font-black text-xl shadow-xl transform hover:scale-105 border-4 border-yellow-400">
            <Zap className="h-6 w-6 mr-3 animate-pulse" />
            🔥 VIEW EPIC RECAP! 🔥
          </button>
        </div>
      )}
    </div>
  );
};

export default GameCard;