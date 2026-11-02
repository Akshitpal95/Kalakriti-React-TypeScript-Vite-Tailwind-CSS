import React, { useState } from 'react';
import { 
  Search, 
  Mic, 
  Sparkles, 
  RotateCcw,
  ShieldCheck,
  Award,
  Truck,
  HeartHandshake,
  Headphones,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { Product, CraftCategory, Language } from '../../types';
import { ProductCard } from './ProductCard';
import { CRAFT_CATEGORIES_META } from '../../data/craftCategories';
import { speechService } from '../../services/speechService';
import { MandalaFlourish, PaisleyCorner, MughalArchDivider, InstagramIcon } from '../common/OrnamentalDetails';

interface MarketplaceGridProps {
  products: Product[];
  language: Language;
  onSelectProduct: (product: Product) => void;
  onOpenRatingModal: (product: Product) => void;
  onOpenCrossPublish: (product: Product) => void;
  onNavigateToCatalog: () => void;
}

// Curated Category Circle Thumbnails
const CATEGORY_CIRCLES = [
  {
    name: 'Handloom & Textiles',
    hindiName: 'हथकरघा व रेशम',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    tag: 'Banaras & Kanchipuram'
  },
  {
    name: 'Traditional Painting',
    hindiName: 'पारंपरिक चित्रकला',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80',
    tag: 'Madhubani & Pattachitra'
  },
  {
    name: 'Metalcraft & Dhokra',
    hindiName: 'कांस्य व ढोकरा',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=300&q=80',
    tag: 'Bastar Lost-Wax'
  },
  {
    name: 'Terracotta & Pottery',
    hindiName: 'टेराकोटा व पॉटरी',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80',
    tag: 'Jaipur Blue Pottery'
  },
  {
    name: 'Woodwork & Carving',
    hindiName: 'काष्ठ नक्काशी',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=300&q=80',
    tag: 'Saharanpur Sheesham'
  },
  {
    name: 'Handmade Jewelry',
    hindiName: 'पारंपरिक आभूषण',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80',
    tag: 'Cuttack Silver Filigree'
  },
  {
    name: 'Folk Music & Instruments',
    hindiName: 'लोक वाद्ययंत्र',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
    tag: 'Mirzapur & Rampur'
  },
  {
    name: 'Leather & Jute Crafts',
    hindiName: 'चर्म व जूट शिल्प',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=300&q=80',
    tag: 'Kolhapur & Bengal'
  }
];

// Instagram-style Artisan Gallery Showcase
const ARTISAN_GALLERY = [
  {
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    caption: 'Ramkishan Vishwakarma weaving silver-gilt zari on a 150-year-old pit loom in Varanasi.',
    craft: 'Kadhwa Silk Weaving',
    location: 'Varanasi, UP'
  },
  {
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    caption: 'Sunita Devi grinding turmeric and marigold petals for Mithila ritual art.',
    craft: 'Madhubani Painting',
    location: 'Madhubani, Bihar'
  },
  {
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    caption: 'Somaru Baghel preparing beeswax threads for ancient Harappan lost-wax casting.',
    craft: 'Bastar Dhokra',
    location: 'Kondagaon, CG'
  },
  {
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=600&q=80',
    caption: 'Kripal Singh shaping Egyptian paste for delicate Jaipur turquoise pottery.',
    craft: 'Blue Pottery',
    location: 'Jaipur, Rajasthan'
  }
];

export const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  products,
  language,
  onSelectProduct,
  onOpenRatingModal,
  onOpenCrossPublish,
  onNavigateToCatalog
}) => {
  const isHindi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [isSearchingVoice, setIsSearchingVoice] = useState<boolean>(false);

  // States list from products
  const states = ['All', 'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Chhattisgarh', 'Odisha', 'Gujarat'];

  // Voice Search handler
  const handleVoiceSearch = () => {
    if (isSearchingVoice) {
      speechService.stopListening();
      setIsSearchingVoice(false);
    } else {
      speechService.stopSpeaking();
      const started = speechService.startListening(
        isHindi ? 'hi-IN' : 'en-IN',
        (text, isFinal) => {
          setSearchQuery(text);
          if (isFinal) {
            setIsSearchingVoice(false);
          }
        },
        () => setIsSearchingVoice(false),
        () => setIsSearchingVoice(false)
      );
      if (started) setIsSearchingVoice(true);
    }
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.titleHindi && p.titleHindi.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisanLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesState = selectedState === 'All' || p.artisanLocation.includes(selectedState);
    const matchesVerified = !onlyVerified || p.isVerifiedArtisan;

    return matchesSearch && matchesCategory && matchesState && matchesVerified;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-12 w-full max-w-full overflow-hidden">
      {/* ========================================================================= */}
      {/* 3. HERO SECTION (Full-width, Mughal arches, large serif headline + gold accent) */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-gradient-to-b from-[#460814] via-[#5C0E1E] to-[#3B0610] text-[#F5EDE0] overflow-hidden border-b-2 border-gold-500/30">
        {/* Subtle Jali dots background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-jali-dots" />
        
        {/* Corner Paisley Filigrees */}
        <PaisleyCorner position="top-left" className="w-28 h-28 text-gold-400 opacity-25 -top-2 -left-2 hidden sm:block" color="#D4AF6A" />
        <PaisleyCorner position="top-right" className="w-28 h-28 text-gold-400 opacity-25 -top-2 -right-2 hidden sm:block" color="#D4AF6A" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Royal Micro-badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#35050E] border border-gold-500/40 text-gold-300 text-xs font-bold tracking-wider uppercase shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  {isHindi ? 'राष्ट्रीय पुरस्कार विजेता कारीगर • शून्य बिचौलिया शुल्क' : "India's Master Artisans • 100% Direct Fair Compensation"}
                </span>
              </div>

              {/* Large Serif Headline with highlighted gold accent word */}
              <h1 className="font-serif text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                {isHindi ? (
                  <>
                    भारत की अनमोल धरोहर, <br />
                    <span className="text-gold-foil">अतुल्य शिल्पकारी</span>
                  </>
                ) : (
                  <>
                    Where Generational Heritage Meets{' '}
                    <span className="text-gold-foil">Timeless Luxury</span>
                  </>
                )}
              </h1>

              {/* Short supporting line beneath */}
              <p className="text-gold-200/90 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {isHindi
                  ? 'बनारसी रेशम, बस्तर ढोकरा, जयपुर ब्लू पॉटरी और मधुबनी लोक कला की प्रामाणिक कृतियां। सीधे शिल्पकारों की कार्यशाला से आपके द्वार तक।'
                  : 'Discover museum-grade handloom weaves, 4,000-year Vedic lost-wax bronzes, and sacred folk paintings crafted by certified national awardees — curated with absolute provenance.'}
              </p>

              {/* CTAs: Gold pill button with maroon text */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onNavigateToCatalog}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-maroon-950 font-serif font-bold text-sm tracking-wide shadow-xl shadow-black/30 hover:shadow-gold-500/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-gold-300"
                >
                  <Sparkles className="w-4 h-4 text-maroon-900" />
                  <span>{isHindi ? 'कलाकृति जोड़ें (Desk AI)' : 'List Your Craft with Desk AI'}</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('featured-grid-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#460814]/80 hover:bg-[#5C0E1E] text-gold-200 hover:text-white font-semibold text-sm border border-gold-500/40 hover:border-gold-300 shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>{isHindi ? 'शाही संग्रह देखें' : 'Explore Curated Collection'}</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </button>
              </div>

              {/* Micro provenance indicators */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-6 text-xs text-gold-300/80 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-gold-400" />
                  GI Tagged Authenticity
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-gold-400" />
                  ODOP Certified
                </span>
              </div>
            </div>

            {/* Right Showcase: Mughal Arch Silhouette Framed Hero Portrait (5 cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Ornate Gold Border Ring */}
              <div className="relative w-72 sm:w-88 aspect-[4/5] rounded-t-[140px] rounded-b-3xl p-2.5 bg-gradient-to-b from-gold-400 via-gold-500 to-maroon-800 shadow-2xl shadow-black/60 border border-gold-300">
                <div className="w-full h-full rounded-t-[130px] rounded-b-2xl overflow-hidden relative bg-maroon-950">
                  <img
                    src="/hero-model.jpg"
                    alt="Imperial Indian Silk Craft"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Caption inside arch */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#460814]/90 backdrop-blur-md rounded-xl border border-gold-500/40 text-center">
                    <p className="font-serif text-sm font-bold text-gold-200">
                      {isHindi ? 'बनारसी कढ़वा ज़री साड़ी' : 'Royal Banarasi Kadhwa Brocade'}
                    </p>
                    <p className="text-[10px] text-gold-300/80 mt-0.5">
                      {isHindi ? 'हथकरघा बुनाई • 32 दिन की कारीगरी' : 'Master Ramkishan Vishwakarma • Varanasi'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mughal Arch Bottom Divider */}
        <MughalArchDivider className="w-full h-6 text-gold-400" color="#D4AF6A" />
      </section>

      {/* ========================================================================= */}
      {/* 4. CATEGORY / FEATURE CIRCLES (Circular crop, thin gold ring, View more link) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-[11px] uppercase tracking-widest text-maroon-800 font-bold mb-1">
            {isHindi ? 'परंपरागत शिल्प मंडल' : 'DISCOVER BY TRADITIONAL GUILDS'}
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950">
            {isHindi ? 'प्रमुख कारीगरी श्रेणियां' : 'Craft Heritage Sectors'}
          </h2>
          <MandalaFlourish className="w-36 h-4 text-gold-600 mt-2 opacity-80" color="#C9A15A" />
        </div>

        {/* Circular thumbnails row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 pt-2">
          {CATEGORY_CIRCLES.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setSelectedCategory(item.name);
                const el = document.getElementById('featured-grid-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Circular crop with thin gold ring border as required */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 border-2 border-gold-500 ring-2 ring-gold-400/30 group-hover:ring-gold-500 group-hover:border-maroon-800 shadow-md group-hover:scale-105 transition-all bg-cream-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Label */}
              <h4 className="font-serif font-bold text-xs sm:text-sm text-maroon-950 group-hover:text-maroon-700 mt-2.5 line-clamp-1 leading-snug">
                {isHindi ? item.hindiName : item.name}
              </h4>

              {/* View more -> link underneath */}
              <span className="text-[11px] text-gold-700 font-bold group-hover:text-maroon-800 flex items-center gap-0.5 mt-0.5 transition-colors">
                <span>{isHindi ? 'देखें' : 'View more'}</span>
                <span className="text-xs">→</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRUST / VALUE STRIP (4 icons, gold line-art style, short labels + captions) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF6EF] rounded-3xl border border-gold-500/40 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gold-500/20">
            {/* Item 1: Quality / Authenticity */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-100/90 border border-gold-500/50 flex items-center justify-center text-maroon-800 flex-shrink-0 shadow-xs">
                <ShieldCheck className="w-6 h-6 text-gold-600" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-maroon-950">
                  {isHindi ? 'प्रामाणिक GI प्रमाणन' : 'Authentic GI Provenance'}
                </h4>
                <p className="text-xs text-[#5e4a4b] leading-relaxed">
                  {isHindi ? '100% असली व सरकारी मान्यता प्राप्त कारीगर।' : 'Direct certification with zero machine replicas.'}
                </p>
              </div>
            </div>

            {/* Item 2: Fair Pay / Direct Craft */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-100/90 border border-gold-500/50 flex items-center justify-center text-maroon-800 flex-shrink-0 shadow-xs">
                <HeartHandshake className="w-6 h-6 text-gold-600" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-maroon-950">
                  {isHindi ? 'शून्य बिचौलिया शुल्क' : '100% Direct Fair Pay'}
                </h4>
                <p className="text-xs text-[#5e4a4b] leading-relaxed">
                  {isHindi ? 'पूरा भुगतान सीधे ग्रामीण कारीगरों के खाते में।' : 'Every rupee reaches the artisan without cuts.'}
                </p>
              </div>
            </div>

            {/* Item 3: Secure Escrow / Process */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-100/90 border border-gold-500/50 flex items-center justify-center text-maroon-800 flex-shrink-0 shadow-xs">
                <Truck className="w-6 h-6 text-gold-600" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-maroon-950">
                  {isHindi ? 'सुरक्षित वितरण व एस्क्रो' : 'Insured Global Transit'}
                </h4>
                <p className="text-xs text-[#5e4a4b] leading-relaxed">
                  {isHindi ? 'सुरक्षित पैकिंग व वैश्विक शिपिंग सुविधा।' : 'Museum-grade packaging & ONDC export.'}
                </p>
              </div>
            </div>

            {/* Item 4: Support / Desk AI */}
            <div className="flex items-start gap-4 pt-4 sm:pt-0 sm:px-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-100/90 border border-gold-500/50 flex items-center justify-center text-maroon-800 flex-shrink-0 shadow-xs">
                <Headphones className="w-6 h-6 text-gold-600" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-sm text-maroon-950">
                  {isHindi ? '24/7 बहुभाषी वॉइस' : 'Multilingual Desk AI'}
                </h4>
                <p className="text-xs text-[#5e4a4b] leading-relaxed">
                  {isHindi ? '22 भारतीय भाषाओं में बोलकर सहायता।' : 'Voice-guided assistance in 22 regional dialects.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. SPLIT BANNER SECTION (Two-column full-bleed image banners with gold CTA) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Banner 1: Royal Handloom */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-xl group min-h-[320px] sm:min-h-[360px] flex flex-col justify-end p-6 sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80"
              alt="Royal Handloom & Silk Weaves"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Maroon Gradient Overlay as required */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B0610] via-[#5C0E1E]/80 to-black/30 pointer-events-none" />
            <PaisleyCorner position="top-right" className="w-16 h-16 text-gold-400 opacity-30 -top-1 -right-1" color="#D4AF6A" />

            <div className="relative z-10 space-y-3">
              <span className="inline-block bg-[#460814] text-gold-400 border border-gold-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {isHindi ? 'शाही वस्त्र संग्रह' : 'Imperial Handloom Archive'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {isHindi ? 'बनारसी कढ़वा व कांचीपुरम रेशम' : 'The Imperial Weaves of Varanasi'}
              </h3>
              <p className="text-xs sm:text-sm text-gold-200/85 leading-relaxed max-w-md">
                {isHindi
                  ? 'असली सोने-चांदी की ज़री से बुनी गई विरासत साड़ियां। हर साड़ी महीनों के धैर्य का प्रतीक है।'
                  : 'Pure mulberry silks woven on wooden pit looms with gold zari by 4th-generation master weavers.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Handloom & Textiles');
                    const el = document.getElementById('featured-grid-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-maroon-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isHindi ? 'हथकरघा संग्रह देखें' : 'Explore Handlooms'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Banner 2: Vedic Dhokra & Metalcraft */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-gold-500/40 shadow-xl group min-h-[320px] sm:min-h-[360px] flex flex-col justify-end p-6 sm:p-8">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80"
              alt="Vedic Lost-Wax Dhokra & Bell Metal"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark Maroon Gradient Overlay as required */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3B0610] via-[#5C0E1E]/80 to-black/30 pointer-events-none" />
            <PaisleyCorner position="top-right" className="w-16 h-16 text-gold-400 opacity-30 -top-1 -right-1" color="#D4AF6A" />

            <div className="relative z-10 space-y-3">
              <span className="inline-block bg-[#460814] text-gold-400 border border-gold-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {isHindi ? 'वैदिक धातुशिल्प' : '4,000-Year Harappan Legacy'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {isHindi ? 'बस्तर ढोकरा व कांस्य कृतियां' : 'Vedic Lost-Wax Dhokra & Bronze'}
              </h3>
              <p className="text-xs sm:text-sm text-gold-200/85 leading-relaxed max-w-md">
                {isHindi
                  ? 'हड़प्पा सभ्यता से चली आ रही मोम-सांचा ढलाई तकनीक। प्रत्येक धातु कृति पूर्णतः अद्वितीय और एक ही बार बनती है।'
                  : 'Lost-wax bell metal deities forged in open furnaces by the indigenous tribal artisans of Bastar.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Metalcraft & Dhokra');
                    const el = document.getElementById('featured-grid-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-maroon-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isHindi ? 'धातुशिल्प संग्रह देखें' : 'Discover Metalcraft'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURED / HIGHLIGHT GRID (Section heading centered with flourish divider) */}
      {/* ========================================================================= */}
      <section id="featured-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Heading centered with ornamental flourish (similar to "NOS COUPS DE CŒUR") */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-gold-700 font-extrabold font-serif">
            {isHindi ? 'शाही संग्रह • NOS COUPS DE CŒUR' : 'NOS COUPS DE CŒUR • CURATED SELECTIONS'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-maroon-950 tracking-tight">
            {isHindi ? 'अनमोल कारीगरी की धरोहर' : 'Curated Masterpieces'}
          </h2>
          <MandalaFlourish className="w-56 h-6 text-gold-600 opacity-80 pt-1" color="#C9A15A" />
        </div>

        {/* Search & Filter Bar (Luxury Cream & Gold Border) */}
        <div className="bg-[#FAF6EF] rounded-3xl p-4 sm:p-5 border border-gold-500/40 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input with Voice Mic in Gold */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gold-600 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isHindi ? 'शिल्प, साड़ी, पेंटिंग या कारीगर का नाम खोजें...' : 'Search craft, saree, painting, brass or artisan...'}
                className="w-full pl-12 pr-12 py-3 bg-white rounded-2xl text-sm font-medium text-[#1E1617] border border-gold-500/40 focus:border-maroon-800 focus:ring-1 focus:ring-maroon-800 outline-none transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all cursor-pointer ${
                  isSearchingVoice 
                    ? 'bg-red-600 text-white animate-pulse' 
                    : 'bg-gold-100 text-maroon-900 border border-gold-300 hover:bg-gold-200'
                }`}
                title={isHindi ? 'बोलकर खोजें' : 'Voice search'}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>

            {/* Region / State Filter */}
            <div className="sm:w-56">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full py-3 px-4 bg-white rounded-2xl text-sm font-semibold text-[#1E1617] border border-gold-500/40 focus:border-maroon-800 outline-none cursor-pointer shadow-inner"
              >
                <option value="All">{isHindi ? 'सभी राज्य / क्षेत्र' : 'All States / Regions'}</option>
                {states.filter(s => s !== 'All').map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Verified Toggle */}
            <button
              type="button"
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold border transition-all whitespace-nowrap cursor-pointer ${
                onlyVerified
                  ? 'bg-maroon-800 text-gold-200 border-maroon-800 shadow-sm'
                  : 'bg-white text-maroon-900 border-gold-500/40 hover:border-gold-500'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>{isHindi ? 'केवल सत्यापित कारीगर' : 'Verified GI Only'}</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 shadow-sm'
                  : 'bg-white text-maroon-900 hover:bg-gold-50 border border-gold-500/40'
              }`}
            >
              {isHindi ? 'सभी शिल्प (All)' : 'All Crafts'}
            </button>

            {Object.keys(CRAFT_CATEGORIES_META).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 shadow-sm'
                    : 'bg-white text-maroon-900 hover:bg-gold-50 border border-gold-500/40'
                }`}
              >
                {isHindi ? CRAFT_CATEGORIES_META[cat as CraftCategory]?.hindiName || cat : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                language={language}
                onSelectProduct={onSelectProduct}
                onOpenRatingModal={onOpenRatingModal}
                onOpenCrossPublish={onOpenCrossPublish}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF6EF] rounded-3xl border border-gold-500/40 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gold-100 text-maroon-800 mx-auto flex items-center justify-center text-2xl border border-gold-300">
              🔍
            </div>
            <h3 className="font-serif text-xl font-bold text-maroon-950">
              {isHindi ? 'कोई उत्पाद नहीं मिला' : 'No crafts matched your filter'}
            </h3>
            <p className="text-xs text-[#5e4a4b] max-w-sm mx-auto">
              {isHindi
                ? 'कृपया अपनी खोज शब्द बदलें या फ़िल्टर रीसेट करें।'
                : 'Try relaxing your search terms or reset filters to browse all verified crafts.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedState('All');
                setOnlyVerified(false);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-maroon-800 text-gold-200 rounded-xl text-xs font-bold hover:bg-maroon-900 transition-colors border border-gold-500/40 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isHindi ? 'फ़िल्टर हटाएं' : 'Reset All Filters'}</span>
            </button>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 9. SOCIAL PROOF / GALLERY (Instagram-style scrolling image grid + handle callout) */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#FAF6EF] rounded-3xl border border-gold-500/40 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gold-500/20 pb-6 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-gold-700 text-xs font-extrabold uppercase tracking-wider">
                <InstagramIcon className="w-4 h-4 text-maroon-800" />
                <span>@kalakriti.heritage • #ArtisansOfBharat</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950 mt-1">
                {isHindi ? 'जीवंत कार्यशालाओं की झलक' : 'From the Hands of the Masters'}
              </h3>
              <p className="text-xs text-[#5e4a4b] mt-1">
                {isHindi
                  ? 'ग्रामीण भारत के शिल्पकारों की दैनिक साधना और पीढ़ियों की तपस्या।'
                  : 'Follow the unedited daily rhythm of pit looms, open-flame furnaces, and natural pigment brushes.'}
              </p>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-maroon-800 to-maroon-700 text-gold-200 hover:text-white border border-gold-500/40 text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-gold-400" />
              <span>{isHindi ? 'इंस्टाग्राम पर फॉलो करें' : 'Follow on Instagram'}</span>
            </a>
          </div>

          {/* 4 Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {ARTISAN_GALLERY.map((post, idx) => (
              <div
                key={idx}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-gold-500/40 shadow-xs cursor-pointer"
              >
                <img
                  src={post.image}
                  alt={post.craft}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white text-left">
                  <span className="text-[10px] uppercase tracking-wider text-gold-400 font-bold">
                    {post.location}
                  </span>
                  <h5 className="font-serif font-bold text-sm text-gold-100">
                    {post.craft}
                  </h5>
                  <p className="text-[11px] text-cream-200/90 line-clamp-2 mt-1">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
