import React from 'react';
import { TrendingUp, Target, Users, Zap } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, trend, subtitle }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="text-amber-500">{icon}</div>
        {trend && (
          <TrendingUp className={`h-4 w-4 ${getTrendColor()}`} />
        )}
      </div>
      <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
      {subtitle && (
        <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
      )}
    </div>
  );
};

const PlayerStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        icon={<Target className="h-6 w-6" />}
        label="Points per Game"
        value="19.2"
        trend="up"
        subtitle="Last 5 games"
      />
      <StatCard
        icon={<Users className="h-6 w-6" />}
        label="Assists per Game"
        value="8.4"
        trend="up"
        subtitle="Season average"
      />
      <StatCard
        icon={<Zap className="h-6 w-6" />}
        label="3-Point %"
        value="32.7%"
        trend="neutral"
        subtitle="This season"
      />
      <StatCard
        icon={<TrendingUp className="h-6 w-6" />}
        label="Rebounds per Game"
        value="5.7"
        trend="up"
        subtitle="Career high"
      />
    </div>
  );
};

export default PlayerStats;