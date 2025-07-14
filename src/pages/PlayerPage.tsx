import React from 'react';
import { Star, TrendingUp, Award, Target } from 'lucide-react';
import PlayerStats from '../components/PlayerStats';
import VideoCard from '../components/VideoCard';

const PlayerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="w-32 h-32 bg-amber-500 rounded-full flex items-center justify-center">
                <Star className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Caitlin Clark
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                Point Guard • Indiana Fever • #22
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-amber-500" />
                  <span>2024 WNBA Rookie of the Year</span>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-amber-500" />
                  <span>All-Star Selection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Season Stats */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-amber-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Season Stats</h2>
          </div>
          <PlayerStats />
        </section>

        {/* Recent Performance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Performance</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Opponent</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Result</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">PTS</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">AST</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">REB</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">3PM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-800">Jan 14</td>
                      <td className="py-3 px-4 text-gray-800">vs PHX</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">W 89-76</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-600">22</td>
                      <td className="py-3 px-4 font-bold text-amber-600">9</td>
                      <td className="py-3 px-4 text-gray-800">6</td>
                      <td className="py-3 px-4 font-bold text-amber-600">5</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-800">Jan 12</td>
                      <td className="py-3 px-4 text-gray-800">@ SEA</td>
                      <td className="py-3 px-4">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">L 84-91</span>
                      </td>
                      <td className="py-3 px-4 text-gray-800">18</td>
                      <td className="py-3 px-4 text-gray-800">7</td>
                      <td className="py-3 px-4 text-gray-800">5</td>
                      <td className="py-3 px-4 text-gray-800">2</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-800">Jan 10</td>
                      <td className="py-3 px-4 text-gray-800">vs ATL</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">W 95-82</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-600">24</td>
                      <td className="py-3 px-4 font-bold text-amber-600">11</td>
                      <td className="py-3 px-4 text-gray-800">4</td>
                      <td className="py-3 px-4 text-gray-800">3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Videos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Highlight Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VideoCard
              title="Caitlin Clark's Career-High 31 Points vs Connecticut Sun"
              thumbnail="https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=400"
              duration="4:32"
              views="42.8K"
              uploadDate="3 days ago"
              channel="WNBA Official"
              videoId="dQw4w9WgXcQ"
            />
            <VideoCard
              title="Clark's Logo 3-Pointer Sends Crowd into Frenzy"
              thumbnail="https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=400"
              duration="1:45"
              views="28.3K"
              uploadDate="5 days ago"
              channel="ESPN"
              videoId="jNQXAC9IVRw"
            />
            <VideoCard
              title="Behind the Scenes: Caitlin Clark's Pre-Game Routine"
              thumbnail="https://images.pexels.com/photos/1407354/pexels-photo-1407354.jpeg?auto=compress&cs=tinysrgb&w=400"
              duration="3:18"
              views="19.7K"
              uploadDate="1 week ago"
              channel="Indiana Fever"
              videoId="M7lc1UVf-VE"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlayerPage;