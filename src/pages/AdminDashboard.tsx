import React, { useState, useEffect } from 'react';
import { BarChart3, Mail, Settings, MessageCircle, AlertCircle } from 'lucide-react';
import { supabase, type ContactRequest } from '../lib/supabase';
import StatisticsPanel from '../components/admin/StatisticsPanel';
import InboxPanel from '../components/admin/InboxPanel';
import SettingsPanel from '../components/admin/SettingsPanel';
import KIPostfachPanel from '../components/admin/KIPostfachPanel';
import ErrorLogsPanel from '../components/admin/ErrorLogsPanel';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'statistics' | 'inbox' | 'ki-inbox' | 'errors' | 'settings'>(
    'statistics'
  );
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContactRequests();
  }, []);

  const loadContactRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContactRequests(data || []);
    } catch (error) {
      console.error('Error loading contact requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'statistics' as const, label: 'Statistiken', icon: BarChart3 },
    { id: 'inbox' as const, label: 'Postfach', icon: Mail },
    { id: 'ki-inbox' as const, label: 'KI-Postfach', icon: MessageCircle },
    { id: 'errors' as const, label: 'Fehlerprotokoll', icon: AlertCircle },
    { id: 'settings' as const, label: 'Einstellungen', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#585858] mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Verwalten Sie Ihre Website und Kontaktanfragen
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#ffd900] text-[#ffd900]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'statistics' && <StatisticsPanel />}
              {activeTab === 'inbox' && (
                <InboxPanel
                  requests={contactRequests}
                  onRefresh={loadContactRequests}
                  loading={loading}
                />
              )}
              {activeTab === 'ki-inbox' && <KIPostfachPanel />}
              {activeTab === 'errors' && <ErrorLogsPanel />}
              {activeTab === 'settings' && <SettingsPanel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
