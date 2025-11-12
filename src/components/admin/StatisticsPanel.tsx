import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, Clock, Activity } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  todayVisitors: number;
  last7DaysVisitors: number;
  last30DaysVisitors: number;
  totalPageViews: number;
  activeNow: number;
}

const StatisticsPanel: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    todayVisitors: 0,
    last7DaysVisitors: 0,
    last30DaysVisitors: 0,
    totalPageViews: 0,
    activeNow: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

      const { data: allStats, error } = await supabase
        .from('visitor_stats')
        .select('*')
        .order('visited_at', { ascending: false });

      if (error) throw error;

      const stats = allStats || [];

      const filterByDate = (statsList: any[], date: Date) => {
        return statsList.filter(s => new Date(s.visited_at) >= date);
      };

      const uniqueSessions = (statsList: any[]) => {
        return new Set(statsList.map(item => item.session_id)).size;
      };

      const todayData = filterByDate(stats, today);
      const sevenDaysData = filterByDate(stats, sevenDaysAgo);
      const thirtyDaysData = filterByDate(stats, thirtyDaysAgo);
      const activeData = filterByDate(stats, fiveMinutesAgo);

      setStats({
        todayVisitors: uniqueSessions(todayData),
        last7DaysVisitors: uniqueSessions(sevenDaysData),
        last30DaysVisitors: uniqueSessions(thirtyDaysData),
        totalPageViews: stats.length,
        activeNow: uniqueSessions(activeData),
      });
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      icon: Activity,
      label: 'Aktive Besucher',
      value: stats.activeNow,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Users,
      label: 'Heute',
      value: stats.todayVisitors,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: TrendingUp,
      label: 'Letzte 7 Tage',
      value: stats.last7DaysVisitors,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Clock,
      label: 'Letzte 30 Tage',
      value: stats.last30DaysVisitors,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Eye,
      label: 'Gesamt Seitenaufrufe',
      value: stats.totalPageViews,
      color: 'text-[#ffd900]',
      bgColor: 'bg-[#ffd900]/10',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Lade Statistiken...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#585858]">Besucherstatistiken</h2>
        <button
          onClick={loadStatistics}
          className="px-4 py-2 bg-[#ffd900] text-[#585858] rounded-lg font-medium hover:bg-[#e6c200] transition-colors"
        >
          Aktualisieren
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} w-12 h-12 rounded-full flex items-center justify-center`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <span className={`text-3xl font-bold ${stat.color}`}>{stat.value}</span>
            </div>
            <h3 className="text-gray-600 font-medium">{stat.label}</h3>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Eye className="text-blue-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-blue-900 mb-2">DSGVO-konforme Tracking-Hinweise</h3>
            <p className="text-blue-800 text-sm">
              Alle gesammelten Besucherdaten sind anonymisiert und DSGVO-konform. IP-Adressen
              werden gehasht und Session-IDs sind temporär. Das Tracking erfolgt nur mit
              Einwilligung des Besuchers über das Cookie-Banner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;
