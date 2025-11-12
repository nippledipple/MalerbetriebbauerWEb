import React, { useState, useEffect, useRef } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { localDb } from '../lib/localDb';
import { useAuth } from '../contexts/AuthContext';

interface EditableTextProps {
  page: string;
  section: string;
  defaultContent: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'a';
  multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({
  page,
  section,
  defaultContent,
  className = '',
  as: Component = 'p',
  multiline = false,
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState(defaultContent);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    loadContent();
  }, [page, section]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const loadContent = async () => {
    try {
      const saved = await localDb.getPageContent(page, section);
      if (saved) {
        setContent(saved.content);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleEdit = () => {
    setEditValue(content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await localDb.setPageContent(page, section, 'text', editValue);
      setContent(editValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Fehler beim Speichern');
    }
  };

  const handleCancel = () => {
    setEditValue('');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-[#ffd900] bg-white rounded px-2 py-1 w-full resize-y min-h-[100px]`}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} border-2 border-[#ffd900] bg-white rounded px-2 py-1 w-full`}
          />
        )}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            <Check size={16} />
            <span className="text-sm">Speichern</span>
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            <X size={16} />
            <span className="text-sm">Abbrechen</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Component className={className}>
        {content}
      </Component>
      {user && (
        <button
          onClick={handleEdit}
          className="absolute -right-2 -top-2 p-1.5 bg-[#ffd900] text-[#585858] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#e6c200]"
          title="Bearbeiten"
        >
          <Edit2 size={14} />
        </button>
      )}
    </div>
  );
};
