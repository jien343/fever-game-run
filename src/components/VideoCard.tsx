import React from 'react';
import { Play, Clock, Eye, Flame, Zap } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  channel: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  duration,
  views,
  uploadDate,
  channel
}) => {
  return (
    <div className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-4 border-orange-400 hover:border-red-500 transform hover:scale-105">
      {/* Background Player Silhouettes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-2 right-4 w-8 h-12 bg-gradient-to-b from-orange-200 to-transparent transform rotate-15">
          <div className="w-2 h-2 bg-orange-100 rounded-full mx-auto mb-1"></div>
          <div className="w-4 h-6 bg-orange-200 mx-auto mb-1"></div>
          <div className="w-3 h-3 bg-orange-200 mx-auto"></div>
        </div>
        <div className="absolute bottom-4 left-3 w-6 h-10 bg-gradient-to-b from-red-200 to-transparent transform -rotate-12">
          <div className="w-1 h-1 bg-red-100 rounded-full mx-auto mb-1"></div>
          <div className="w-3 h-5 bg-red-200 mx-auto mb-1"></div>
          <div className="w-2 h-3 bg-red-200 mx-auto"></div>
        </div>
      </div>
      <div className="relative group">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <div className="absolute inset-0 bg-red-500 bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white rounded-full p-4 transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <Play className="h-12 w-12 text-red-500" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-black flex items-center">
            <Flame className="h-4 w-4 mr-1 animate-pulse" />
            HOT
          </div>
        </div>
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-80 text-white px-3 py-2 rounded-full text-sm font-bold">
          ⏱️ {duration}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-black text-xl text-gray-900 mb-3 line-clamp-2 leading-tight bg-white/80 rounded-lg p-2">{title}</h3>
        <p className="text-lg font-bold text-red-600 mb-3 bg-white/70 rounded-lg px-3 py-1">📺 {channel}</p>
        <div className="flex items-center text-sm font-semibold text-gray-700 space-x-4 bg-white/70 rounded-lg p-3">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2 text-red-500" />
            <span>👀 {views}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-orange-500" />
            <span>📅 {uploadDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;