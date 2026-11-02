import React, { useState } from 'react';
import { Mic, Sparkles, Play, CheckCircle2, ArrowRight, Tag, Clock, Globe } from 'lucide-react';
import { speechService } from '../../services/speechService';

const SAMPLE_PROMPTS = [
  {
    label: 'Banarasi Silk Saree (Hindi Voice)',
    prompt: 'यह हमारे गड्ढा करघे (pit loom) पर 28 दिनों में बुनी गई विशुद्ध बनारसी रेशम साड़ी है। इसमें असली कढ़वा ज़री का काम है और शहतूत रेशम के धागे इस्तेमाल किए गए हैं।',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    title: 'Heritage Banarasi Kadhwa Zari Pure Mulberry Silk Saree',
    titleHindi: 'पारंपरिक बनारसी कढ़वा ज़री शुद्ध शहतूत सिल्क साड़ी',
    category: 'Handloom & Textiles',
    hours: 196,
    material: '100% Pure Mulberry Silk & Electroplated Gold Zari',
    fairPrice: 16500,
    etsyUsd: 280,
    hourlyWage: 52
  },
  {
    label: 'Madhubani Painting (Voice/Text)',
    prompt: 'यह हस्तनिर्मित सूती कागज़ पर प्राकृतिक हल्दी, नील और काजल के रंगों से तैयार किया गया पारंपरिक मधुबनी ट्री ऑफ लाइफ चित्र है। 12 दिन की बारीक कारीगरी है।',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    title: 'GI-Certified Madhubani Tree of Life Organic Canvas',
    titleHindi: 'जीआई-प्रमाणित मधुबनी कछनी-भरनी प्राकृतिक रंग चित्रकला',
    category: 'Traditional Painting',
    hours: 84,
    material: 'Handmade Cotton Rag Paper & Certified Plant Pigments',
    fairPrice: 7800,
    etsyUsd: 135,
    hourlyWage: 55
  },
  {
    label: 'Bastar Dhokra Metal (Voice/Text)',
    prompt: 'यह बस्तर का पारंपरिक बेल मेटल ढोकरा शिल्प है। 4,000 साल पुरानी मधुमक्खी मोम (lost-wax) विधि से बना आदिवासी संगीतकार प्रतिमा है। वजन 1.8 किलो है।',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80',
    title: '4,000-Year Ancient Lost-Wax Cast Bastar Dhokra Musician',
    titleHindi: 'पारंपरिक बस्तर ढोकरा कांस्य आदिवासी संगीतकार कलाकृति',
    category: 'Metalcraft & Dhokra',
    hours: 48,
    material: 'Bell Metal Brass & Natural Beeswax Mould',
    fairPrice: 4200,
    etsyUsd: 95,
    hourlyWage: 50
  }
];

export const VoicePromptSimulator: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [inputText, setInputText] = useState(SAMPLE_PROMPTS[0].prompt);
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState<typeof SAMPLE_PROMPTS[0] | null>(SAMPLE_PROMPTS[0]);

  const handleSelectPreset = (idx: number) => {
    setSelectedPreset(idx);
    setInputText(SAMPLE_PROMPTS[idx].prompt);
    setOutput(null);
  };

  const handleRunPipeline = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setOutput(SAMPLE_PROMPTS[selectedPreset]);
      setIsProcessing(false);
      // Play vocal confirmation
      speechService.speak(
        `कैटलॉग तैयार है! सुझाई गई उचित कीमत ₹${SAMPLE_PROMPTS[selectedPreset].fairPrice} है।`,
        'hi-IN'
      );
    }, 900);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Live Interactive Playground
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Zero English Barrier
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-purple-950 mt-1">
            Turn Any Spoken or Typed Regional Prompt into a Global Listing
          </h3>
        </div>
        <span className="text-xs text-purple-600 font-medium">Try clicking different craft samples below 👇</span>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        {SAMPLE_PROMPTS.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectPreset(idx)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${
              selectedPreset === idx
                ? 'bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-500/20'
                : 'bg-purple-50/80 text-purple-900 border-purple-200 hover:bg-purple-100'
            }`}
          >
            <Mic className={`w-3.5 h-3.5 ${selectedPreset === idx ? 'text-white' : 'text-purple-600'}`} />
            <span>{sample.label}</span>
          </button>
        ))}
      </div>

      {/* Input Area (Prompt Box) */}
      <div className="relative bg-purple-50/50 rounded-2xl p-4 border border-purple-200 space-y-3">
        <label className="text-xs font-bold text-purple-900 flex items-center justify-between">
          <span>Artisan's Spoken Raw Transcript (Native Dialect)</span>
          <span className="text-[11px] text-purple-600 font-normal">Hindi, Maithili, Bhojpuri, Tamil, Bengali</span>
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={3}
          className="w-full text-xs sm:text-sm bg-white p-3 rounded-xl border border-purple-200 text-purple-950 outline-none focus:ring-2 focus:ring-purple-400 font-medium resize-none shadow-xs"
          placeholder="Speak or type your craft description in any language..."
        />
        <div className="flex justify-between items-center pt-1">
          <div className="flex items-center gap-2 text-[11px] text-purple-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Audio & Text NLP Parser: Ready</span>
          </div>

          <button
            onClick={handleRunPipeline}
            disabled={isProcessing}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Computer Vision & Pricing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Generate Instant Global Listing</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Output Card */}
      {output && (
        <div className="bg-gradient-to-br from-purple-50/90 via-white to-amber-50/40 rounded-3xl p-5 sm:p-6 border border-purple-200 shadow-md animate-slide-in space-y-4">
          <div className="flex items-center justify-between border-b border-purple-100 pb-3">
            <span className="text-xs font-black text-purple-900 flex items-center gap-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Generated Global Multi-Channel Listing
            </span>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <Globe className="w-3 h-3" />
              <span>ONDC & Etsy Ready</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Thumbnail */}
            <div className="sm:col-span-4 aspect-4/3 rounded-2xl overflow-hidden shadow-md border border-purple-200 relative group">
              <img src={output.image} alt={output.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute bottom-2 left-2 bg-purple-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {output.category}
              </span>
            </div>

            {/* Generated Details */}
            <div className="sm:col-span-8 space-y-3">
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-purple-950 leading-snug">
                  {output.title}
                </h4>
                <p className="text-xs text-purple-700 font-medium mt-0.5">
                  {output.titleHindi}
                </p>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-xl flex items-center gap-1 font-semibold">
                  <Tag className="w-3 h-3 text-purple-600" />
                  {output.material}
                </span>
                <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-xl flex items-center gap-1 font-semibold">
                  <Clock className="w-3 h-3 text-amber-700" />
                  {output.hours} Craft Hours
                </span>
              </div>

              {/* Price Breakdown Matrix */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white p-3 rounded-2xl border border-purple-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-purple-600 block">Domestic Fair Price</span>
                  <span className="text-lg font-black text-purple-950">₹{output.fairPrice.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-700 block font-medium">Guaranteed ₹{output.hourlyWage}/hr wage</span>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-purple-200 shadow-xs">
                  <span className="text-[10px] uppercase font-bold text-purple-600 block">International Etsy Price</span>
                  <span className="text-lg font-black text-emerald-600">${output.etsyUsd} USD</span>
                  <span className="text-[10px] text-purple-700 block font-medium">~₹{(output.etsyUsd * 83).toLocaleString()} INR export value</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
