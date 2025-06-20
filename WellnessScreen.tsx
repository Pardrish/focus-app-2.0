import React, { useState } from 'react';
import { Search, Play, Clock, User, Heart } from 'lucide-react';
import { Header } from '../components/Layout/Header';
import { Card } from '../components/UI/Card';
import { WellnessCategory } from '../types';

// Mock wellness video data (in a real app, this would come from YouTube API)
const mockWellnessVideos = [
  {
    id: '1',
    title: '10 Minute Morning Meditation',
    thumbnail: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=300',
    duration: '10:32',
    channel: 'Mindful Living',
    category: 'meditation' as WellnessCategory,
    url: 'https://www.youtube.com/watch?v=8ln4XfRi6uw',
  },
  {
    id: '2',
    title: 'Gentle Yoga Flow for Beginners',
    thumbnail: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=300',
    duration: '15:45',
    channel: 'Yoga with Sarah',
    category: 'yoga' as WellnessCategory,
    url: 'https://www.youtube.com/watch?v=I77hh5I69gA',
  },
  {
    id: '3',
    title: 'HIIT Workout - No Equipment',
    thumbnail: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=300',
    duration: '20:15',
    channel: 'FitLife',
    category: 'fitness' as WellnessCategory,
    url: 'https://www.youtube.com/watch?v=J212vz33gU4',
  },
];

const wellnessCategories = [
  { id: 'meditation', name: 'Meditation & Mindfulness', emoji: '🧘' },
  { id: 'yoga', name: 'Yoga & Stretching', emoji: '🧘‍♀️' },
  { id: 'fitness', name: 'Fitness & Exercise', emoji: '💪' },
  { id: 'nutrition', name: 'Nutrition & Healthy Eating', emoji: '🥗' },
  { id: 'sleep', name: 'Sleep & Relaxation', emoji: '😴' },
  { id: 'uploadVideo', name: 'Upload Wellness Video', emoji: '' },
];

export function WellnessScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'discover' | 'search' | 'playlists' | 'live'>('discover');

  const tabs = [
    { id: 'discover', label: 'Discover', icon: '✨' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'playlists', label: 'Playlists', icon: '⏰' },
    { id: 'live', label: 'Live', icon: '📡' },
  ];

  const VideoCard = ({ video }: { video: typeof mockWellnessVideos[0] }) => (
    <Card className="mb-4" hover>
      <div className="flex gap-3">
        <div className="relative flex-shrink-0">
          <a 
          href={video.url}
          target="_blank"
          rel='noopener noreferrer'
          className="relative flex-shrink-0"
          >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-24 h-16 rounded-lg object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
            <Play size={16} className="text-white" />
          </div>
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
          </a>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white text-sm leading-tight mb-1">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <User size={12} />
            <span>{video.channel}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <Clock size={12} />
            <span>{video.duration}</span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen dark-gradient pb-20">
      <Header 
        title="Wellness" 
        rightAction={
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <Heart size={20} className="text-coral-500" />
          </button>
        }
      />

      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search wellness videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-500/50"
          />
        </div>

        {/* Tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'coral-gradient text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="text-center">
                <div className="text-sm mb-1">{tab.icon}</div>
                <div>{tab.label}</div>
              </div>
            </button>
          ))}
        </div>

        {activeTab === 'discover' && (
          <>
            {/* Health Categories */}
            <Card className="mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">Health Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                {wellnessCategories.map((category) => (
                  <button
                    key={category.id}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-left transition-colors"
                  >
                    <div className="text-2xl mb-2">{category.emoji}</div>
                    <div className="font-medium text-white text-sm mb-1">
                      {category.name}
                    </div>
                    {/*<div className="text-xs text-gray-400">
                      {category.count} videos
                    </div> */}
                  </button>
                ))}
              </div>
            </Card>

            {/* Recommended Videos */}
            <Card>
              <h2 className="text-lg font-semibold text-white mb-4">Recommended Videos</h2>
              {mockWellnessVideos.length > 0 ? (
                <div>
                  {mockWellnessVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    ❤️
                  </div>
                  <p className="text-gray-400">No videos available</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Check back later for wellness content
                  </p>
                </div>
              )}
            </Card>
          </>
        )}

        {activeTab === 'search' && (
          <Card>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                🔍
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Search for wellness content</h3>
              <p className="text-gray-400">
                Enter keywords to find meditation, yoga, fitness, and wellness videos
              </p>
            </div>
          </Card>
        )}

        {activeTab === 'playlists' && (
          <Card>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                📚
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Playlists</h3>
              <p className="text-gray-400 mb-4">
                Save your favorite wellness videos for easy access
              </p>
            </div>
          </Card>
        )}

        {activeTab === 'live' && (
          <Card>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                📡
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Live Wellness Sessions</h3>
              <p className="text-gray-400">
                Join live meditation, yoga, and fitness sessions
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}