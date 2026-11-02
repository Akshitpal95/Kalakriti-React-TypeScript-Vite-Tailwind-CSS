import React, { useState } from 'react';
import { 
  User, 
  Mic, 
  Camera, 
  MapPin, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Volume2, 
  Layers, 
  Phone, 
  RefreshCw,
  Plus,
  Upload
} from 'lucide-react';
import { Artisan, Language, CraftCategory } from '../../types';
import { speechService } from '../../services/speechService';
import { aiOrchestrator } from '../../services/aiOrchestrator';
import { CRAFT_CATEGORIES_META } from '../../data/craftCategories';

interface ArtisanOnboardingProps {
  language: Language;
  artisan: Artisan;
  onSaveArtisan: (updatedArtisan: Artisan) => void;
  onOpenMargdarshak: () => void;
}

export const ArtisanOnboarding: React.FC<ArtisanOnboardingProps> = ({
  language,
  artisan,
  onSaveArtisan,
  onOpenMargdarshak
}) => {
  const isHindi = language === 'hi';

  const [profile, setProfile] = useState<Artisan>(artisan);
  const [isRecordingBio, setIsRecordingBio] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [isSynthesizingBio, setIsSynthesizingBio] = useState<boolean>(false);
  const [saveToast, setSaveToast] = useState<boolean>(false);
  const [speechNotice, setSpeechNotice] = useState<string>('');

  // Toggle voice dictation for bio
  const handleToggleVoiceBio = () => {
    setSpeechNotice('');
    if (isRecordingBio) {
      speechService.stopListening();
      setIsRecordingBio(false);
      if (spokenTranscript.trim().length > 3) {
        synthesizeBioFromTranscript(spokenTranscript);
      }
    } else {
      speechService.stopSpeaking();
      const started = speechService.startListening(
        isHindi ? 'hi-IN' : 'en-IN',
        (text) => {
          setSpokenTranscript(text);
        },
        (err) => {
          setSpeechNotice(err);
          setIsRecordingBio(false);
        },
        () => {
          setIsRecordingBio(false);
        }
      );
      if (started) setIsRecordingBio(true);
    }
  };

  const handleApplySampleBio = (sampleText: string) => {
    setSpokenTranscript(sampleText);
    setSpeechNotice('');
    speechService.speak(sampleText, isHindi ? 'hi-IN' : 'en-IN');
    synthesizeBioFromTranscript(sampleText);
  };

  const synthesizeBioFromTranscript = async (text: string) => {
    setIsSynthesizingBio(true);
    try {
      const res = await aiOrchestrator.generateArtisanBioFromVoice(text, profile.name);
      setProfile(prev => ({
        ...prev,
        bio: res.bioEnglish,
        bioHindi: res.bioHindi,
        craftName: res.extractedCraftName || prev.craftName,
        district: res.extractedDistrict || prev.district,
        state: res.extractedState || prev.state,
        experienceYears: res.extractedExperienceYears || prev.experienceYears,
        odopTag: res.suggestedOdop || prev.odopTag
      }));

      // Speak confirmation
      const msg = isHindi 
        ? `आपकी प्रोफ़ाइल तैयार हो गई है! ${res.bioHindi}`
        : `Your bio has been generated! ${res.bioEnglish}`;
      speechService.speak(msg, isHindi ? 'hi-IN' : 'en-IN');
    } catch (e) {
      console.warn(e);
    } finally {
      setIsSynthesizingBio(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveArtisan(profile);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const raw = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, 400, 400);
              setProfile(prev => ({ ...prev, avatarUrl: canvas.toDataURL('image/jpeg', 0.85) }));
              return;
            }
          } catch {}
          setProfile(prev => ({ ...prev, avatarUrl: raw }));
        };
        img.src = raw;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWorkshopUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const raw = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDim = 800;
            let w = img.width;
            let h = img.height;
            if (w > maxDim || h > maxDim) {
              if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
              else { w = Math.round((w * maxDim) / h); h = maxDim; }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, w, h);
              setProfile(prev => ({ ...prev, workshopImages: [canvas.toDataURL('image/jpeg', 0.85), ...prev.workshopImages] }));
              return;
            }
          } catch {}
          setProfile(prev => ({ ...prev, workshopImages: [raw, ...prev.workshopImages] }));
        };
        img.src = raw;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Profile Hero - Heritage Maroon & Gold */}
      <div className="relative bg-gradient-to-br from-maroon-950 via-maroon-900 to-[#460814] text-cream-100 border border-gold-400/40 rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden">
        {/* Subtle patterned backdrop */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF6A_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar with photo update */}
          <div className="relative group">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-gold-400/80 shadow-md"
            />
            <label className="absolute inset-0 bg-maroon-950/60 rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity text-gold-200 text-xs font-serif font-semibold">
              <Camera className="w-5 h-5 mb-1 text-gold-400" />
              <span>{isHindi ? 'फ़ोटो बदलें' : 'Change'}</span>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
            {profile.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-gold-500 text-maroon-950 p-1.5 rounded-full ring-4 ring-maroon-900 shadow-md" title="Verified Master Artisan">
                <ShieldCheck className="w-5 h-5 text-maroon-950" />
              </div>
            )}
          </div>

          {/* Profile Basic Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-maroon-950/80 text-gold-300 text-xs font-serif font-bold px-2.5 py-0.5 rounded-full border border-gold-400/40 shadow-xs">
                GI Artisan
              </span>
              <span className="bg-gold-500/20 text-gold-200 text-xs font-serif font-semibold px-2.5 py-0.5 rounded-full border border-gold-400/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                {profile.odopTag || 'ODOP Verified'}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {isHindi && profile.nativeName ? profile.nativeName : profile.name}
            </h1>

            <p className="text-gold-200/90 text-sm font-sans flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-4 h-4 text-gold-400" />
              {profile.village ? `${profile.village}, ` : ''}{profile.district}, {profile.state}
              <span className="mx-2 text-gold-400">•</span>
              <Award className="w-4 h-4 text-gold-400" />
              {profile.experienceYears} {isHindi ? 'वर्षों का अनुभव' : 'Years Heritage Experience'}
            </p>

            <p className="text-xs text-cream-200 italic max-w-xl line-clamp-2 font-serif">
              "{isHindi && profile.bioHindi ? profile.bioHindi : profile.bio}"
            </p>
          </div>

          {/* Voice Profile Creation Quick Button */}
          <button
            onClick={onOpenMargdarshak}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 font-serif font-bold text-xs rounded-2xl shadow-lg transition-all active:scale-95 whitespace-nowrap border border-gold-300"
          >
            <Mic className="w-4 h-4 text-maroon-950 animate-pulse" />
            <span>{isHindi ? 'बोलकर प्रोफ़ाइल बदलें' : 'Speak to Update Bio'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 border border-gold-300/60 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gold-200">
          <div>
            <h2 className="font-serif text-xl font-bold text-maroon-950">
              {isHindi ? 'शिल्पकार प्रोफ़ाइल विवरण' : 'Artisan Profile Details'}
            </h2>
            <p className="text-xs text-maroon-700/80 font-sans">
              {isHindi ? 'अपना विवरण भरें या माइक दबाकर सीधे बोलें।' : 'Fill in your details or speak via microphone.'}
            </p>
          </div>

          {saveToast && (
            <div className="flex items-center gap-2 bg-cream-100 text-maroon-950 text-xs font-serif font-bold px-3 py-1.5 rounded-xl border border-gold-400/60 animate-bounce shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-600" />
              <span>{isHindi ? 'सफलतापूर्वक सुरक्षित किया गया!' : 'Profile Saved Successfully!'}</span>
            </div>
          )}
        </div>

        {/* Voice-to-Bio Spotlight Box */}
        <div className="bg-cream-100/70 p-5 rounded-3xl border border-gold-300/50 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-serif font-bold text-maroon-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>{isHindi ? 'आवाज़ से प्रोफ़ाइल बायो बनाएं (Voice Bio Generator)' : 'Voice-to-Text Profile Bio Generator'}</span>
            </label>
            <button
              type="button"
              onClick={handleToggleVoiceBio}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-serif font-bold shadow-sm transition-all border ${
                isRecordingBio
                  ? 'bg-maroon-700 text-gold-300 animate-mic-ring border-gold-400'
                  : 'bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-maroon-950 border-gold-300'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-maroon-950" />
              <span>{isRecordingBio ? (isHindi ? 'सुन रहा हूँ...' : 'Recording...') : (isHindi ? 'बोलकर बायो बनाएं' : 'Speak Your Story')}</span>
            </button>
          </div>

          {speechNotice && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
              <span>⚠️ {speechNotice}</span>
              <button type="button" onClick={() => setSpeechNotice('')} className="text-amber-700 font-bold ml-2">✕</button>
            </div>
          )}

          {/* Quick Voice Bio Simulator Chips */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-serif font-bold text-maroon-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-600" />
                <span>{isHindi ? 'या 1-क्लिक वॉइस सैंपल आज़माएं:' : 'Or tap a 1-click voice sample:'}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'रामकिशन (वाराणसी रेशम)', text: 'मेरा नाम रामकिशन विश्वकर्मा है। मैं वाराणसी उत्तर प्रदेश से हूँ और 30 साल से हथकरघा बनारसी साड़ी बनाता हूँ।' },
                { label: 'शांति देवी (मधुबनी पेंटिंग)', text: 'मेरा नाम शांति देवी है। मैं मधुबनी बिहार से हूँ और 25 साल से प्राकृतिक रंगों से पारंपरिक मधुबनी चित्रकारी कर रही हूँ।' },
                { label: 'मंगलू राम (बस्तर ढोकरा)', text: 'मेरा नाम मंगलू राम कश्यप है। मैं बस्तर छत्तीसगढ़ से हूँ और पिछले 20 वर्षों से ढोकरा कांस्य शिल्पकला बनाता हूँ।' }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySampleBio(chip.text)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 hover:border-gold-500 border border-gold-300/50 text-maroon-950 transition-all active:scale-95 flex items-center gap-1 shadow-xs font-sans"
                  title={chip.text}
                >
                  <span>🎙️</span>
                  <span>{chip.label}</span>
                </button>
              ))}
            </div>
          </div>

          {spokenTranscript && (
            <p className="text-xs text-maroon-950 bg-white p-2.5 rounded-xl border border-gold-300/50 italic font-serif">
              "{spokenTranscript}"
            </p>
          )}

          {isSynthesizingBio && (
            <div className="flex items-center gap-2 text-xs text-maroon-800 font-serif font-semibold">
              <RefreshCw className="w-4 h-4 animate-spin text-gold-600" />
              <span>{isHindi ? 'Desk AI आपकी बात को सुंदर बायो में बदल रहा है...' : 'Desk AI is crafting polished artisan bio...'}</span>
            </div>
          )}
        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'नाम (Artisan Name - English)' : 'Full Name (English)'}
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full text-sm font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'नाम (हिंदी में)' : 'Native Name (Hindi / Regional)'}
            </label>
            <input
              type="text"
              value={profile.nativeName || ''}
              onChange={(e) => setProfile({ ...profile, nativeName: e.target.value })}
              className="w-full text-sm font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans"
              placeholder="e.g. रामकिशन विश्वकर्मा"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'शिल्प श्रेणी (Craft Category)' : 'Craft Category'}
            </label>
            <select
              value={profile.craftCategory}
              onChange={(e) => setProfile({ ...profile, craftCategory: e.target.value as CraftCategory })}
              className="w-full text-sm font-serif font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none cursor-pointer"
            >
              {Object.keys(CRAFT_CATEGORIES_META).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'विशेष शिल्प नाम (Specialized Craft)' : 'Specific Craft Technique'}
            </label>
            <input
              type="text"
              value={profile.craftName}
              onChange={(e) => setProfile({ ...profile, craftName: e.target.value })}
              className="w-full text-sm font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans"
              placeholder="e.g. Banarasi Kadhwa Weaving"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'ज़िला (District)' : 'District'}
            </label>
            <input
              type="text"
              value={profile.district}
              onChange={(e) => setProfile({ ...profile, district: e.target.value })}
              className="w-full text-sm font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'राज्य (State)' : 'State'}
            </label>
            <input
              type="text"
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
              className="w-full text-sm font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'अनुभव (वर्षों में)' : 'Experience (Years)'}
            </label>
            <input
              type="number"
              value={profile.experienceYears}
              onChange={(e) => setProfile({ ...profile, experienceYears: Number(e.target.value) })}
              className="w-full text-sm font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? 'फ़ोन नंबर / WhatsApp' : 'Phone / WhatsApp'}
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full text-sm font-semibold text-maroon-950 bg-white rounded-xl px-3.5 py-2.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-serif font-bold text-maroon-950">
                {isHindi ? 'शिल्पकार परिचय / बायो (English)' : 'Artisan Biography (English)'}
              </label>
              <button
                type="button"
                onClick={() => speechService.speak(profile.bio, 'en-IN')}
                className="text-[11px] text-maroon-800 hover:text-gold-700 hover:underline flex items-center gap-1 font-serif font-bold"
              >
                <Volume2 className="w-3.5 h-3.5 text-gold-600" />
                Listen (Audio)
              </button>
            </div>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full text-sm font-medium text-maroon-950 bg-white rounded-xl p-3.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-serif font-bold text-maroon-950">
                {isHindi ? 'शिल्पकार परिचय / बायो (हिंदी में)' : 'Artisan Biography (Hindi)'}
              </label>
              <button
                type="button"
                onClick={() => speechService.speak(profile.bioHindi || profile.bio, 'hi-IN')}
                className="text-[11px] text-maroon-800 hover:text-gold-700 hover:underline flex items-center gap-1 font-serif font-bold"
              >
                <Volume2 className="w-3.5 h-3.5 text-gold-600" />
                सुनिए (ऑडियो)
              </button>
            </div>
            <textarea
              rows={3}
              value={profile.bioHindi || ''}
              onChange={(e) => setProfile({ ...profile, bioHindi: e.target.value })}
              className="w-full text-sm font-medium text-maroon-950 bg-white rounded-xl p-3.5 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none font-sans leading-relaxed"
            />
          </div>
        </div>

        {/* Workshop & Skill Demo Photos */}
        <div className="space-y-3 pt-4 border-t border-gold-200">
          <div className="flex items-center justify-between">
            <label className="text-xs font-serif font-bold text-maroon-950 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-gold-600" />
              <span>{isHindi ? 'कार्यशाला एवं कौशल प्रदर्शन की तस्वीरें' : 'Workshop & Craft Demo Photos'}</span>
            </label>
            <label className="cursor-pointer text-xs font-serif font-bold text-maroon-800 hover:text-gold-700 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5 text-gold-600" />
              <span>{isHindi ? 'फ़ोटो जोड़ें' : 'Add Photo'}</span>
              <input type="file" accept="image/*" onChange={handleWorkshopUpload} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {profile.workshopImages.map((img, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gold-300/50 shadow-xs group">
                <img src={img} alt="Workshop" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 py-3.5 px-8 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 font-serif font-bold rounded-2xl text-sm shadow-md active:scale-95 transition-all cursor-pointer border border-gold-300"
          >
            <CheckCircle2 className="w-5 h-5 text-maroon-950" />
            <span>{isHindi ? 'प्रोफ़ाइल सुरक्षित करें' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
