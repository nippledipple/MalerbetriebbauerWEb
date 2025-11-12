import { useState, useEffect } from 'react';
import { Search, Download, Filter, Mail, Phone, MapPin, CheckCircle, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AIInquiry {
  id: string;
  created_at: string;
  source: string;
  name: string;
  phone: string | null;
  email: string | null;
  address_street: string | null;
  address_zip: string | null;
  address_city: string | null;
  work_type: string | null;
  message: string | null;
  status: string;
  updated_at: string;
}

export default function KIPostfachPanel() {
  const [inquiries, setInquiries] = useState<AIInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading inquiries:', error);
        alert(`Fehler beim Laden: ${error.message}`);
      }
      setInquiries(data || []);
      console.log('Loaded inquiries:', data);
    } catch (error) {
      console.error('Error loading inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('ai_inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      await loadInquiries();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Datum', 'Quelle', 'Name', 'Telefon', 'E-Mail', 'Adresse', 'Arbeitstyp', 'Nachricht', 'Status'];
    const rows = filteredInquiries.map(inq => [
      new Date(inq.created_at).toLocaleString('de-DE'),
      inq.source,
      inq.name,
      inq.phone || '',
      inq.email || '',
      `${inq.address_street || ''}, ${inq.address_zip || ''} ${inq.address_city || ''}`.trim(),
      inq.work_type || '',
      inq.message || '',
      inq.status
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `ki-anfragen-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone?.includes(searchTerm) ||
      inq.address_zip?.includes(searchTerm) ||
      inq.work_type?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: inquiries.length,
    neu: inquiries.filter(i => i.status === 'Neu').length,
    inProgress: inquiries.filter(i => i.status === 'In Bearbeitung').length,
    done: inquiries.filter(i => i.status === 'Erledigt').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KI-Postfach</h2>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Download className="w-4 h-4" />
          CSV Export
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Gesamt</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Neu</div>
          <div className="text-2xl font-bold text-orange-600">{stats.neu}</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">In Bearbeitung</div>
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
        </div>
        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg border border-gray-200 dark:border-neutral-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">Erledigt</div>
          <div className="text-2xl font-bold text-green-600">{stats.done}</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Name, E-Mail, PLZ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white"
          >
            <option value="all">Alle Status</option>
            <option value="Neu">Neu</option>
            <option value="In Bearbeitung">In Bearbeitung</option>
            <option value="Erledigt">Erledigt</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">Lade Anfragen...</div>
      ) : filteredInquiries.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          {searchTerm || statusFilter !== 'all' ? 'Keine Anfragen gefunden.' : 'Noch keine Anfragen vorhanden.'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-gray-200 dark:border-neutral-700 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{inquiry.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      inquiry.status === 'Neu' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                      inquiry.status === 'In Bearbeitung' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    }`}>
                      {inquiry.status}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 dark:bg-neutral-700 dark:text-gray-300">
                      {inquiry.source}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(inquiry.created_at).toLocaleString('de-DE')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {inquiry.status !== 'In Bearbeitung' && (
                    <button
                      onClick={() => updateStatus(inquiry.id, 'In Bearbeitung')}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Clock className="w-4 h-4" />
                      In Bearbeitung
                    </button>
                  )}
                  {inquiry.status !== 'Erledigt' && (
                    <button
                      onClick={() => updateStatus(inquiry.id, 'Erledigt')}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Erledigt
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {inquiry.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${inquiry.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {inquiry.email}
                    </a>
                  </div>
                )}
                {inquiry.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${inquiry.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                      {inquiry.phone}
                    </a>
                  </div>
                )}
                {(inquiry.address_street || inquiry.address_zip || inquiry.address_city) && (
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>
                      {inquiry.address_street && `${inquiry.address_street}, `}
                      {inquiry.address_zip} {inquiry.address_city}
                    </span>
                  </div>
                )}
              </div>

              {inquiry.work_type && (
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Arbeitstyp: </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{inquiry.work_type}</span>
                </div>
              )}

              {inquiry.message && (
                <div className="bg-gray-50 dark:bg-neutral-700 p-3 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{inquiry.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
