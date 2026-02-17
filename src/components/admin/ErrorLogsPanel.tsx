import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Trash2, FileText, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ErrorLog {
  id: string;
  error_type: string;
  error_message: string;
  error_stack: string | null;
  form_data: Record<string, any> | null;
  user_agent: string | null;
  page_url: string | null;
  created_at: string;
  resolved: boolean;
  resolved_at: string | null;
  notes: string | null;
}

export default function ErrorLogsPanel() {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');

  const fetchErrors = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('error_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter === 'unresolved') {
        query = query.eq('resolved', false);
      } else if (filter === 'resolved') {
        query = query.eq('resolved', true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setErrors(data || []);
    } catch (error) {
      console.error('Error fetching error logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrors();
  }, [filter]);

  const markAsResolved = async (id: string) => {
    try {
      const { error } = await supabase
        .from('error_logs')
        .update({ resolved: true, resolved_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;
      fetchErrors();
      setSelectedError(null);
    } catch (error) {
      console.error('Error marking as resolved:', error);
    }
  };

  const deleteError = async (id: string) => {
    if (!confirm('Möchten Sie diesen Fehler wirklich löschen?')) return;

    try {
      const { error } = await supabase
        .from('error_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchErrors();
      setSelectedError(null);
    } catch (error) {
      console.error('Error deleting log:', error);
    }
  };

  const getErrorTypeLabel = (type: string) => {
    switch (type) {
      case 'contact_form':
        return 'Kontaktformular';
      case 'chat_bot_offer':
        return 'ChatBot Angebot';
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffd900]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#585858]">Fehlerprotokoll</h2>
        <button
          onClick={fetchErrors}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw size={18} />
          <span>Aktualisieren</span>
        </button>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-[#ffd900] text-[#585858]'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Alle ({errors.length})
        </button>
        <button
          onClick={() => setFilter('unresolved')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'unresolved'
              ? 'bg-[#ffd900] text-[#585858]'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Offen
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'resolved'
              ? 'bg-[#ffd900] text-[#585858]'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Erledigt
        </button>
      </div>

      {errors.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Keine Fehler gefunden
          </h3>
          <p className="text-gray-500">
            {filter === 'unresolved'
              ? 'Alle Fehler wurden bearbeitet!'
              : 'Es wurden keine Fehler protokolliert.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {errors.map((error) => (
            <div
              key={error.id}
              className={`bg-white rounded-lg p-6 shadow-sm border-l-4 ${
                error.resolved ? 'border-green-500' : 'border-red-500'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <AlertCircle
                      className={error.resolved ? 'text-green-500' : 'text-red-500'}
                      size={20}
                    />
                    <span className="font-semibold text-[#585858]">
                      {getErrorTypeLabel(error.error_type)}
                    </span>
                    {error.resolved && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Erledigt
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{error.error_message}</p>
                  <p className="text-xs text-gray-400">{formatDate(error.created_at)}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedError(error)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Details anzeigen"
                  >
                    <FileText size={18} />
                  </button>
                  {!error.resolved && (
                    <button
                      onClick={() => markAsResolved(error.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Als erledigt markieren"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteError(error.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Löschen"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {error.form_data && (
                <div className="bg-gray-50 rounded p-3 mt-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Formulardaten:</p>
                  <pre className="text-xs text-gray-600 overflow-x-auto">
                    {JSON.stringify(error.form_data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#585858]">Fehlerdetails</h3>
              <button
                onClick={() => setSelectedError(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Typ:</p>
                <p className="text-sm text-gray-600">{getErrorTypeLabel(selectedError.error_type)}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Fehlermeldung:</p>
                <p className="text-sm text-gray-600">{selectedError.error_message}</p>
              </div>
              {selectedError.error_stack && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Stack Trace:</p>
                  <pre className="text-xs text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                    {selectedError.error_stack}
                  </pre>
                </div>
              )}
              {selectedError.form_data && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Formulardaten:</p>
                  <pre className="text-xs text-gray-600 bg-gray-50 p-3 rounded overflow-x-auto">
                    {JSON.stringify(selectedError.form_data, null, 2)}
                  </pre>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Seiten-URL:</p>
                <p className="text-sm text-gray-600">{selectedError.page_url || 'Nicht verfügbar'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Browser:</p>
                <p className="text-xs text-gray-600 break-all">{selectedError.user_agent || 'Nicht verfügbar'}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-1">Zeitpunkt:</p>
                <p className="text-sm text-gray-600">{formatDate(selectedError.created_at)}</p>
              </div>
              {selectedError.resolved && selectedError.resolved_at && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">Erledigt am:</p>
                  <p className="text-sm text-gray-600">{formatDate(selectedError.resolved_at)}</p>
                </div>
              )}
              <div className="flex space-x-3 pt-4">
                {!selectedError.resolved && (
                  <button
                    onClick={() => markAsResolved(selectedError.id)}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Als erledigt markieren
                  </button>
                )}
                <button
                  onClick={() => deleteError(selectedError.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
