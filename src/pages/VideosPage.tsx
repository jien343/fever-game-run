import React, { useState } from 'react';
import { Video, Search, Filter } from 'lucide-react';
import VideoCard from '../components/VideoCard';

const VideosPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'highlights', name: 'Game Highlights' },
    { id: 'clark', name: 'Caitlin Clark' },
    { id: 'interviews', name: 'Interviews' },
    { id: 'analysis', name: 'Analysis' }
  ];

  const videos = [
    {
      title: "Caitlin Clark's 22-Point Performance vs Phoenix Mercury",
      thumbnail: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "3:45",
      views: "15.2K",
      uploadDate: "1 day ago",
      channel: "WNBA Official"
    },
    {
      title: "Indiana Fever Win Streak Continues with Dominant Victory",
      thumbnail: "https://images.pexels.com/photos/1544775/pexels-photo-1544775.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "2:18",
      views: "8.7K",
      uploadDate: "1 day ago",
      channel: "ESPN"
    },
    {
      title: "Top 5 Plays from Fever vs Mercury Game",
      thumbnail: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "4:12",
      views: "12.1K",
      uploadDate: "2 days ago",
      channel: "House of Highlights"
    },
    {
      title: "Caitlin Clark Post-Game Interview After Victory",
      thumbnail: "https://images.pexels.com/photos/1544775/pexels-photo-1544775.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "5:23",
      views: "9.4K",
      uploadDate: "2 days ago",
      channel: "Indiana Fever"
    },
    {
      title: "Breaking Down Clark's Incredible Court Vision",
      thumbnail: "https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "6:17",
      views: "18.9K",
      uploadDate: "3 days ago",
      channel: "Basketball Breakdown"
    },
    {
      title: "Fever vs Aces: Full Game Highlights",
      thumbnail: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "8:45",
      views: "32.5K",
      uploadDate: "4 days ago",
      channel: "WNBA Official"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Video className="h-8 w-8 text-amber-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Video Highlights</h1>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={index} {...video} />
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideosPage;