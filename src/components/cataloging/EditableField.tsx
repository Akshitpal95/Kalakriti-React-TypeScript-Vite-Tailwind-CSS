import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Edit3, Check } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { Language } from '../../types';

interface EditableFieldProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  type?: 'text' | 'number' | 'textarea';
  helperText?: string;
  isAIHighlighted?: boolean;
  language: Language;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  helperText,
  isAIHighlighted = false,
  language
}) => {
  const [isDictating, setIsDictating] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const isHindi = language === 'hi';

  const handleToggleDictation = () => {
    if (isDictating) {
      speechService.stopListening();
      setIsDictating(false);
    } else {
      speechService.stopSpeaking();
      setIsSpeaking(false);
      const started = speechService.startListening(
        isHindi ? 'hi-IN' : 'en-IN',
        (transcript, isFinal) => {
          if (type === 'number') {
            const num = parseInt(transcript.replace(/\D/g, ''), 10);
            if (!isNaN(num)) onChange(num);
          } else {
            onChange(transcript);
          }
          if (isFinal) {
            setIsDictating(false);
          }
        },
        () => setIsDictating(false),
        () => setIsDictating(false)
      );
      if (started) setIsDictating(true);
    }
  };

  const handleReadAloud = () => {
    if (isSpeaking) {
      speechService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speechService.speak(String(value), isHindi ? 'hi-IN' : 'en-IN', () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className={`p-3.5 rounded-2xl border transition-all ${
      isAIHighlighted 
        ? 'bg-[#FAF6EF] border-gold-400/80 shadow-xs' 
        : 'bg-white border-gold-300/40 hover:border-gold-400'
    }`}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-serif font-bold text-maroon-950 flex items-center gap-1.5">
          <Edit3 className="w-3.5 h-3.5 text-gold-600" />
          <span>{label}</span>
          {isAIHighlighted && (
            <span className="bg-gold-200 text-maroon-950 text-[10px] font-bold px-1.5 py-0.5 rounded">
              AI Filled
            </span>
          )}
        </label>

        {/* Action icons: Read aloud & Field-specific voice dictation */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleReadAloud}
            className={`p-1.5 rounded-lg transition-colors text-xs flex items-center gap-1 ${
              isSpeaking ? 'bg-maroon-800 text-gold-300' : 'text-maroon-700 hover:bg-cream-100 hover:text-maroon-900'
            }`}
            title={isHindi ? 'इस विवरण को सुनें' : 'Read this field aloud'}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleToggleDictation}
            className={`p-1.5 rounded-lg transition-colors text-xs flex items-center gap-1 ${
              isDictating ? 'bg-maroon-700 text-gold-300 animate-pulse' : 'text-gold-700 hover:bg-cream-100'
            }`}
            title={isHindi ? 'बोलकर बदलें' : 'Speak to replace this field'}
          >
            {isDictating ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {type === 'textarea' ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-sm font-medium text-maroon-950 bg-cream-50/60 hover:bg-white focus:bg-white rounded-xl p-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none transition-all resize-y font-sans"
          placeholder={isHindi ? 'विवरण दर्ज करें या बोलें...' : 'Enter or speak description...'}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          className="w-full text-sm font-semibold text-maroon-950 bg-cream-50/60 hover:bg-white focus:bg-white rounded-xl px-3 py-2 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none transition-all font-sans"
          placeholder={isHindi ? 'मान दर्ज करें...' : 'Enter value...'}
        />
      )}

      {helperText && (
        <p className="text-[11px] text-maroon-700/80 mt-1 italic font-sans">
          {helperText}
        </p>
      )}
    </div>
  );
};
