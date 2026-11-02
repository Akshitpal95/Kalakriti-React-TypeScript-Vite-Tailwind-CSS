import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Languages, 
  HelpCircle,
  Camera,
  RefreshCw,
  User,
  ShoppingBag
} from 'lucide-react';
import { Language } from '../../types';
import { speechService } from '../../services/speechService';
import { aiOrchestrator } from '../../services/aiOrchestrator';
import { AudioWaveform } from './AudioWaveform';

interface MargdarshakModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onApplyProfileBio: (bioEn: string, bioHi: string, extra?: any) => void;
  onNavigateToCatalog: (initialSpeechContext?: string) => void;
}

export const MargdarshakModal: React.FC<MargdarshakModalProps> = ({
  isOpen,
  onClose,
  language,
  onApplyProfileBio,
  onNavigateToCatalog
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interim, setInterim] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState<'chat' | 'profile' | 'product'>('chat');
  const [aiResponseText, setAiResponseText] = useState<string>('');
  const [selectedVoiceLang, setSelectedVoiceLang] = useState<'hi-IN' | 'en-IN'>(language === 'hi' ? 'hi-IN' : 'en-IN');
  const [structuredDraft, setStructuredDraft] = useState<any>(null);

  const isHindi = selectedVoiceLang === 'hi-IN';

  useEffect(() => {
    setSelectedVoiceLang(language === 'hi' ? 'hi-IN' : 'en-IN');
  }, [language]);

  useEffect(() => {
    if (!isOpen) {
      stopAll();
    }
  }, [isOpen]);

  const stopAll = () => {
    speechService.stopListening();
    speechService.stopSpeaking();
    setIsListening(false);
    setIsPlayingAudio(false);
  };

  const handleToggleListening = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      if (transcript.trim().length > 5) {
        processSpokenIntent(transcript);
      }
    } else {
      speechService.stopSpeaking();
      setIsPlayingAudio(false);
      setTranscript('');
      setInterim('');
      setStructuredDraft(null);

      const started = speechService.startListening(
        selectedVoiceLang,
        (text, isFinal) => {
          if (isFinal) {
            setTranscript(prev => (prev ? `${prev} ${text}` : text));
            setInterim('');
          } else {
            setInterim(text);
          }
        },
        (error) => {
          console.warn(error);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );

      if (started) {
        setIsListening(true);
      }
    }
  };

  const processSpokenIntent = async (textToProcess: string) => {
    setIsProcessing(true);

    const lower = textToProcess.toLowerCase();

    // Mode determination
    if (currentMode === 'profile' || lower.includes('mera naam') || lower.includes('my name is') || lower.includes('profile') || lower.includes('bunkar') || lower.includes('artisan')) {
      const result = await aiOrchestrator.generateArtisanBioFromVoice(textToProcess, 'Craftsperson');
      setStructuredDraft({
        type: 'profile',
        bioEn: result.bioEnglish,
        bioHi: result.bioHindi,
        district: result.extractedDistrict,
        state: result.extractedState,
        craft: result.extractedCraftName,
        years: result.extractedExperienceYears
      });

      const speechMessage = isHindi
        ? `नमस्ते! मैंने आपकी आवाज़ को समझ लिया है। आपकी कला ${result.extractedCraftName} और ${result.extractedExperienceYears} वर्षों के अनुभव के आधार पर आपकी सुंदर प्रोफ़ाइल तैयार कर दी गई है। क्या आप इसे प्रोफ़ाइल में सहेजना चाहते हैं?`
        : `Hello! I have captured your story. Based on your ${result.extractedExperienceYears} years of craft heritage in ${result.extractedCraftName}, I have created your artisan bio. Would you like to apply it to your profile?`;

      setAiResponseText(speechMessage);
      playVoiceBack(speechMessage);
    } else if (currentMode === 'product' || lower.includes('saree') || lower.includes('product') || lower.includes('saaman') || lower.includes('bechna') || lower.includes('bana')) {
      const speechMessage = isHindi
        ? `बहुत सुंदर! मैंने आपके उत्पाद का विवरण नोट कर लिया है। अब चलिए इसकी तस्वीर जोड़ते हैं ताकि मैं सटीक सामग्री और मूल्य निर्धारित कर सकूं।`
        : `Wonderful! I have captured your product details. Let's now attach a photo so I can estimate exact materials, craftsmanship hours, and fair market price.`;

      setAiResponseText(speechMessage);
      setStructuredDraft({
        type: 'product',
        spokenContext: textToProcess
      });
      playVoiceBack(speechMessage);
    } else {
      // General helpful guidance
      const guidance = isHindi
        ? `डेस्क AI आपकी सेवा में है! आप मुझे अपनी कहानी बता सकते हैं अपनी प्रोफ़ाइल बनाने के लिए, या अपने किसी हस्तशिल्प की तस्वीर और दाम तय करने में मेरी मदद ले सकते हैं।`
        : `I am Desk AI, your personal digital craft assistant. You can speak to create your profile, or describe your handicraft to calculate fair pricing and publish to the marketplace.`;

      setAiResponseText(guidance);
      playVoiceBack(guidance);
    }

    setIsProcessing(false);
  };

  const playVoiceBack = (text: string) => {
    setIsPlayingAudio(true);
    speechService.speak(text, selectedVoiceLang, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleApplyProfileDraft = () => {
    if (structuredDraft && structuredDraft.type === 'profile') {
      onApplyProfileBio(structuredDraft.bioEn, structuredDraft.bioHi, {
        district: structuredDraft.district,
        state: structuredDraft.state,
        craftName: structuredDraft.craft,
        experienceYears: structuredDraft.years
      });
      stopAll();
      onClose();
    }
  };

  const handleProceedToCatalog = () => {
    const context = transcript || (structuredDraft?.spokenContext || '');
    stopAll();
    onClose();
    onNavigateToCatalog(context);
  };

  const setPresetSpokenPrompt = (text: string, mode: 'profile' | 'product') => {
    setCurrentMode(mode);
    setTranscript(text);
    processSpokenIntent(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-maroon-950/80 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-2xl bg-[#FAF6EF] rounded-3xl shadow-2xl border border-gold-300/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-gold-400/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-400/15 backdrop-blur-md flex items-center justify-center text-2xl border border-gold-400/40 shadow-inner text-gold-300">
              ✨
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {isHindi ? 'मार्गदर्शक AI सहायक' : 'Margdarshak Voice Guide'}
                </h3>
                <span className="bg-gradient-to-r from-gold-400 to-gold-500 text-maroon-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Active
                </span>
              </div>
              <p className="text-xs text-gold-200/90 font-medium">
                {isHindi 
                  ? 'अपनी भाषा में बोलें — हम इसे बाज़ार-तैयार बनाएंगे' 
                  : 'Speak naturally in your mother tongue — I turn speech into sales'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedVoiceLang(isHindi ? 'en-IN' : 'hi-IN')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-maroon-900/60 hover:bg-maroon-800 rounded-xl text-xs font-bold text-gold-200 transition-colors border border-gold-400/30 shadow-sm"
              title="Switch Voice Language"
            >
              <Languages className="w-3.5 h-3.5 text-gold-400" />
              <span>{isHindi ? 'हिन्दी' : 'English'}</span>
            </button>

            <button
              onClick={() => {
                stopAll();
                onClose();
              }}
              className="p-2 text-gold-300/80 hover:text-gold-200 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Audio Visualization / Microphone Centerpiece */}
          <div className="flex flex-col items-center justify-center py-6 bg-cream-100/70 rounded-3xl border border-gold-300/40 shadow-inner">
            <div className="relative mb-4">
              {isListening && (
                <div className="absolute inset-0 rounded-full bg-gold-500/25 animate-ping" />
              )}
              <button
                onClick={handleToggleListening}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform active:scale-95 ${
                  isListening
                    ? 'bg-maroon-700 animate-mic-ring border-2 border-gold-400'
                    : 'bg-gradient-to-tr from-maroon-900 via-maroon-800 to-maroon-700 hover:scale-105 shadow-xl shadow-maroon-950/40 border border-gold-400/60'
                }`}
              >
                {isListening ? (
                  <Mic className="w-10 h-10 text-gold-300 animate-pulse" />
                ) : (
                  <Mic className="w-10 h-10 text-gold-300" />
                )}
              </button>
            </div>

            <p className="font-serif text-base sm:text-lg font-bold text-maroon-950 mb-1 text-center">
              {isListening
                ? (isHindi ? 'मैं सुन रहा हूँ... बोलिए' : 'Listening carefully... Please speak')
                : (isHindi ? 'बोलने के लिए माइक दबाएं' : 'Tap Microphone to Speak')}
            </p>

            <p className="text-xs text-maroon-800/80 max-w-sm text-center mb-3 font-sans">
              {isHindi
                ? 'अपना नाम, काम (जैसे हथकरघा, चित्रकारी), स्थान और अनुभव बताएं।'
                : 'Share your name, craft heritage, location, or product you wish to sell.'}
            </p>

            <AudioWaveform isActive={isListening || isPlayingAudio} />
          </div>

          {/* Live Transcript Box */}
          {(transcript || interim) && (
            <div className="p-4 bg-white/90 rounded-2xl border border-gold-300/60 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-maroon-900 font-bold font-serif">
                <span className="flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-gold-600" />
                  {isHindi ? 'आपकी आवाज़ (ट्रांसक्रिप्ट):' : 'Your Voice Transcript:'}
                </span>
                {isListening && (
                  <span className="text-maroon-700 flex items-center gap-1 font-sans">
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-maroon-950 italic leading-relaxed font-sans">
                "{transcript} <span className="text-maroon-400">{interim}</span>"
              </p>
            </div>
          )}

          {/* AI Response and Audio Readback */}
          {isProcessing ? (
            <div className="flex items-center justify-center gap-3 py-6 bg-cream-100/70 rounded-2xl border border-gold-300/40">
              <RefreshCw className="w-5 h-5 text-gold-600 animate-spin" />
              <span className="text-sm font-medium text-maroon-900 font-serif">
                {isHindi ? 'मार्गदर्शक AI आपकी बात को समझकर सजा रहा है...' : 'Desk AI is structuring your voice data...'}
              </span>
            </div>
          ) : aiResponseText ? (
            <div className="p-4 sm:p-5 bg-cream-100 rounded-2xl border border-gold-300/60 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-maroon-900 font-bold text-xs font-serif">
                  <Sparkles className="w-4 h-4 text-gold-600" />
                  <span>{isHindi ? 'मार्गदर्शक AI की सलाह' : 'Desk AI Analysis'}</span>
                </div>
                <button
                  onClick={() => {
                    if (isPlayingAudio) {
                      speechService.stopSpeaking();
                      setIsPlayingAudio(false);
                    } else {
                      playVoiceBack(aiResponseText);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-maroon-950 rounded-lg text-xs font-serif font-bold shadow-sm transition-all border border-gold-300"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'रोकें' : 'Stop'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'सुनिए (Audio)' : 'Listen Aloud'}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm text-maroon-950 font-medium leading-relaxed font-sans">
                {aiResponseText}
              </p>

              {/* Structured Draft Previews */}
              {structuredDraft?.type === 'profile' && (
                <div className="mt-4 p-4 bg-white/95 rounded-xl border border-gold-300/60 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-maroon-900 uppercase tracking-wider font-serif">
                    <User className="w-3.5 h-3.5 text-gold-600" />
                    <span>{isHindi ? 'तैयार शिल्पकार प्रोफ़ाइल बायो' : 'Generated Artisan Bio'}</span>
                  </div>
                  <p className="text-xs text-maroon-950 italic bg-cream-50 p-2.5 rounded-lg border border-gold-200/80 font-serif">
                    "{isHindi ? structuredDraft.bioHi : structuredDraft.bioEn}"
                  </p>
                  <div className="flex items-center justify-between text-xs text-maroon-800 font-medium">
                    <span>{structuredDraft.craft}</span>
                    <span>{structuredDraft.district}, {structuredDraft.state}</span>
                  </div>
                  <button
                    onClick={handleApplyProfileDraft}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 font-serif font-bold rounded-xl text-xs transition-all shadow-md active:scale-98 border border-gold-300"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isHindi ? 'यह विवरण प्रोफ़ाइल में जोड़ें' : 'Apply Draft to Profile'}</span>
                  </button>
                </div>
              )}

              {structuredDraft?.type === 'product' && (
                <div className="mt-4 p-4 bg-white/95 rounded-xl border border-gold-300/60 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-maroon-900 uppercase tracking-wider font-serif">
                    <ShoppingBag className="w-3.5 h-3.5 text-gold-600" />
                    <span>{isHindi ? 'उत्पाद कैटलॉग चरण' : 'Next Step: Product Photo'}</span>
                  </div>
                  <p className="text-xs text-maroon-800">
                    {isHindi
                      ? 'आपके विवरण के साथ अब उत्पाद फ़ोटो जोड़कर संपूर्ण मूल्य व विवरण प्राप्त करें।'
                      : 'Proceed to cataloging with your spoken notes attached.'}
                  </p>
                  <button
                    onClick={handleProceedToCatalog}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 font-serif font-bold rounded-xl text-xs transition-all shadow-md active:scale-98 border border-gold-300"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>{isHindi ? 'फ़ोटो जोड़ें और कैटलॉग पूरा करें' : 'Proceed to Add Photo & Catalog'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : null}

          {/* Quick Voice Prompt Simulators / One-Tap Examples */}
          <div className="space-y-2 pt-2 border-t border-gold-300/40">
            <div className="flex items-center gap-1.5 text-xs font-bold text-maroon-950 font-serif">
              <HelpCircle className="w-3.5 h-3.5 text-gold-600" />
              <span>{isHindi ? 'या नीचे दिए गए उदाहरण पर टैप करें:' : 'Or tap a sample phrase to test:'}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setPresetSpokenPrompt(
                  isHindi
                    ? 'मेरा नाम रामकिशन विश्वकर्मा है, मैं वाराणसी से हूँ। मैं पिछले 30 सालों से कढ़वा रेशम और ज़री की साड़ियों की बुनाई कर रहा हूँ।'
                    : 'My name is Ramkishan from Varanasi. I have been hand-weaving pure silk Banarasi sarees with real Zari on pit looms for over 30 years.',
                  'profile'
                )}
                className="text-left p-3 rounded-xl bg-white hover:bg-cream-50 border border-gold-300/50 hover:border-gold-500 text-xs font-medium text-maroon-950 transition-all group shadow-sm"
              >
                <span className="block font-serif font-bold text-maroon-900 mb-0.5 group-hover:text-gold-700">
                  🎙️ {isHindi ? 'उदाहरण 1: प्रोफ़ाइल बनाएं' : 'Sample 1: Create Profile'}
                </span>
                <span className="line-clamp-2 text-maroon-800/80 text-[11px] font-sans">
                  {isHindi
                    ? '"मेरा नाम रामकिशन है, मैं वाराणसी से 30 साल से रेशम बुनकर हूँ..."'
                    : '"My name is Ramkishan from Varanasi, weaving pure silk for 30 years..."'}
                </span>
              </button>

              <button
                onClick={() => setPresetSpokenPrompt(
                  isHindi
                    ? 'यह हाथ से बुनी शुद्ध रेशम की साड़ी है। इसमें 25 दिन लगे हैं और असली सुनहरी ज़री का काम है।'
                    : 'This is a handwoven pure silk saree with gold zari borders. It took 25 days on a traditional handloom.',
                  'product'
                )}
                className="text-left p-3 rounded-xl bg-white hover:bg-cream-50 border border-gold-300/50 hover:border-gold-500 text-xs font-medium text-maroon-950 transition-all group shadow-sm"
              >
                <span className="block font-serif font-bold text-maroon-900 mb-0.5 group-hover:text-gold-700">
                  🏺 {isHindi ? 'उदाहरण 2: उत्पाद बेचें' : 'Sample 2: Catalog Product'}
                </span>
                <span className="line-clamp-2 text-maroon-800/80 text-[11px] font-sans">
                  {isHindi
                    ? '"यह शुद्ध रेशम की साड़ी है, 25 दिन में बुनी गई, सुनहरी ज़री..."'
                    : '"This is a handwoven pure silk saree with gold zari, 25 days..."'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
