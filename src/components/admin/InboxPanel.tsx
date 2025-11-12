import React, { useState } from 'react';
import {
  Mail,
  Check,
  Search,
  Download,
  ExternalLink,
  Calendar,
  Filter,
} from 'lucide-react';
import { supabase, type ContactRequest } from '../../lib/supabase';

interface InboxPanelProps {
  requests: ContactRequest[];
  onRefresh: () => void;
  loading: boolean;
}

const InboxPanel: React.FC<InboxPanelProps> = ({ requests, onRefresh, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'done'>('all');

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || request.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleMarkAsDone = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'open' ? 'done' : 'open';
      const { error } = await supabase
        .from('contact_requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      onRefresh();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Fehler beim Aktualisieren des Status');
    }
  };

  const exportToCSV = () => {
    const headers = ['Datum', 'Name', 'E-Mail', 'Telefon', 'Nachricht', 'Status'];
    const csvData = filteredRequests.map((req) => [
      new Date(req.created_at).toLocaleString('de-DE'),
      req.name,
      req.email,
      req.phone || '',
      req.message.replace(/\n/g, ' '),
      req.status === 'open' ? 'Offen' : 'Erledigt',
    ]);

    const csvContent = [
      headers.join(';'),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(';')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `kontaktanfragen_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const openCount = requests.filter((r) => r.status === 'open').length;
  const doneCount = requests.filter((r) => r.status === 'done').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Lade Kontaktanfragen...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#585858]">Kontaktanfragen</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-[#ffd900] text-[#585858] rounded-lg font-medium hover:bg-[#e6c200] transition-colors"
        >
          <Download size={20} />
          <span>Als CSV exportieren</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-700 font-medium">Gesamt</span>
            <span className="text-2xl font-bold text-blue-700">{requests.length}</span>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-orange-700 font-medium">Offen</span>
            <span className="text-2xl font-bold text-orange-700">{openCount}</span>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-green-700 font-medium">Erledigt</span>
            <span className="text-2xl font-bold text-green-700">{doneCount}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Suchen nach Name, E-Mail oder Nachricht..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
          >
            <option value="all">Alle Status</option>
            <option value="open">Nur Offen</option>
            <option value="done">Nur Erledigt</option>
          </select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Mail className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all'
              ? 'Keine Anfragen gefunden'
              : 'Noch keine Kontaktanfragen vorhanden'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className={`border-2 rounded-lg p-4 ${
                request.status === 'open'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'open'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {request.status === 'open' ? 'Offen' : 'Erledigt'}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-1" />
                      {new Date(request.created_at).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#585858] text-lg mb-1">
                    {request.name}
                  </h3>
                  <div className="space-y-1 mb-3">
                    <p className="text-sm text-gray-600">
                      <a
                        href={`mailto:${request.email}`}
                        className="hover:text-[#ffd900] transition-colors"
                      >
                        {request.email}
                      </a>
                    </p>
                    {request.phone && (
                      <p className="text-sm text-gray-600">
                        <a
                          href={`tel:${request.phone}`}
                          className="hover:text-[#ffd900] transition-colors"
                        >
                          {request.phone}
                        </a>
                      </p>
                    )}
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{request.message}</p>
                </div>
                <div className="flex md:flex-col gap-2">
                  <button
                    onClick={() => handleMarkAsDone(request.id, request.status)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      request.status === 'open'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    <Check size={20} />
                    <span>
                      {request.status === 'open' ? 'Erledigt' : 'Wieder öffnen'}
                    </span>
                  </button>
                  <a
                    href={`mailto:${request.email}?subject=Re: Ihre Anfrage&body=Hallo ${request.name},%0D%0A%0D%0A`}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#ffd900] text-[#585858] rounded-lg font-medium hover:bg-[#e6c200] transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span>Antworten</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InboxPanel;
