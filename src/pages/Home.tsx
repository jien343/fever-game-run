import React from 'react';
import { Calendar, Star, TrendingUp, Video, Flame, Zap, Trophy, Target, RefreshCw } from 'lucide-react';
import GameCard from '../components/GameCard';
import VideoCard from '../components/VideoCard';
import { useRealTimeData } from '../hooks/useRealTimeData';

const Home = () => {
  const { 
    todayGame, 
    yesterdayGame, 
    playerStats, 
    videos, 
    liveStatus, 
    loading, 
    lastUpdate, 
    refreshData 
  } = useRealTimeData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">🔥 Loading Live Data... 🔥</h2>
          <p className="text-gray-600 mt-2">Getting the latest Fever updates!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-red-900 to-black text-white overflow-hidden">
        {/* Player Silhouettes Background */}
        <div className="absolute inset-0 opacity-20">
          {/* Basketball Court Lines */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 w-px h-full bg-white opacity-30 transform -translate-x-1/2"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-white opacity-30 transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white opacity-30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Player Silhouettes */}
          <div className="absolute top-16 left-20 w-16 h-24 bg-gradient-to-b from-red-500 to-transparent opacity-40 transform rotate-12 animate-pulse">
            <div className="w-4 h-4 bg-red-400 rounded-full mx-auto mb-1"></div>
            <div className="w-8 h-12 bg-red-500 mx-auto mb-1"></div>
            <div className="w-6 h-8 bg-red-500 mx-auto"></div>
          </div>
          
          <div className="absolute top-32 right-32 w-20 h-28 bg-gradient-to-b from-orange-500 to-transparent opacity-30 transform -rotate-6 animate-bounce">
            <div className="w-5 h-5 bg-orange-400 rounded-full mx-auto mb-1"></div>
            <div className="w-10 h-14 bg-orange-500 mx-auto mb-1"></div>
            <div className="w-8 h-10 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="absolute bottom-24 left-16 w-18 h-26 bg-gradient-to-b from-yellow-500 to-transparent opacity-35 transform rotate-45 animate-pulse">
            <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mb-1"></div>
            <div className="w-9 h-13 bg-yellow-500 mx-auto mb-1"></div>
            <div className="w-7 h-9 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="absolute bottom-16 right-24 w-14 h-22 bg-gradient-to-b from-red-600 to-transparent opacity-25 transform -rotate-12 animate-bounce">
            <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
            <div className="w-7 h-11 bg-red-600 mx-auto mb-1"></div>
            <div className="w-5 h-7 bg-red-600 mx-auto"></div>
          </div>
          
          <div className="absolute top-1/2 left-8 w-16 h-24 bg-gradient-to-b from-orange-600 to-transparent opacity-20 transform rotate-90 animate-pulse">
            <div className="w-4 h-4 bg-orange-500 rounded-full mx-auto mb-1"></div>
            <div className="w-8 h-12 bg-orange-600 mx-auto mb-1"></div>
            <div className="w-6 h-8 bg-orange-600 mx-auto"></div>
          </div>
          
          <div className="absolute top-1/3 right-12 w-18 h-26 bg-gradient-to-b from-yellow-600 to-transparent opacity-30 transform -rotate-30 animate-bounce">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-1"></div>
            <div className="w-9 h-13 bg-yellow-600 mx-auto mb-1"></div>
            <div className="w-7 h-9 bg-yellow-600 mx-auto"></div>
          </div>
          
          {/* Basketball Trails */}
          <div className="absolute top-20 left-1/3 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-24 left-1/3 w-1 h-1 bg-orange-300 rounded-full opacity-40"></div>
          <div className="absolute top-28 left-1/3 w-1 h-1 bg-orange-200 rounded-full opacity-20"></div>
          
          <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-red-400 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute bottom-36 right-1/4 w-1 h-1 bg-red-300 rounded-full opacity-30"></div>
          <div className="absolute bottom-40 right-1/4 w-1 h-1 bg-red-200 rounded-full opacity-15"></div>
          
          {/* Action Lines */}
          <div className="absolute top-1/4 left-1/4 w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-25 transform -rotate-12 animate-bounce"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-30 transform rotate-75 animate-pulse"></div>
        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Flame className="h-12 w-12 text-yellow-300 mr-4 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                FEVER GAME TODAY
              </h1>
              <Flame className="h-12 w-12 text-yellow-300 ml-4 animate-pulse" />
            </div>
            <p className="text-2xl text-yellow-100 mb-8 font-bold tracking-wide">
              🔥 CAITLIN CLARK IS ON FIRE! 🔥
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-4 rounded-full font-black text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-yellow-300">
                🏀 TODAY'S GAME 🏀
              </button>
              <button className="bg-transparent border-4 border-yellow-300 hover:bg-yellow-300 hover:text-black text-yellow-300 px-10 py-4 rounded-full font-black text-xl transition-all duration-300 transform hover:scale-105">
                ⚡ HIGHLIGHTS ⚡
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Real-time Update Info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
          </div>
          <button 
            onClick={refreshData}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh Data
          </button>
        </div>

        {/* Live Status Banner */}
        <div className="mb-8">
          <div className={`${liveStatus.isLive ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white p-6 rounded-2xl shadow-2xl border-4 border-yellow-400`}>
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-4">
                {liveStatus.isLive && <div className="w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>}
                <span className="text-2xl font-black">{liveStatus.message}</span>
                {liveStatus.isLive && <div className="w-4 h-4 bg-yellow-300 rounded-full animate-ping"></div>}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Game Status */}
        <section className="mb-12">
          <div className="flex items-center mb-8">
            <Trophy className="h-8 w-8 text-orange-500 mr-4 animate-bounce" />
            <h2 className="text-4xl font-black text-gray-800 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              TODAY'S BATTLE! 🔥
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="transform hover:scale-105 transition-all duration-300">
              {todayGame && (
                <GameCard
                  homeTeam={todayGame.homeTeam}
                  awayTeam={todayGame.awayTeam}
                  homeScore={todayGame.homeScore}
                  awayScore={todayGame.awayScore}
                  date={todayGame.date}
                  time={todayGame.time}
                  venue={todayGame.venue}
                  status={todayGame.status}
                  platform={todayGame.platform}
                />
              )}
            </div>
            <div className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-2xl shadow-xl p-8 border-4 border-orange-400 overflow-hidden">
              {/* Subtle background elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-6 w-10 h-14 bg-gradient-to-b from-orange-200 to-transparent transform rotate-12"></div>
                <div className="absolute bottom-4 left-4 w-8 h-12 bg-gradient-to-b from-red-200 to-transparent transform -rotate-8"></div>
              </div>
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-orange-500 mr-3 animate-pulse" />
                <h3 className="text-2xl font-black text-gray-900 bg-white/80 rounded-lg px-4 py-2">
                  {todayGame?.status === 'live' ? 'LIVE GAME! 🔴' : 'GAME PREVIEW 🚀'}
                </h3>
              </div>
              <p className="text-gray-800 mb-6 text-lg font-semibold leading-relaxed bg-white/70 rounded-lg p-4">
                {todayGame?.status === 'live' 
                  ? '🔴 LIVE ACTION! Caitlin Clark is DOMINATING the court right now! The Fever are putting on a SHOW!' 
                  : '🔥 GET READY FOR AN EPIC SHOWDOWN! The Indiana Fever are about to UNLEASH Caitlin Clark against the Las Vegas Aces! This is going to be INSANE! 🔥'
                }
              </p>
              <div className="flex items-center text-lg font-bold text-red-600 bg-white/80 rounded-lg p-3">
                <Target className="h-6 w-6 mr-2 text-orange-500 animate-spin" />
                <span>🎯 KEY BATTLE: CLARK vs PLUM - WHO WILL DOMINATE?!</span>
              </div>
            </div>
          </div>
        </section>

        {/* Yesterday's Recap */}
        {yesterdayGame && (
          <section className="mb-12">
            <div className="flex items-center mb-8">
              <Flame className="h-8 w-8 text-red-500 mr-4 animate-pulse" />
              <h2 className="text-4xl font-black text-gray-800 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                YESTERDAY'S EXPLOSION! 💥
              </h2>
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <GameCard
                homeTeam={yesterdayGame.homeTeam}
                awayTeam={yesterdayGame.awayTeam}
                homeScore={yesterdayGame.homeScore}
                awayScore={yesterdayGame.awayScore}
                date={yesterdayGame.date}
                time={yesterdayGame.time}
                venue={yesterdayGame.venue}
                status={yesterdayGame.status}
              />
            </div>
          </section>
        )}

        {/* Caitlin Clark Stats */}
        {playerStats && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500 mr-4 animate-spin" />
                <h2 className="text-4xl font-black text-gray-800 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  CLARK IS UNSTOPPABLE! ⚡
                </h2>
              </div>
              <button className="text-orange-500 hover:text-orange-600 font-black text-xl transform hover:scale-110 transition-all">
                SEE ALL MAGIC →
              </button>
            </div>
            <div className="relative bg-gradient-to-br from-white via-yellow-50 to-orange-50 rounded-2xl shadow-2xl p-8 border-4 border-yellow-500 overflow-hidden">
              {/* Subtle background elements */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-6 right-8 w-12 h-16 bg-gradient-to-b from-yellow-200 to-transparent transform rotate-15"></div>
                <div className="absolute bottom-6 left-6 w-10 h-14 bg-gradient-to-b from-orange-200 to-transparent transform -rotate-10"></div>
                <div className="absolute top-1/2 right-1/4 w-8 h-12 bg-gradient-to-b from-red-200 to-transparent transform rotate-45"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-7xl font-black text-red-600 mb-3 animate-pulse bg-white/90 rounded-xl px-4 py-2 shadow-lg border-4 border-red-200">
                    {playerStats.points}
                  </div>
                  <div className="text-xl font-bold text-gray-900 bg-white/80 rounded-lg px-3 py-2">🔥 POINTS 🔥</div>
                  <div className="text-lg text-red-600 font-semibold bg-white/70 rounded-lg px-2 py-1 mt-2">
                    {todayGame?.status === 'live' ? 'LIVE STATS!' : 'Last game DOMINATION!'}
                  </div>
                </div>
                <div className="text-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-7xl font-black text-orange-600 mb-3 animate-pulse bg-white/90 rounded-xl px-4 py-2 shadow-lg border-4 border-orange-200">
                    {playerStats.assists}
                  </div>
                  <div className="text-xl font-bold text-gray-900 bg-white/80 rounded-lg px-3 py-2">🎯 ASSISTS 🎯</div>
                  <div className="text-lg text-orange-600 font-semibold bg-white/70 rounded-lg px-2 py-1 mt-2">
                    {todayGame?.status === 'live' ? 'LIVE COUNT!' : 'Season HIGH!'}
                  </div>
                </div>
                <div className="text-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-7xl font-black text-yellow-600 mb-3 animate-pulse bg-white/90 rounded-xl px-4 py-2 shadow-lg border-4 border-yellow-200">
                    {playerStats.threePointers}
                  </div>
                  <div className="text-xl font-bold text-gray-900 bg-white/80 rounded-lg px-3 py-2">🚀 3-POINTERS 🚀</div>
                  <div className="text-lg text-yellow-600 font-semibold bg-white/70 rounded-lg px-2 py-1 mt-2">
                    {todayGame?.status === 'live' ? 'RAINING NOW!' : 'RAINING THREES!'}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Latest Videos */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-red-500 mr-4 animate-bounce" />
              <h2 className="text-4xl font-black text-gray-800 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                MUST-WATCH HIGHLIGHTS! 🎬
              </h2>
            </div>
            <button className="text-red-500 hover:text-red-600 font-black text-xl transform hover:scale-110 transition-all">
              WATCH ALL FIRE →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="transform hover:scale-105 transition-all duration-300">
                <VideoCard
                  title={video.title}
                  thumbnail={index === 0 ? 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=400' : 
                            index === 1 ? 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400' : 
                            'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  duration={video.duration}
                  views={video.views}
                  uploadDate={video.uploadDate}
                  channel={video.channel}
                />
                {video.isLive && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    🔴 LIVE
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;