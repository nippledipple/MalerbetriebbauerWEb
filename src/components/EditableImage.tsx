import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Check, X } from 'lucide-react';
import { localDb } from '../lib/localDb';
import { useAuth } from '../contexts/AuthContext';

interface EditableImageProps {
  page: string;
  section: string;
  defaultSrc: string;
  alt: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  page,
  section,
  defaultSrc,
  alt,
  className = '',
}) => {
  const { user } = useAuth();
  const [src, setSrc] = useState(defaultSrc);
  const [isEditing, setIsEditing] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  useEffect(() => {
    loadImage();
  }, [page, section]);

  const loadImage = async () => {
    try {
      const saved = await localDb.getPageContent(page, section);
      if (saved) {
        setSrc(saved.content);
      }
    } catch (error) {
      console.error('Error loading image:', error);
    }
  };

  const handleEdit = () => {
    setUrlInput(src);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await localDb.setPageContent(page, section, 'image', urlInput);
      setSrc(urlInput);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleCancel = () => {
    setUrlInput('');
    setIsEditing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Bitte wählen Sie eine Bilddatei');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setUrlInput(result);
    };
    reader.readAsDataURL(file);
  };

  if (isEditing) {
    return (
      <div className="relative border-2 border-[#ffd900] rounded-lg p-4 bg-white">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bild-URL eingeben
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#ffd900] focus:border-transparent"
            />
          </div>

          <div className="text-center text-gray-500">
            <span className="text-sm">oder</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bild hochladen
            </label>
            <label className="flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-[#ffd900] transition-colors">
              <Upload size={20} className="mr-2" />
              <span>Datei auswählen</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {urlInput && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Vorschau:</p>
              <img
                src={urlInput}
                alt="Vorschau"
                className="max-w-full max-h-64 rounded shadow"
                onError={() => alert('Bild konnte nicht geladen werden')}
              />
            </div>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <button
              onClick={handleSave}
              disabled={!urlInput}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={16} />
              <span>Speichern</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <X size={16} />
              <span>Abbrechen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <img src={src} alt={alt} className={className} />
      {user && (
        <button
          onClick={handleEdit}
          className="absolute top-2 right-2 p-2 bg-[#ffd900] text-[#585858] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#e6c200]"
          title="Bild ändern"
        >
          <ImageIcon size={18} />
        </button>
      )}
    </div>
  );
};
