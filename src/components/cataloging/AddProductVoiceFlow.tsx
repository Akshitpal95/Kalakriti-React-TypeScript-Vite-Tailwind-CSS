import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  RefreshCw, 
  Layers, 
  Send,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, ProductAnalysisJSON, Language, Artisan, CraftCategory } from '../../types';
import { aiOrchestrator } from '../../services/aiOrchestrator';
import { speechService } from '../../services/speechService';
import { storageService } from '../../services/storageService';
import { EditableField } from './EditableField';
import { PriceBreakdownCard } from './PriceBreakdownCard';
import { CRAFT_CATEGORIES_META } from '../../data/craftCategories';

interface AddProductVoiceFlowProps {
  language: Language;
  activeArtisan: Artisan;
  initialVoiceContext?: string;
  onProductPublished: (newProduct: Product) => void;
  onOpenCrossPublish: (product: Product) => void;
}

// Preset authentic artisan items for instantaneous 1-click testing
const PRESET_SAMPLES = [
  {
    name: 'Banarasi Kadhwa Sari',
    category: 'Handloom & Textiles',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
    spokenPrompt: 'Pure mulberry silk saree with electroplated gold zari border, took 25 days on pit loom'
  },
  {
    name: 'Madhubani Tree of Life',
    category: 'Traditional Painting',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    spokenPrompt: 'Handmade cotton paper painting with natural turmeric and indigo colors, depicting peacocks and tree of life'
  },
  {
    name: 'Jaipur Blue Pottery Urn',
    category: 'Terracotta & Pottery',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
    spokenPrompt: 'Clay-free quartz blue pottery flower vase hand-painted with copper oxide glaze'
  },
  {
    name: 'Dhokra Lost-Wax Figurine',
    category: 'Metalcraft & Dhokra',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    spokenPrompt: 'Bastar tribal bell metal sculpture cast using ancient beeswax and clay mold technique'
  }
];

export const AddProductVoiceFlow: React.FC<AddProductVoiceFlowProps> = ({
  language,
  activeArtisan,
  initialVoiceContext = '',
  onProductPublished,
  onOpenCrossPublish
}) => {
  const isHindi = language === 'hi';

  const [selectedImage, setSelectedImage] = useState<string>(PRESET_SAMPLES[0].image);
  const [spokenNotes, setSpokenNotes] = useState<string>(initialVoiceContext || PRESET_SAMPLES[0].spokenPrompt);
  const [isRecordingNotes, setIsRecordingNotes] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');

  // Editable Form State (populated from Strict JSON)
  const [formData, setFormData] = useState<ProductAnalysisJSON | null>(null);
  const [currentSellingPrice, setCurrentSellingPrice] = useState<number>(16500);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [lastPublishedProduct, setLastPublishedProduct] = useState<Product | null>(null);
  const [showRawJSON, setShowRawJSON] = useState<boolean>(false);

  useEffect(() => {
    if (initialVoiceContext) {
      setSpokenNotes(initialVoiceContext);
    }
  }, [initialVoiceContext]);

  const [speechNotice, setSpeechNotice] = useState<string>('');

  // Handle custom image file upload with canvas compression
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawData = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            const maxDim = 1024;
            let w = img.width;
            let h = img.height;
            if (w > maxDim || h > maxDim) {
              if (w > h) {
                h = Math.round((h * maxDim) / w);
                w = maxDim;
              } else {
                w = Math.round((w * maxDim) / h);
                h = maxDim;
              }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, w, h);
              setSelectedImage(canvas.toDataURL('image/jpeg', 0.85));
            } else {
              setSelectedImage(rawData);
            }
          } catch {
            setSelectedImage(rawData);
          }
          setFormData(null);
        };
        img.src = rawData;
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle voice recording for product description notes
  const handleToggleVoiceNotes = () => {
    setSpeechNotice('');
    if (isRecordingNotes) {
      speechService.stopListening();
      setIsRecordingNotes(false);
    } else {
      speechService.stopSpeaking();
      const started = speechService.startListening(
        isHindi ? 'hi-IN' : 'en-IN',
        (text) => {
          setSpokenNotes(text);
        },
        (err) => {
          setSpeechNotice(err);
          setIsRecordingNotes(false);
        },
        () => setIsRecordingNotes(false)
      );
      if (started) {
        setIsRecordingNotes(true);
      }
    }
  };

  const handleApplyVoicePrompt = (promptText: string) => {
    setSpokenNotes(promptText);
    setSpeechNotice('');
    speechService.speak(promptText, isHindi ? 'hi-IN' : 'en-IN');
  };

  // Run AI Vision + Pricing Pipeline returning STRICT JSON
  const handleRunAICataloging = async () => {
    setIsAnalyzing(true);
    setAnalysisStep(isHindi ? 'फ़ोटो का विश्लेषण हो रहा है...' : 'Scanning product photograph & colors...');

    try {
      setTimeout(() => {
        setAnalysisStep(isHindi ? 'सामग्री एवं कारीगरी के घंटे आंके जा रहे हैं...' : 'Extracting material, craft technique & hours...');
      }, 400);

      setTimeout(() => {
        setAnalysisStep(isHindi ? 'कच्चे माल व अंतरराष्ट्रीय बाज़ार के आधार पर मूल्य तय हो रहा है...' : 'Calculating fair wage & comparable Etsy market price...');
      }, 800);

      const currentConfig = storageService.getAIConfig();
      const activeKey = currentConfig?.geminiApiKey || currentConfig?.openaiApiKey;
      const jsonOutput = await aiOrchestrator.processProductCatalogingPipeline(
        selectedImage,
        spokenNotes,
        activeKey
      );

      setFormData(jsonOutput);
      setCurrentSellingPrice(jsonOutput.price_range.suggested);

      // Speak confirmation
      const confirmText = isHindi
        ? `उत्पाद का विवरण तैयार है! सुझाई गई कीमत ₹${jsonOutput.price_range.suggested} है। आप किसी भी फ़ील्ड को छूकर बदल सकते हैं।`
        : `Product cataloged successfully! Recommended price is ₹${jsonOutput.price_range.suggested}. You can tap any field to edit.`;
      
      speechService.speak(confirmText, isHindi ? 'hi-IN' : 'en-IN');

      setTimeout(() => {
        const formElem = document.getElementById('catalog-generated-form');
        if (formElem) {
          formElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Publish to LoomDesk
  const handlePublish = () => {
    if (!formData) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      artisanId: activeArtisan.id,
      artisanName: activeArtisan.name,
      artisanLocation: `${activeArtisan.district}, ${activeArtisan.state}`,
      isVerifiedArtisan: activeArtisan.isVerified,
      title: formData.title,
      titleHindi: formData.titleHindi,
      category: formData.category,
      description: formData.description,
      descriptionHindi: formData.descriptionHindi,
      images: [selectedImage],
      material: formData.material,
      colors: formData.colors,
      craftsmanshipStyle: formData.craftsmanshipStyle,
      estimatedCraftTime: formData.estimatedCraftTime,
      craftHours: formData.craftHours,
      dimensions: formData.dimensions,
      careInstructions: formData.careInstructions,
      pricing: {
        suggestedPrice: formData.price_range.suggested,
        minPrice: formData.price_range.min,
        maxPrice: formData.price_range.max,
        materialCost: formData.materialCostEstimate,
        craftHours: formData.craftHours,
        hourlyWage: Math.round((currentSellingPrice - formData.materialCostEstimate) / (formData.craftHours || 1)),
        etsyBenchmarkUsd: formData.etsyComparablePriceUsd,
        etsyBenchmarkInr: formData.etsyComparablePriceUsd * 83,
        pricingRationale: formData.craftHeritageNotes
      },
      currentPrice: currentSellingPrice,
      rating: 5.0,
      reviewCount: 0,
      inStock: true,
      externalListings: {
        etsyExportReady: true,
        ondcExportReady: true,
        shopifyExportReady: true,
        suggestedEtsyTitle: formData.title,
        etsyTags: formData.seoTags,
        etsyCategoryPath: `Crafts > ${formData.category}`,
        sku: `AG-${activeArtisan.district.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`
      },
      createdAt: new Date().toISOString().split('T')[0]
    };

    onProductPublished(newProd);
    setLastPublishedProduct(newProd);
    setIsSuccessModalOpen(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Title Banner */}
      <div className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 border border-gold-300/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-maroon-900 text-gold-300 border border-gold-400/30 text-xs font-serif font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Desk AI Cataloger
            </span>
            <span className="bg-gold-500/20 text-maroon-950 border border-gold-400/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 font-serif">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-700" />
              {activeArtisan.isVerified ? 'Verified Artisan' : 'Artisan Mode'}
            </span>
            {storageService.getAIConfig()?.openaiApiKey ? (
              <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Live GPT-4o Vision Active
              </span>
            ) : (
              <span className="bg-cream-200/80 text-maroon-900 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-gold-300/60" title="Add your OpenAI API key in Settings (gear icon) to use live GPT-4o Vision">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                Craft Heuristic Engine (Free / No Key Needed)
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
            {isHindi ? 'स्मार्ट उत्पाद कैटलॉग व मूल्य निर्धारण' : 'Smart AI Product Cataloging & Pricing'}
          </h1>
          <p className="text-sm text-maroon-800/80 max-w-xl font-sans">
            {isHindi
              ? 'बस अपने उत्पाद की तस्वीर चुनें और बोलकर विवरण दें। Desk AI सामग्री, निर्माण समय व बाज़ार दर से पूर्ण विवरण और उचित मूल्य तैयार करेगा।'
              : 'Upload or capture a photo of your craft. Desk AI analyzes the image, craftsmanship, and materials to generate an editable listing and fair price.'}
          </p>
        </div>

        {/* Quick Voice Prompt CTA */}
        <button
          onClick={handleToggleVoiceNotes}
          className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-serif font-bold text-sm shadow-md transition-all active:scale-95 whitespace-nowrap border ${
            isRecordingNotes
              ? 'bg-maroon-700 text-gold-300 animate-mic-ring border-gold-400'
              : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 border-gold-300'
          }`}
        >
          <Mic className="w-5 h-5 text-maroon-950" />
          <span>{isRecordingNotes ? (isHindi ? 'रिकॉर्डिंग चालू है...' : 'Listening...') : (isHindi ? 'विवरण बोलें (माइक)' : 'Speak Details (Mic)')}</span>
        </button>
      </div>

      {/* Step 1 & 2: Image Selection & Voice Description */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Column: Image Preview & Sample Selectors (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-[#FAF6EF] p-5 rounded-3xl border border-gold-300/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-maroon-950 flex items-center gap-2">
                <Camera className="w-4 h-4 text-gold-600" />
                <span>{isHindi ? '1. उत्पाद की फ़ोटो' : '1. Product Photo'}</span>
              </h3>
              <div className="flex items-center gap-2">
                <label className="cursor-pointer text-xs font-serif font-bold text-maroon-900 hover:text-maroon-950 flex items-center gap-1 bg-white hover:bg-cream-100 px-2.5 py-1.5 rounded-xl border border-gold-300/60 transition-all shadow-xs">
                  <Camera className="w-3.5 h-3.5 text-gold-600" />
                  <span>{isHindi ? 'कैमरा' : 'Camera'}</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment"
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
                <label className="cursor-pointer text-xs font-serif font-bold text-maroon-900 hover:text-maroon-950 flex items-center gap-1 bg-white hover:bg-cream-100 px-2.5 py-1.5 rounded-xl border border-gold-300/60 transition-all shadow-xs">
                  <Upload className="w-3.5 h-3.5 text-gold-600" />
                  <span>{isHindi ? 'अपलोड' : 'Upload'}</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                  />
                </label>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-100 border border-gold-300/60 group shadow-inner">
              <img
                src={selectedImage}
                alt="Product craft"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-maroon-950/80 backdrop-blur-md text-gold-300 border border-gold-400/30 px-2.5 py-1 rounded-lg text-[10px] font-serif font-semibold">
                High-Res Craft Asset
              </div>
            </div>

            {/* Quick Sample Presets */}
            <div>
              <p className="text-xs font-serif font-bold text-maroon-900 mb-2">
                {isHindi ? 'या नीचे दिए गए नमूने में से चुनें:' : 'Or pick an authentic craft preset:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_SAMPLES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedImage(sample.image);
                      setSpokenNotes(sample.spokenPrompt);
                      setFormData(null);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left text-xs transition-all ${
                      selectedImage === sample.image
                        ? 'border-gold-500 bg-cream-100 ring-1 ring-gold-400 shadow-sm'
                        : 'border-gold-300/40 bg-white hover:bg-cream-50'
                    }`}
                  >
                    <img 
                      src={sample.image} 
                      alt={sample.name} 
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-gold-300/40" 
                    />
                    <div className="overflow-hidden">
                      <p className="font-serif font-bold text-maroon-950 truncate text-[11px]">{sample.name}</p>
                      <p className="text-[10px] text-maroon-700/80 truncate font-sans">{sample.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Spoken Notes & Trigger Action (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-[#FAF6EF] p-5 sm:p-6 rounded-3xl border border-gold-300/60 shadow-sm space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-maroon-950 flex items-center gap-2">
                  <Mic className="w-4 h-4 text-gold-600" />
                  <span>{isHindi ? '2. आपकी बोली / विवरण' : '2. Spoken Artisan Notes'}</span>
                </h3>
                <span className="text-xs text-maroon-700/80 font-medium font-sans">
                  {isHindi ? 'बोलें या टाइप करें' : 'Voice or typing'}
                </span>
              </div>

              <div className="relative">
                <textarea
                  rows={4}
                  value={spokenNotes}
                  onChange={(e) => setSpokenNotes(e.target.value)}
                  placeholder={isHindi ? 'जैसे: यह विशुद्ध रेशम की साड़ी है, 20 दिन लगे, सुनहरी ज़री का काम है...' : 'e.g. Pure silk handloom sari, took 25 days on pit loom with gold zari...'}
                  className="w-full text-sm font-medium text-maroon-950 bg-white rounded-2xl p-4 border border-gold-300/60 focus:border-gold-500 focus:ring-1 focus:ring-gold-400 outline-none transition-all leading-relaxed font-sans shadow-inner"
                />
                <button
                  type="button"
                  onClick={handleToggleVoiceNotes}
                  className={`absolute bottom-3 right-3 p-2.5 rounded-xl shadow-md transition-all border ${
                    isRecordingNotes
                      ? 'bg-maroon-700 text-gold-300 animate-pulse border-gold-400'
                      : 'bg-gradient-to-tr from-maroon-900 to-maroon-800 text-gold-300 border-gold-400/50 hover:from-maroon-800 hover:to-maroon-700'
                  }`}
                  title="Dictate with voice"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>

              {speechNotice && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span>⚠️ {speechNotice}</span>
                  <button type="button" onClick={() => setSpeechNotice('')} className="text-amber-700 font-bold ml-2">✕</button>
                </div>
              )}

              {/* One-Click Voice Prompt Simulator Chips */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-serif font-bold text-maroon-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-600" />
                    <span>{isHindi ? 'या 1-क्लिक वॉइस सैंपल आज़माएं (सुनिए व टेस्ट करें):' : 'Or tap a 1-click voice sample to test:'}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'बनारसी साड़ी (28 दिन)', text: 'यह शुद्ध कढ़वा ज़री रेशम की बनारसी साड़ी है, 28 दिन में बुनी गई है, असली सुनहरी ज़री का काम है।' },
                    { label: 'ब्लू पॉटरी फूलदान (4 दिन)', text: 'यह जयपुर की प्रसिद्ध ब्लू पॉटरी का हस्तनिर्मित सजावटी फूलदान है, क्वार्ट्ज़ और तांबे के प्राकृतिक नीले रंग से बना।' },
                    { label: 'मधुबनी पेंटिंग (5 दिन)', text: 'यह प्राकृतिक वानस्पतिक रंगों और बांस की कलम से हस्तनिर्मित पारंपरिक मधुबनी लोक कला चित्र है।' },
                    { label: 'ढोकरा शिल्पकला (8 दिन)', text: 'यह बस्तर की प्राचीन मोम ढलाई तकनीक से निर्मित विशुद्ध कांस्य आदिवासी शिल्पकला है।' }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyVoicePrompt(chip.text)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-cream-100 hover:border-gold-500 border border-gold-300/50 text-maroon-950 transition-all active:scale-95 flex items-center gap-1 shadow-xs font-sans"
                      title={chip.text}
                    >
                      <span>🎙️</span>
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-cream-100/80 p-3.5 rounded-2xl border border-gold-300/50 text-xs text-maroon-900 space-y-1">
                <p className="font-serif font-bold text-maroon-950">
                  💡 {isHindi ? 'Desk AI कैसे मदद करता है:' : 'How Desk AI works:'}
                </p>
                <p className="text-[11px] leading-relaxed font-sans text-maroon-800">
                  {isHindi
                    ? 'AI तस्वीर के रंगों, पैटर्न और आपकी आवाज़ के संकेतों को समझकर JSON फॉर्म तैयार करता है, जिसे आप सीधे एडिट कर सकते हैं।'
                    : 'The AI parses image textures, geometry, and your spoken notes to produce a strict JSON specification with fair trade pricing.'}
                </p>
              </div>
            </div>

            {/* Run Analysis Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleRunAICataloging}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 rounded-2xl font-serif font-bold text-base shadow-lg shadow-gold-500/20 active:scale-98 transition-all disabled:opacity-75 cursor-pointer border border-gold-300"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-maroon-950" />
                    <span>{analysisStep || (isHindi ? 'विश्लेषण चल रहा है...' : 'Analyzing craft...')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-maroon-950" />
                    <span>{isHindi ? 'AI से विवरण और मूल्य निकालें' : 'Generate Catalog & Pricing with AI'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Editable Form Populated from Strict JSON */}
      {formData && (
        <div id="catalog-generated-form" className="space-y-6 pt-4 animate-fadeIn">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF6EF] p-4 sm:p-5 rounded-3xl border border-gold-300/60 shadow-sm">
            <div>
              <span className="bg-maroon-900 text-gold-300 border border-gold-400/30 text-[10px] font-serif font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Strict JSON Generated
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon-950 mt-1">
                {isHindi ? 'संपादनीय उत्पाद फ़ॉर्म (Tap to Edit)' : 'Editable Product Listing Form'}
              </h2>
              <p className="text-xs text-maroon-800/80 font-sans">
                {isHindi
                  ? 'हर फ़ील्ड को छूकर बदलें या बोलकर री-रिकॉर्ड करें। कोई भी फ़ील्ड लॉक नहीं है।'
                  : 'Every field is fully customizable. Tap to edit or use the microphone icon on any field.'}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setShowRawJSON(!showRawJSON)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 bg-maroon-950 hover:bg-maroon-900 text-gold-300 rounded-2xl text-xs font-serif font-bold shadow-sm transition-all border border-gold-400/40"
              >
                <span>{showRawJSON ? (isHindi ? 'JSON छुपाएं' : 'Hide JSON') : (isHindi ? 'AI JSON देखें' : 'View AI JSON')}</span>
              </button>

              {/* Listen to entire draft button */}
              <button
                type="button"
                onClick={() => {
                  const readDraft = isHindi
                    ? `शीर्षक: ${formData.titleHindi || formData.title}। विवरण: ${formData.descriptionHindi || formData.description}। सामग्री: ${formData.material}। अनुशंसित मूल्य: ₹${currentSellingPrice}।`
                    : `Title: ${formData.title}. Description: ${formData.description}. Material: ${formData.material}. Suggested price: ₹${currentSellingPrice}.`;
                  speechService.speak(readDraft, isHindi ? 'hi-IN' : 'en-IN');
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-cream-100 rounded-2xl border border-gold-300/60 text-xs font-serif font-bold text-maroon-950 shadow-sm transition-all"
              >
                <Volume2 className="w-4 h-4 text-gold-600" />
                <span>{isHindi ? 'संपूर्ण ड्राफ़्ट सुनें (Audio)' : 'Listen to Full Draft'}</span>
              </button>
            </div>
          </div>

          {/* Raw AI JSON Viewer */}
          {showRawJSON && (
            <div className="bg-maroon-950 text-gold-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto border border-gold-400/40 shadow-md animate-fadeIn">
              <div className="flex items-center justify-between text-[11px] text-gold-400 font-bold mb-2 pb-1 border-b border-gold-500/30">
                <span>Desk AI Vision + Pricing Engine Output (Strict JSON)</span>
                <span className="text-gold-300">Status: Form Successfully Populated</span>
              </div>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
          )}

          {/* Pricing Breakdown Component */}
          <PriceBreakdownCard
            pricing={{
              suggestedPrice: formData.price_range.suggested,
              minPrice: formData.price_range.min,
              maxPrice: formData.price_range.max,
              materialCost: formData.materialCostEstimate,
              craftHours: formData.craftHours,
              hourlyWage: Math.round((currentSellingPrice - formData.materialCostEstimate) / (formData.craftHours || 1)),
              etsyBenchmarkUsd: formData.etsyComparablePriceUsd,
              etsyBenchmarkInr: formData.etsyComparablePriceUsd * 83,
              pricingRationale: formData.craftHeritageNotes
            }}
            currentPrice={currentSellingPrice}
            onPriceChange={(newPrice) => setCurrentSellingPrice(newPrice)}
            language={language}
          />

          {/* Form Grid with Tap-to-Edit Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableField
              label={isHindi ? 'उत्पाद का शीर्षक (English Title)' : 'Product Title'}
              value={formData.title}
              onChange={(val) => setFormData({ ...formData, title: val })}
              isAIHighlighted={true}
              language={language}
            />

            <EditableField
              label={isHindi ? 'उत्पाद का शीर्षक (हिंदी)' : 'Product Title (Hindi)'}
              value={formData.titleHindi}
              onChange={(val) => setFormData({ ...formData, titleHindi: val })}
              isAIHighlighted={true}
              language={language}
            />

            <div className="md:col-span-2">
              <EditableField
                label={isHindi ? 'उत्पाद विवरण (English Description)' : 'Comprehensive Description'}
                value={formData.description}
                onChange={(val) => setFormData({ ...formData, description: val })}
                type="textarea"
                isAIHighlighted={true}
                language={language}
              />
            </div>

            <div className="md:col-span-2">
              <EditableField
                label={isHindi ? 'उत्पाद विवरण (हिंदी में)' : 'Description (Hindi)'}
                value={formData.descriptionHindi}
                onChange={(val) => setFormData({ ...formData, descriptionHindi: val })}
                type="textarea"
                isAIHighlighted={true}
                language={language}
              />
            </div>

            <EditableField
              label={isHindi ? 'प्रामाणिक सामग्री (Material)' : 'Authentic Material'}
              value={formData.material}
              onChange={(val) => setFormData({ ...formData, material: val })}
              isAIHighlighted={true}
              language={language}
            />

            <EditableField
              label={isHindi ? 'कारीगरी शैली (Technique / Style)' : 'Craftsmanship Style'}
              value={formData.craftsmanshipStyle}
              onChange={(val) => setFormData({ ...formData, craftsmanshipStyle: val })}
              isAIHighlighted={true}
              language={language}
            />

            <EditableField
              label={isHindi ? 'आयाम / नाप (Dimensions)' : 'Dimensions & Size'}
              value={formData.dimensions}
              onChange={(val) => setFormData({ ...formData, dimensions: val })}
              isAIHighlighted={true}
              language={language}
            />

            <EditableField
              label={isHindi ? 'अनुमानित निर्माण समय (Craft Time)' : 'Estimated Craft Time'}
              value={formData.estimatedCraftTime}
              onChange={(val) => setFormData({ ...formData, estimatedCraftTime: val })}
              isAIHighlighted={true}
              language={language}
            />

            <div className="md:col-span-2">
              <EditableField
                label={isHindi ? 'देखभाल एवं संरक्षण निर्देश (Care Instructions)' : 'Care & Preservation Instructions'}
                value={formData.careInstructions}
                onChange={(val) => setFormData({ ...formData, careInstructions: val })}
                isAIHighlighted={true}
                language={language}
              />
            </div>
          </div>

          {/* Publishing & Cross-Publish Actions */}
          <div className="p-6 bg-[#FAF6EF] rounded-3xl border border-gold-300/60 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-serif text-lg font-bold text-maroon-950">
                {isHindi ? 'सूची प्रकाशित करने के लिए तैयार है' : 'Ready to Publish Your Listing'}
              </h4>
              <p className="text-xs text-maroon-800/80 font-sans">
                {isHindi
                  ? 'कलाकृति बाज़ार में तुरंत लाइव करें अथवा सीधे Etsy/ONDC पर एक्सपोर्ट करें।'
                  : 'Publish instantly to Kalakriti or export to Etsy & ONDC.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handlePublish}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 rounded-2xl font-serif font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-gold-300"
              >
                <CheckCircle2 className="w-5 h-5 text-maroon-950" />
                <span>{isHindi ? 'कलाकृति पर प्रकाशित करें' : 'Publish to Kalakriti'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal with Cross-Publish options */}
      {isSuccessModalOpen && lastPublishedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-maroon-950/80 backdrop-blur-md">
          <div className="bg-[#FAF6EF] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-gold-300/60 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-cream-200 text-maroon-900 mx-auto flex items-center justify-center shadow-inner border border-gold-400/50">
              <CheckCircle2 className="w-10 h-10 text-gold-600" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-maroon-950">
                {isHindi ? 'बधाई हो! उत्पाद प्रकाशित हो गया 🎉' : 'Listing Live on Kalakriti! 🎉'}
              </h3>
              <p className="text-sm text-maroon-800 font-sans">
                {isHindi
                  ? `"${lastPublishedProduct.title}" अब बाज़ार में ₹${lastPublishedProduct.currentPrice.toLocaleString('en-IN')} में खरीदारों के लिए उपलब्ध है।`
                  : `"${lastPublishedProduct.title}" is now published and reachable by customers for ₹${lastPublishedProduct.currentPrice.toLocaleString('en-IN')}.`}
              </p>
            </div>

            {/* Cross-publish suggestion prompt */}
            <div className="bg-white p-4 rounded-2xl border border-gold-300/60 text-left space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-maroon-950 uppercase tracking-wider">
                <Layers className="w-4 h-4 text-gold-600" />
                <span>{isHindi ? 'वैश्विक बाज़ार क्रॉस-पब्लिश' : 'Cross-Listing Opportunities'}</span>
              </div>
              <p className="text-xs text-maroon-800 font-sans">
                {isHindi
                  ? 'क्या आप इसे Etsy या ONDC पर भी एक्सपोर्ट करना चाहते हैं? हमने अंतरराष्ट्रीय शीर्षक और टैग पहले ही बना दिए हैं।'
                  : 'Desk AI has already drafted your Etsy international tags and ONDC catalog format.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onOpenCrossPublish(lastPublishedProduct);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-maroon-950 font-serif font-bold text-xs rounded-xl transition-all shadow-sm border border-gold-300"
              >
                <span>{isHindi ? 'Etsy और ONDC एक्सपोर्ट देखें' : 'View Etsy & ONDC Export Details'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3 bg-cream-200 hover:bg-cream-300 text-maroon-950 font-serif font-bold text-xs rounded-xl transition-colors border border-gold-300/50"
            >
              {isHindi ? 'वापस जाएं' : 'Done & Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
