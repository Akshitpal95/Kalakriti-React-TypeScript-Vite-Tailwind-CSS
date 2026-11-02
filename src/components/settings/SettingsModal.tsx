import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Key, 
  Radio, 
  Languages, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  Cpu,
  User
} from 'lucide-react';
import { AIServiceConfig, Language, STTProvider, Artisan } from '../../types';
import { storageService } from '../../services/storageService';
import { bhashiniService } from '../../services/bhashiniService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  activeArtisan?: Artisan;
  onNavigateToProfile?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  activeArtisan,
  onNavigateToProfile
}) => {
  if (!isOpen) return null;

  const isHindi = language === 'hi';
  const initialConfig = storageService.getAIConfig();

  const [provider, setProvider] = useState<STTProvider>(initialConfig.sttProvider || 'bhashini');
  const [bhashiniKey, setBhashiniKey] = useState<string>(initialConfig.bhashiniApiKey || '');
  const [bhashiniUserId, setBhashiniUserId] = useState<string>(initialConfig.bhashiniUserId || '');
  const [openaiKey, setOpenaiKey] = useState<string>(initialConfig.openaiApiKey || '');
  const [geminiKey, setGeminiKey] = useState<string>(initialConfig.geminiApiKey || '');
  const [googleKey, setGoogleKey] = useState<string>(initialConfig.googleApiKey || '');
  const [azureKey, setAzureKey] = useState<string>(initialConfig.azureSpeechKey || '');
  const [azureRegion, setAzureRegion] = useState<string>(initialConfig.azureRegion || 'centralindia');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AIServiceConfig = {
      sttProvider: provider,
      bhashiniApiKey: bhashiniKey.trim(),
      bhashiniUserId: bhashiniUserId.trim(),
      openaiApiKey: openaiKey.trim(),
      geminiApiKey: geminiKey.trim(),
      googleApiKey: googleKey.trim(),
      azureSpeechKey: azureKey.trim(),
      azureRegion: azureRegion.trim(),
      preferredLanguage: isHindi ? 'hi-IN' : 'en-IN'
    };

    storageService.saveAIConfig(updated);
    bhashiniService.setConfig(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
      <div className="bg-[#FAF6EF] text-[#1E1617] rounded-3xl max-w-xl w-full p-6 sm:p-7 border-2 border-gold-500/50 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-[#7d6869] hover:text-maroon-950 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-gold-700 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-maroon-800" />
              <span>AI Pipeline Configuration</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-maroon-950">
              {isHindi ? 'AI मॉडल और वॉइस सेटिंग्स' : 'Desk AI Orchestration'}
            </h3>
            <p className="text-xs text-[#5e4a4b]">
              Configure speech-to-text engines (Bhashini, Whisper) and vision API keys. Native browser speech & simulated craft intelligence work out-of-the-box with zero keys required.
            </p>
          </div>

          {/* STT Engine Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-maroon-950 block">
              Primary Speech-to-Text Engine
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  provider === 'bhashini'
                    ? 'border-gold-500 bg-gold-100/60 ring-1 ring-gold-400'
                    : 'border-gold-500/30 bg-white hover:bg-gold-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-maroon-950">Bhashini (Govt. India)</span>
                  <input
                    type="radio"
                    name="stt"
                    checked={provider === 'bhashini'}
                    onChange={() => setProvider('bhashini')}
                    className="accent-maroon-800"
                  />
                </div>
                <span className="text-[10px] text-[#5e4a4b]">
                  Recommended. Built for Hindi, Tamil, Bengali & Indian regional languages.
                </span>
              </label>

              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  provider === 'whisper'
                    ? 'border-gold-500 bg-gold-100/60 ring-1 ring-gold-400'
                    : 'border-gold-500/30 bg-white hover:bg-gold-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-maroon-950">OpenAI Whisper</span>
                  <input
                    type="radio"
                    name="stt"
                    checked={provider === 'whisper'}
                    onChange={() => setProvider('whisper')}
                    className="accent-maroon-800"
                  />
                </div>
                <span className="text-[10px] text-[#5e4a4b]">
                  Multilingual fallback with strong code-switching handling.
                </span>
              </label>

              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  provider === 'google'
                    ? 'border-terracotta-600 bg-terracotta-50/70 ring-1 ring-terracotta-500'
                    : 'border-wood-200 bg-white hover:bg-sand-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-wood-950">Google Cloud Speech-to-Text</span>
                  <input
                    type="radio"
                    name="stt"
                    checked={provider === 'google'}
                    onChange={() => setProvider('google')}
                    className="accent-terracotta-600"
                  />
                </div>
                <span className="text-[10px] text-wood-600">
                  125+ languages, streaming live text, high accuracy for hi-IN & en-IN.
                </span>
              </label>

              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  provider === 'azure'
                    ? 'border-terracotta-600 bg-terracotta-50/70 ring-1 ring-terracotta-500'
                    : 'border-wood-200 bg-white hover:bg-sand-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-wood-950">Option D: Microsoft Azure AI Speech</span>
                  <input
                    type="radio"
                    name="stt"
                    checked={provider === 'azure'}
                    onChange={() => setProvider('azure')}
                    className="accent-terracotta-600"
                  />
                </div>
                <span className="text-[10px] text-wood-600">
                  Real-time speech translation (Speak Hindi → English text for buyers) & Indian Neural TTS.
                </span>
              </label>

              <label
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between sm:col-span-2 ${
                  provider === 'webspeech'
                    ? 'border-terracotta-600 bg-terracotta-50/70 ring-1 ring-terracotta-500'
                    : 'border-wood-200 bg-white hover:bg-sand-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-wood-950">Browser Web Speech API (Zero-Config Default)</span>
                  <input
                    type="radio"
                    name="stt"
                    checked={provider === 'webspeech'}
                    onChange={() => setProvider('webspeech')}
                    className="accent-terracotta-600"
                  />
                </div>
                <span className="text-[10px] text-wood-600">
                  Built-in browser recognition (hi-IN / en-IN). Works seamlessly on desktop & mobile without any server setup.
                </span>
              </label>
            </div>
          </div>

          {/* Optional API Credentials */}
          <div className="space-y-3 pt-2 border-t border-wood-200">
            <div className="space-y-1">
              <label className="text-xs font-bold text-wood-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Bhashini ULCA API Key (Optional)</span>
              </label>
              <input
                type="password"
                value={bhashiniKey}
                onChange={(e) => setBhashiniKey(e.target.value)}
                placeholder="Enter Bhashini Inference API key..."
                className="w-full text-xs p-2.5 rounded-xl border border-wood-300 bg-white outline-none focus:border-terracotta-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-wood-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-terracotta-600" />
                <span>Bhashini User ID (Optional)</span>
              </label>
              <input
                type="text"
                value={bhashiniUserId}
                onChange={(e) => setBhashiniUserId(e.target.value)}
                placeholder="Enter Bhashini User ID..."
                className="w-full text-xs p-2.5 rounded-xl border border-wood-300 bg-white outline-none focus:border-terracotta-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-wood-800 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-gold-600" />
                <span>Google Gemini API Key (Gemini 2.0 / 1.5 Flash Vision & Bio)</span>
              </label>
              <input
                type="password"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy... (Google AI Studio key)"
                className="w-full text-xs p-2.5 rounded-xl border border-gold-300/60 bg-white/90 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-400 text-maroon-950 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-maroon-900 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-gold-600" />
                <span>OpenAI API Key (Optional for live GPT-4o Vision & Whisper)</span>
              </label>
              <input
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full text-xs p-2.5 rounded-xl border border-gold-300/60 bg-white/90 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-400 text-maroon-950 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-maroon-900 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-gold-600" />
                <span>Google Cloud API Key (Optional for Speech-to-Text & Translate)</span>
              </label>
              <input
                type="password"
                value={googleKey}
                onChange={(e) => setGoogleKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full text-xs p-2.5 rounded-xl border border-gold-300/60 bg-white/90 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-400 text-maroon-950 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-maroon-900 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-gold-600" />
                <span>Azure AI Speech Key (Optional for Real-time Speech Translation)</span>
              </label>
              <input
                type="password"
                value={azureKey}
                onChange={(e) => setAzureKey(e.target.value)}
                placeholder="Azure Speech Subscription Key..."
                className="w-full text-xs p-2.5 rounded-xl border border-gold-300/60 bg-white/90 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-400 text-maroon-950 font-sans"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-maroon-900 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-gold-600" />
                <span>Azure Region</span>
              </label>
              <input
                type="text"
                value={azureRegion}
                onChange={(e) => setAzureRegion(e.target.value)}
                placeholder="e.g. centralindia, eastus"
                className="w-full text-xs p-2.5 rounded-xl border border-gold-300/60 bg-white/90 outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-400 text-maroon-950 font-sans"
              />
            </div>
          </div>

          <div className="bg-cream-100 p-3 rounded-2xl border border-gold-300/50 text-[11px] text-maroon-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Note:</strong> All features (voice speech recognition, text-to-speech audio feedback, and craft vision analysis) function completely right now using native browser APIs and built-in heuristics. Keys are purely optional.
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-maroon-950 font-serif font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 border border-gold-300"
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4 text-maroon-950" /> : null}
            <span>{isSaved ? 'Settings Saved!' : 'Save AI Configurations'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
