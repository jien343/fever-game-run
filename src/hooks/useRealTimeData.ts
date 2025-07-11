import { useState, useEffect } from 'react';

export interface GameData {
  id: string;
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

export interface PlayerStats {
  points: number;
  assists: number;
  threePointers: number;
  rebounds: number;
  fieldGoalPercentage: number;
}

export interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  channel: string;
  isLive?: boolean;
}

export interface LiveStatus {
  isLive: boolean;
  message: string;
  gameId?: string;
}

// 模拟实时数据API
const mockApiCall = <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const useRealTimeData = () => {
  const [todayGame, setTodayGame] = useState<GameData | null>(null);
  const [yesterdayGame, setYesterdayGame] = useState<GameData | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [liveStatus, setLiveStatus] = useState<LiveStatus>({ isLive: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // 获取今日比赛数据
  const fetchTodayGame = async (): Promise<GameData> => {
    const currentHour = new Date().getHours();
    const isGameTime = currentHour >= 19 && currentHour <= 22; // 7PM-10PM
    
    return mockApiCall({
      id: 'today-game',
      homeTeam: 'Indiana Fever',
      awayTeam: 'Las Vegas Aces',
      homeScore: isGameTime ? Math.floor(Math.random() * 20) + 70 : undefined,
      awayScore: isGameTime ? Math.floor(Math.random() * 20) + 65 : undefined,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: '7:00 PM EST',
      venue: 'Gainbridge Fieldhouse',
      status: isGameTime ? 'live' : 'upcoming',
      platform: 'ESPN'
    });
  };

  // 获取昨日比赛数据
  const fetchYesterdayGame = async (): Promise<GameData> => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    return mockApiCall({
      id: 'yesterday-game',
      homeTeam: 'Indiana Fever',
      awayTeam: 'Phoenix Mercury',
      homeScore: 89,
      awayScore: 76,
      date: yesterday.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: '7:00 PM EST',
      venue: 'Gainbridge Fieldhouse',
      status: 'finished'
    });
  };

  // 获取球员实时统计
  const fetchPlayerStats = async (): Promise<PlayerStats> => {
    const baseStats = { points: 22, assists: 9, threePointers: 5, rebounds: 6, fieldGoalPercentage: 45.2 };
    const currentHour = new Date().getHours();
    const isGameTime = currentHour >= 19 && currentHour <= 22;
    
    if (isGameTime) {
      // 比赛进行中，数据会变化
      return mockApiCall({
        points: baseStats.points + Math.floor(Math.random() * 10),
        assists: baseStats.assists + Math.floor(Math.random() * 5),
        threePointers: baseStats.threePointers + Math.floor(Math.random() * 3),
        rebounds: baseStats.rebounds + Math.floor(Math.random() * 4),
        fieldGoalPercentage: baseStats.fieldGoalPercentage + (Math.random() * 10 - 5)
      });
    }
    
    return mockApiCall(baseStats);
  };

  // 获取最新视频数据
  const fetchVideos = async (): Promise<VideoData[]> => {
    const now = new Date();
    const currentHour = now.getHours();
    const isLiveTime = currentHour >= 19 && currentHour <= 22;
    
    return mockApiCall([
      {
        id: '1',
        title: isLiveTime ? '🔴 LIVE: Caitlin Clark DOMINATING vs Las Vegas Aces!' : '🔥 Caitlin Clark\'s 22-Point EXPLOSION vs Phoenix Mercury!',
        thumbnail: 'https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: isLiveTime ? 'LIVE' : '3:45',
        views: `${(15.2 + Math.random() * 5).toFixed(1)}K`,
        uploadDate: isLiveTime ? 'LIVE NOW' : '1 day ago',
        channel: 'WNBA Official',
        isLive: isLiveTime
      },
      {
        id: '2',
        title: '⚡ Indiana Fever Win Streak CONTINUES with DOMINANT Victory!',
        thumbnail: 'https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '2:18',
        views: `${(8.7 + Math.random() * 2).toFixed(1)}K`,
        uploadDate: '1 day ago',
        channel: 'ESPN'
      },
      {
        id: '3',
        title: '🚀 Top 5 INSANE Plays from Fever vs Mercury Game!',
        thumbnail: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400',
        duration: '4:12',
        views: `${(12.1 + Math.random() * 3).toFixed(1)}K`,
        uploadDate: '2 days ago',
        channel: 'House of Highlights'
      }
    ]);
  };

  // 获取直播状态
  const fetchLiveStatus = async (): Promise<LiveStatus> => {
    const currentHour = new Date().getHours();
    const isLiveTime = currentHour >= 19 && currentHour <= 22;
    
    if (isLiveTime) {
      const messages = [
        '🔴 LIVE NOW: FEVER DOMINATING!',
        '🔥 CLARK IS ON FIRE RIGHT NOW!',
        '⚡ FEVER LEADING BY 12 POINTS!',
        '🚀 INCREDIBLE PERFORMANCE HAPPENING!',
        '💥 FEVER UNSTOPPABLE TONIGHT!'
      ];
      
      return mockApiCall({
        isLive: true,
        message: messages[Math.floor(Math.random() * messages.length)],
        gameId: 'today-game'
      });
    }
    
    return mockApiCall({
      isLive: false,
      message: '🏀 NEXT GAME: TODAY AT 7:00 PM EST!'
    });
  };

  // 初始数据加载
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [todayGameData, yesterdayGameData, playerStatsData, videosData, liveStatusData] = await Promise.all([
        fetchTodayGame(),
        fetchYesterdayGame(),
        fetchPlayerStats(),
        fetchVideos(),
        fetchLiveStatus()
      ]);

      setTodayGame(todayGameData);
      setYesterdayGame(yesterdayGameData);
      setPlayerStats(playerStatsData);
      setVideos(videosData);
      setLiveStatus(liveStatusData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 实时更新数据
  const updateRealTimeData = async () => {
    try {
      const [todayGameData, playerStatsData, videosData, liveStatusData] = await Promise.all([
        fetchTodayGame(),
        fetchPlayerStats(),
        fetchVideos(),
        fetchLiveStatus()
      ]);

      setTodayGame(todayGameData);
      setPlayerStats(playerStatsData);
      setVideos(videosData);
      setLiveStatus(liveStatusData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error updating real-time data:', error);
    }
  };

  // 初始化和设置定时更新
  useEffect(() => {
    loadInitialData();

    // 每30秒更新一次实时数据
    const interval = setInterval(updateRealTimeData, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    todayGame,
    yesterdayGame,
    playerStats,
    videos,
    liveStatus,
    loading,
    lastUpdate,
    refreshData: updateRealTimeData
  };
};