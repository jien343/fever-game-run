import React, { useState } from 'react';
import { Play, Clock, Eye, Flame, Zap, X } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  channel: string;
  videoId?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  duration,
  views,
  uploadDate,
  channel,
  videoId
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePlay = () => {
    setShowModal(true);
    setIsPlaying(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsPlaying(false);
  };

  return (
    <>
      <div className="relative bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-4 border-orange-400 hover:border-red-500 transform hover:scale-105 cursor-pointer">
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
        
        <div className="relative group" onClick={handlePlay}>
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400';
            }}
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

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              {videoId ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-center text-white p-8">
                  <div className="mb-4">
                    <Play className="h-16 w-16 mx-auto text-red-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    <p className="text-gray-300">🔥 This is a demo video player</p>
                    <p className="text-gray-400 mt-2">In a real application, this would play the actual video content</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 mt-6">
                    <p className="text-sm text-gray-300">📺 Channel: {channel}</p>
                    <p className="text-sm text-gray-300">👀 Views: {views}</p>
                    <p className="text-sm text-gray-300">📅 Uploaded: {uploadDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;