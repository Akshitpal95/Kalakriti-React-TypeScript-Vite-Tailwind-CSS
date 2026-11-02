import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause, 
  Grid, 
  Volume2, 
  VolumeX, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Users, 
  Layers, 
  ArrowRight,
  Mic,
  DollarSign,
  Share2,
  ExternalLink,
  HelpCircle,
  Clock,
  Heart,
  Store
} from 'lucide-react';
import { AnimatedMascot, MascotMood } from './AnimatedMascot';
import { MiddlemanProfitPieChart, IncomeComparisonBarGraph, DemographicDataCards } from './InteractiveCharts';
import { VoicePromptSimulator } from './VoicePromptSimulator';
import { speechService } from '../../services/speechService';
import confetti from 'canvas-confetti';

interface PitchDeckProps {
  onClose?: () => void;
  isHindi?: boolean;
}

export const PitchDeck: React.FC<PitchDeckProps> = ({ onClose, isHindi = false }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const TOTAL_SLIDES = 25;

  // Slide definitions with metadata for navigation drawer
  const SLIDE_TITLES = [
    'Title & Vision',
    'Executive Summary',
    'Who are the Creators?',
    'The 5 Core Problems',
    'Hard Data & Statistics',
    'Middleman Profit Drain (Pie)',
    'Income Multiplier (Bar Graph)',
    'Demographics & Human Impact',
    'Why Existing Tech Fails',
    'The Solution: Kalakriti',
    'Meet Kabir & Chacha Ji',
    'The 3-Step Zero-Tech Flow',
    'Example 1: Banarasi Silk Saree',
    'Example 2: Madhubani Canvas',
    'Example 3: Dhokra Bell Metal',
    'Interactive Voice Playground',
    'Vision Pricing Algorithm',
    'Global Cross-Publishing Engine',
    'Verified Artisan & GI Tagging',
    'CSR & Sponsorship Grants Hub',
    'Market Opportunity (TAM/SAM)',
    'Business Model & Economics',
    'Competitive Matrix',
    'UN SDGs & Social Impact',
    'Conclusion & Call to Action'
  ];

  // Auto-play timer (7 seconds per slide)
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isAutoPlay) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev < TOTAL_SLIDES ? prev + 1 : 1));
      }, 7500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 1));
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          toggleFullscreen();
        } else if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => console.warn(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.warn(err));
      setIsFullscreen(false);
    }
  };

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setCurrentSlide(currentSlide + 1);
    } else {
      try {
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
    }
  };

  const handlePrev = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const speakSlideTakeaway = (text: string) => {
    if (isSoundOn) {
      speechService.stopSpeaking();
      speechService.speak(text, isHindi ? 'hi-IN' : 'en-IN');
    }
  };

  // Render content per slide
  const renderSlideContent = () => {
    switch (currentSlide) {
      // -------------------------------------------------------------
      // SLIDE 1: Title & Vision
      // -------------------------------------------------------------
      case 1:
        return (
          <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-purple-200 shadow-xs">
                Smart India Hackathon 2026 • Grand Finale
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-200">
                AI for Rural Empowerment
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-black text-purple-950 tracking-tight leading-tight">
              Kalakriti
              <span className="block text-2xl sm:text-3xl font-medium text-purple-700 mt-2">
                The Voice-First AI Artisanal Talent Hub
              </span>
            </h1>

            <p className="text-base sm:text-lg text-purple-800/80 max-w-2xl leading-relaxed">
              Bridging India’s 200 Million grassroots creators and heritage craftspersons to global buyers through zero-tech voice prompting, computer vision pricing, and 1-click international cross-publishing.
            </p>

            {/* Mascot welcoming */}
            <div className="pt-2">
              <AnimatedMascot
                mood="welcome"
                size="md"
                speechText="Namaste! I am Kabir, your AI Craft Guide. Welcome to the future of artisanal empowerment!"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-purple-700">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-xs">
                🎙️ Zero-Typing Voice Interface
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-xs">
                👁️ Computer Vision Fair Wage Model
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-xs">
                🌐 Global ONDC & Etsy Sync
              </span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 2: Executive Summary
      // -------------------------------------------------------------
      case 2:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Executive Summary
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Transforming Generational Heritage into Dignified Global Livelihoods
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center text-xl font-bold">
                  ⚠️
                </div>
                <h3 className="font-bold text-base text-purple-950">The Tragedy</h3>
                <p className="text-xs sm:text-sm text-purple-800/80 leading-relaxed">
                  200 million talented creators in rural India generate billions in cultural value, yet earn less than ₹200/day due to predatory middlemen and impenetrable English-only digital apps.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
                  💡
                </div>
                <h3 className="font-bold text-base text-purple-950">The Breakthrough</h3>
                <p className="text-xs sm:text-sm text-purple-800/80 leading-relaxed">
                  Kalakriti eliminates the tech barrier completely. An artisan merely speaks 15 seconds in their mother tongue while showing a photo. AI handles pricing, story writing, and global store listings.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
                  🚀
                </div>
                <h3 className="font-bold text-base text-purple-950">The Outcome</h3>
                <p className="text-xs sm:text-sm text-purple-800/80 leading-relaxed">
                  Artisans jump from 8% value retention to 90% direct earnings. Household income surges 4x to 5x, reviving ancient craft lineages for future generations.
                </p>
              </div>
            </div>

            <div className="bg-purple-100/70 p-4 rounded-2xl border border-purple-200 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900">
                Core Philosophy: If you can talk and hold a camera, you have a global e-commerce business.
              </span>
              <span className="text-xs font-bold text-purple-700 bg-white px-3 py-1 rounded-xl shadow-xs">
                Zero Tech Friction
              </span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 3: Who are the Grassroots Creators?
      // -------------------------------------------------------------
      case 3:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Demographic Profile</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Who are India’s Grassroots Creators?
              </h2>
              <p className="text-xs sm:text-sm text-purple-700 mt-1">
                Custodians of 5,000 years of unbroken oral craft lineages spanning textiles, metallurgy, pottery, and folk art.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Handloom Silk Weavers', loc: 'Varanasi, Kanchipuram, Chanderi', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80', time: '15-40 days/piece' },
                { title: 'Dhokra Bell Metal Casters', loc: 'Bastar (Chhattisgarh), Odisha', img: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=400&q=80', time: '4,000-year lost wax' },
                { title: 'Folk Heritage Painters', loc: 'Madhubani (Bihar), Pattachitra', img: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=400&q=80', time: '100% organic dyes' },
                { title: 'Terracotta & Woodcarvers', loc: 'Gorakhpur, Channapatna, Saharanpur', img: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80', time: 'Sustainable natural clay' }
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden border border-purple-200 shadow-sm flex flex-col">
                  <div className="h-32 sm:h-36 overflow-hidden">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-purple-950">{c.title}</h4>
                      <p className="text-[11px] text-purple-600 font-medium">{c.loc}</p>
                    </div>
                    <span className="text-[10px] bg-purple-50 text-purple-800 font-bold px-2 py-0.5 rounded-md self-start border border-purple-100">
                      {c.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-200 text-xs text-purple-800 flex items-center justify-between">
              <span>Over <strong>68%</strong> are located in remote rural clusters without local access to high-paying luxury urban buyers.</span>
              <span className="font-bold text-purple-900">National Creative Wealth</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 4: The 5 Core Problems
      // -------------------------------------------------------------
      case 4:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Systematic Failures
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                The 5 Crushing Bottlenecks Facing Talented Artisans
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: '1. Predatory Middlemen Drain', desc: 'Brokers buy for ₹1,200 in villages and resell for ₹24,000 in Mumbai or New York. Up to 85% margin is stolen.', icon: '💸' },
                { title: '2. The Digital Literacy Barrier', desc: 'Standard platforms require English typing, GTIN barcodes, HSN codes, and photo studio lighting.', icon: '📱' },
                { title: '3. Distress Undervaluing', desc: 'Artisans lack price discovery. Without data on international buyer willingness-to-pay, they sell out of immediate cash hunger.', icon: '📉' },
                { title: '4. Complete Anonymity', desc: 'The master craftsperson’s name, hours, and identity are erased by commercial aggregators who relabel as their own brand.', icon: '👤' },
                { title: '5. Lineage Extinction', desc: 'Next-generation children refuse to learn weaving or sculpting because their parents cannot even afford healthcare.', icon: '⏳' },
                { title: '6. Lack of Working Capital', desc: 'Artisans cannot purchase raw silk or metal upfront, forcing them into high-interest debt cycles with moneylenders.', icon: '🏦' }
              ].map((p, idx) => (
                <div key={idx} className="bg-white p-4 sm:p-5 rounded-3xl border border-red-100 hover:border-red-300 shadow-xs space-y-2 transition-all">
                  <div className="text-2xl">{p.icon}</div>
                  <h4 className="font-bold text-xs sm:text-sm text-purple-950">{p.title}</h4>
                  <p className="text-xs text-purple-800/80 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200 text-xs text-red-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Result: India risks losing hundreds of rare craft forms within the next 15 years unless digital democracy reaches the loom.</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 5: Hard Data & Statistics
      // -------------------------------------------------------------
      case 5:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Empirical Research</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Ground Reality: Data from Indian Craft Clusters
              </h2>
            </div>

            <DemographicDataCards />

            <div className="bg-white p-5 rounded-3xl border border-purple-200 shadow-sm space-y-2">
              <h4 className="font-bold text-sm text-purple-950 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                The Wage Discrepancy Paradox
              </h4>
              <p className="text-xs text-purple-800 leading-relaxed">
                An unskilled construction worker in Delhi earns ₹550-₹700 per day. Meanwhile, a master handloom weaver with 35 years of generational expertise creating GI-tagged silk textiles earns an effective average of just <strong>₹180 - ₹240 per day</strong> due to middlemen dominance.
              </p>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 6: Middleman Profit Drain (Interactive Pie Chart)
      // -------------------------------------------------------------
      case 6:
        return (
          <div className="h-full flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Comparative Value Analysis</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Middleman Profit Drain: The 82% Wealth Leakage
              </h2>
            </div>
            <div className="flex-1">
              <MiddlemanProfitPieChart />
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 7: Income Multiplier (Interactive Bar Graph)
      // -------------------------------------------------------------
      case 7:
        return (
          <div className="h-full flex flex-col">
            <div className="mb-4">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Measurable Economic Uplift</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Income Multiplier: 4.8x to 5.2x Net Revenue Growth
              </h2>
            </div>
            <div className="flex-1">
              <IncomeComparisonBarGraph />
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 8: Demographics & Human Impact
      // -------------------------------------------------------------
      case 8:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Human Impact</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Who Bears the Heaviest Burden?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <span className="text-3xl">👩🏽‍🎨</span>
                <h3 className="font-bold text-base text-purple-950">Rural Women Artisans</h3>
                <p className="text-xs sm:text-sm text-purple-800/80 leading-relaxed">
                  56% of artisans are women working from courtyards between domestic chores. They face zero mobility to visit distant city bazaars, making them completely vulnerable to travelling brokers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <span className="text-3xl">👴🏽</span>
                <h3 className="font-bold text-base text-purple-950">Aging Craft Gurus</h3>
                <p className="text-xs sm:text-sm text-purple-800/80 leading-relaxed">
                  Elderly masters possess incredible oral wisdom and sacred geometric formulas, but zero ability to read English or type passwords. When they pass away, the craft formula dies with them.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <span className="text-3xl">👦🏽</span>
                <h3 className="font-bold text-base text-purple-950">Disillusioned Youth</h3>
                <p className="text-xs sm:text-sm text-purple-800/80 leading-relaxed">
                  Artisan children leave hereditary looms to work as low-wage delivery riders or security guards because society fails to provide dignified financial returns for master craftsmanship.
                </p>
              </div>
            </div>

            <div className="bg-purple-100/70 p-4 rounded-2xl border border-purple-200 flex items-center justify-between text-xs font-semibold text-purple-900">
              <span>Kalakriti’s voice-first UX brings the power of digital commerce directly to the village veranda.</span>
              <span className="bg-purple-600 text-white px-3 py-1 rounded-xl">Gender & Generational Equity</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 9: Why Conventional E-Commerce Fails
      // -------------------------------------------------------------
      case 9:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Friction Analysis</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Why Standard E-Commerce (Amazon, Etsy, Shopify) Fails Them
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-purple-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-purple-100/80 text-purple-950 font-bold border-b border-purple-200">
                  <tr>
                    <th className="p-3.5">E-Commerce Requirement</th>
                    <th className="p-3.5 text-red-700">Conventional Apps (Amazon / Etsy)</th>
                    <th className="p-3.5 text-emerald-800">Kalakriti AI Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100 text-purple-900">
                  <tr>
                    <td className="p-3 font-semibold">User Interface</td>
                    <td className="p-3 text-red-600">Complex forms with 45+ English text fields</td>
                    <td className="p-3 text-emerald-700 font-bold">100% Vernacular Voice Dialogue (Bhashini)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Product Description</td>
                    <td className="p-3 text-red-600">Requires SEO English copywriting</td>
                    <td className="p-3 text-emerald-700 font-bold">Auto-generated in English & Hindi from spoken notes</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Pricing Strategy</td>
                    <td className="p-3 text-red-600">Manual guesswork; price competition race-to-bottom</td>
                    <td className="p-3 text-emerald-700 font-bold">Computer Vision Fair Wage & Etsy Benchmark engine</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Barcodes / UPC</td>
                    <td className="p-3 text-red-600">Mandatory GTIN / EAN barcode purchase ($30 each)</td>
                    <td className="p-3 text-emerald-700 font-bold">Zero barcodes needed; auto GI/ODOP SKU tagging</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Commissions & Fees</td>
                    <td className="p-3 text-red-600">25% - 35% commission + listing fees</td>
                    <td className="p-3 text-emerald-700 font-bold">Flat 4% - 6% platform sustainability fee</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-medium">
              Conclusion: Traditional e-commerce was engineered for urban corporate sellers, not 60-year-old rural handloom weavers. Kalakriti rewrites the rules from scratch.
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 10: The Solution: Kalakriti
      // -------------------------------------------------------------
      case 10:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> The Solution Architecture
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Kalakriti: Zero-Friction AI Platform Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-gradient-to-b from-purple-50 to-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-bold text-base text-purple-950">Margdarshak Voice AI</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Powered by Bhashini ULCA & Whisper. Speaks Hindi, Bengali, Tamil, Bhojpuri, and Marathi. Listens to artisan stories and crafts bio & listings automatically.
                </p>
              </div>

              <div className="bg-gradient-to-b from-purple-50 to-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-bold text-base text-purple-950">Vision Pricing Engine</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Computer vision scans weave density, metal alloys, pigments, and calculates fair hourly wages, protecting artisans from distress selling.
                </p>
              </div>

              <div className="bg-gradient-to-b from-purple-50 to-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-bold text-base text-purple-950">Global Sync & ONDC Bridge</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  1-Click publication to India’s Open Network for Digital Commerce (ONDC), Etsy Global, Shopify, and social WhatsApp commerce simultaneously.
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-purple-200 flex items-center justify-between text-xs text-purple-900 font-semibold">
              <span>Result: An illiterate artisan can publish a luxury international listing in under <strong>60 seconds</strong>.</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl">Verified Protocol</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 11: Meet Kabir & Chacha Ji (Interactive Mascot)
      // -------------------------------------------------------------
      case 11:
        return (
          <div className="h-full flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">User Personas</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Meet Chacha Ramkishan & Kabir (AI Companion)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 flex flex-col items-center">
                <AnimatedMascot
                  mood="excited"
                  size="lg"
                  speechText="Namaste! Ramkishan Chacha is 58 and weaves Banarasi silks. He doesn't know English or CSV files. He simply talks to me!"
                />
              </div>

              <div className="md:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-purple-200 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl">
                    👴🏽
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-purple-950">Ramkishan Vishwakarma</h3>
                    <p className="text-xs text-purple-600">Master Handloom Silk Weaver • Varanasi, Uttar Pradesh</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-purple-800 leading-relaxed">
                  <p>
                    <strong>Generational Mastery:</strong> 32 years on generational pit looms, weaving intricate Kadhwa brocades.
                  </p>
                  <p>
                    <strong>Before Kalakriti:</strong> Sold sarees to wholesale agents for ₹4,500 that were later sold in luxury boutique stores for ₹24,000.
                  </p>
                  <p>
                    <strong>With Kalakriti:</strong> Chacha holds up his saree, clicks the microphone, and speaks: <em>"Yeh pure mulberry silk saree hai, 28 din lage..."</em>. In 30 seconds, his saree is listed globally on ONDC and Etsy for ₹16,500!
                  </p>
                </div>

                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between text-xs font-bold text-purple-900">
                  <span>Direct Take-Home Increase:</span>
                  <span className="text-emerald-700 text-sm font-black">+₹12,000 per saree</span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-purple-600 font-medium">
              Human-centric AI designed for high emotional empathy and zero intimidation.
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 12: The 3-Step Zero-Tech Flow
      // -------------------------------------------------------------
      case 12:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">User Experience Journey</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                The 3-Step Zero-Friction Flow
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-md space-y-3 relative group">
                <span className="text-4xl">📸</span>
                <span className="absolute top-4 right-4 bg-purple-100 text-purple-800 font-black text-xs px-2.5 py-1 rounded-full">
                  Step 1
                </span>
                <h3 className="font-bold text-base text-purple-950">Snap & Speak</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Artisan takes a photo of the finished craft and taps the microphone to speak for 15-30 seconds in their native dialect (Hindi, Awadhi, Tamil, Bhojpuri).
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-md space-y-3 relative group">
                <span className="text-4xl">⚡</span>
                <span className="absolute top-4 right-4 bg-purple-100 text-purple-800 font-black text-xs px-2.5 py-1 rounded-full">
                  Step 2
                </span>
                <h3 className="font-bold text-base text-purple-950">AI Vision & Fair Pricing</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Computer vision classifies weave patterns, metal alloys, pigments, and calculates fair hourly wages based on verified craftsmanship benchmarks.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-md space-y-3 relative group">
                <span className="text-4xl">🌍</span>
                <span className="absolute top-4 right-4 bg-purple-100 text-purple-800 font-black text-xs px-2.5 py-1 rounded-full">
                  Step 3
                </span>
                <h3 className="font-bold text-base text-purple-950">1-Click Global Sync</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Product automatically syncs to ONDC, Etsy (with USD pricing), and Kalakriti Verified Marketplace. Orders arrive directly on the artisan’s phone!
                </p>
              </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-2xl border border-purple-200 flex items-center justify-between text-xs text-purple-900 font-bold">
              <span>Total Time Required: Less than 60 seconds</span>
              <span className="text-purple-700">100% Mobile Smartphone Friendly</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 13: Example 1: Banarasi Silk Saree
      // -------------------------------------------------------------
      case 13:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Product In Action • Handloom</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Example 1: Banarasi Kadhwa Pure Silk Saree
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-6 rounded-3xl border border-purple-200 shadow-md">
              <div className="md:col-span-5 aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                  alt="Banarasi Silk Saree"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900">
                  <span className="font-bold block mb-1">Artisan's Spoken Hindi Notes:</span>
                  <em>"Yeh 100% shuddh Mulberry silk aur asli sonahari zari border wali saree hai. Pit loom par 28 din me bani hai."</em>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Material</span>
                    <span className="font-bold text-purple-950">Pure Mulberry Silk & Zari</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Labor Hours</span>
                    <span className="font-bold text-purple-950">196 Craft Hours</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Fair Domestic Price</span>
                    <span className="font-bold text-purple-950 text-base">₹16,500 INR</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-emerald-600 block text-[10px] uppercase font-bold">Etsy Global Benchmark</span>
                    <span className="font-bold text-emerald-700 text-base">$280 USD</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Traditional Middleman Price: ₹4,500</span>
                  <span className="text-emerald-700 font-black text-sm">+266% Artisan Profit Surge</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-purple-700 font-medium">
              GI Tag Verification: Varanasi Handloom Silk (GI Registered ODOP-UP-01).
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 14: Example 2: Madhubani Canvas
      // -------------------------------------------------------------
      case 14:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Product In Action • Folk Art</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Example 2: GI-Certified Madhubani Tree of Life
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-6 rounded-3xl border border-purple-200 shadow-md">
              <div className="md:col-span-5 aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                  alt="Madhubani Folk Art"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900">
                  <span className="font-bold block mb-1">Artisan's Spoken Hindi Notes:</span>
                  <em>"Yeh handmade cotton paper par neem ki kalam aur haldi, neel ke prakritik rango se banaya gaya Madhubani chitra hai."</em>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Technique</span>
                    <span className="font-bold text-purple-950">Kachni & Bharni Line Work</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Labor Hours</span>
                    <span className="font-bold text-purple-950">84 Craft Hours</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Fair Domestic Price</span>
                    <span className="font-bold text-purple-950 text-base">₹7,800 INR</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-emerald-600 block text-[10px] uppercase font-bold">Etsy Global Benchmark</span>
                    <span className="font-bold text-emerald-700 text-base">$135 USD</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Traditional Village Sale: ₹1,200</span>
                  <span className="text-emerald-700 font-black text-sm">6.5x Revenue Multiple</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-purple-700 font-medium">
              100% Certified organic plant pigments with digital tamper-proof provenance certificate.
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 15: Example 3: Dhokra Bell Metal
      // -------------------------------------------------------------
      case 15:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Product In Action • Ancient Metallurgy</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Example 3: Bastar Lost-Wax Cast Dhokra Sculpture
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-6 rounded-3xl border border-purple-200 shadow-md">
              <div className="md:col-span-5 aspect-4/3 rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80"
                  alt="Bastar Dhokra Sculpture"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-900">
                  <span className="font-bold block mb-1">Artisan's Spoken Hindi Notes:</span>
                  <em>"Yeh 4000 saal purani lost-wax dhokra vidhi se bana Chhattisgarh Bastar ka pital murti hai. Vajan 1.8 kilo hai."</em>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Alloy Composition</span>
                    <span className="font-bold text-purple-950">Bell Metal & Beeswax Mould</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Labor Hours</span>
                    <span className="font-bold text-purple-950">48 Craft Hours</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-purple-600 block text-[10px] uppercase font-bold">Fair Domestic Price</span>
                    <span className="font-bold text-purple-950 text-base">₹4,200 INR</span>
                  </div>
                  <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <span className="text-emerald-600 block text-[10px] uppercase font-bold">Etsy Global Benchmark</span>
                    <span className="font-bold text-emerald-700 text-base">$95 USD</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center justify-between">
                  <span>Traditional Middleman Price: ₹900</span>
                  <span className="text-emerald-700 font-black text-sm">4.6x Take-Home Surge</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-purple-700 font-medium">
              Ancient heritage dating back to Mohenjo-daro Dancing Girl lineage.
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 16: Interactive Voice & Typing Prompt Playground
      // -------------------------------------------------------------
      case 16:
        return (
          <div className="h-full flex flex-col justify-between">
            <div className="flex-1">
              <VoicePromptSimulator />
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 17: The Vision Pricing Algorithm
      // -------------------------------------------------------------
      case 17:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Algorithmic Transparency</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                The Vision Pricing Engine: How Fair Wages are Guaranteed
              </h2>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-md space-y-4">
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 font-mono text-xs sm:text-sm text-purple-950 text-center">
                Fair Price = Raw Materials + (Craft Hours × Benchmark Hourly Wage) + Artisan Margin (25%)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
                  <h4 className="font-bold text-xs text-purple-950">1. Material Cost Extraction</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    AI analyzes thread count, weight, and metal alloys against real-time wholesale commodity benchmarks.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
                  <h4 className="font-bold text-xs text-purple-950">2. Living Wage Benchmark</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    Guarantees minimum ₹50-₹75/hour wage, doubling statutory minimum rural wages to honor heritage craft time.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-1">
                  <h4 className="font-bold text-xs text-purple-950">3. Global Arbitrage Engine</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    Scrapes and benchmarks comparable artisanal listings on Etsy and 1stDibs to unlock international luxury pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-900 font-bold">
              <span>Eliminates subjective buyer haggling & distress seller pressure completely.</span>
              <span className="text-emerald-800">Ethical AI in Action</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 18: Global Cross-Publishing Engine
      // -------------------------------------------------------------
      case 18:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Multi-Channel Reach</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                1-Click Multi-Channel Cross-Publishing
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="text-3xl">🇮🇳</div>
                <h3 className="font-bold text-base text-purple-950">ONDC (Open Network)</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Direct connection to India’s Open Network for Digital Commerce. Products immediately become discoverable on buyer apps like Paytm, Pincode, Mystore, and Tata Neu.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="text-3xl">🗽</div>
                <h3 className="font-bold text-base text-purple-950">Etsy Global Export</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Automatic currency conversion to USD, custom export SEO tags, and international luxury craft categorization matching US and European search volume.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="text-3xl">💬</div>
                <h3 className="font-bold text-base text-purple-950">Shopify & WhatsApp Commerce</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Generates ready-to-share WhatsApp product catalog cards with UPI payment links for local Indian buyers and social selling.
                </p>
              </div>
            </div>

            <div className="bg-purple-100/80 p-4 rounded-2xl border border-purple-200 text-xs font-bold text-purple-900 flex items-center justify-between">
              <span>One single voice prompt creates listings across 4 massive distribution networks simultaneously.</span>
              <span className="bg-white px-3 py-1 rounded-xl text-purple-700">Zero Inventory Waste</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 19: Verified Artisan & GI Tagging
      // -------------------------------------------------------------
      case 19:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Provenance & Authenticity</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Verified Artisan Trust Protocol & ODOP / GI Tagging
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-purple-950">Govt Pehchan & ODOP Verification</h3>
                <p className="text-xs text-purple-850 leading-relaxed">
                  Integrates with Ministry of Textiles 'Pehchan' Artisan ID card numbers and One District One Product (ODOP) geographic databases to prevent mill-made counterfeit products from cheating buyers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-purple-950">Living Artisan Story Capsule</h3>
                <p className="text-xs text-purple-850 leading-relaxed">
                  Every product listing includes an authentic audio snippet of the artisan speaking in their own voice, with photo verification of their village loom or pottery wheel, creating deep emotional connection.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs text-purple-900 font-semibold flex items-center justify-between">
              <span>Guarantees to international conscious consumers: 100% genuine handmade, zero sweatshop exploitation.</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl font-bold">Verified Heritage</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 20: CSR & Sponsorship Grants Hub
      // -------------------------------------------------------------
      case 20:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-forest-700 uppercase tracking-wider">Non-Dilutive Capital</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Direct CSR & Corporate Sponsorship Hub
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="text-3xl">☀️</div>
                <h3 className="font-bold text-base text-purple-950">Solar Loom Subsidies</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Corporates fund solar-powered jacquard cards and motor conversions, allowing weavers to work despite frequent rural power outages.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="text-3xl">🧵</div>
                <h3 className="font-bold text-base text-purple-950">Bulk Raw Material Grants</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Direct micro-grants for purchasing mulberry silk hanks, brass bell metal, or organic herbal dyes without moneylender debts.
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-sm space-y-3">
                <div className="text-3xl">🛡️</div>
                <h3 className="font-bold text-base text-purple-950">100% Milestone Tracking</h3>
                <p className="text-xs text-purple-800 leading-relaxed">
                  Companies receive photographic and geo-tagged proof of grant utilization, fulfilling mandatory Indian CSR Section 135 compliance.
                </p>
              </div>
            </div>

            <div className="bg-forest-50 p-4 rounded-2xl border border-forest-200 text-xs text-forest-900 font-bold flex items-center justify-between">
              <span>Over ₹28,000 Crores spent annually in Indian CSR; Kalakriti connects this capital directly to the village loom.</span>
              <span className="bg-forest-600 text-white px-3 py-1 rounded-xl">Zero Leakage</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 21: Market Opportunity (TAM/SAM/SOM)
      // -------------------------------------------------------------
      case 21:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Market Sizing</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Massive Underserved Market Opportunity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-200 shadow-sm space-y-2">
                <span className="text-xs uppercase font-bold text-purple-600">Total Addressable Market</span>
                <div className="font-serif text-3xl sm:text-4xl font-black text-purple-950">$752 Billion</div>
                <p className="text-xs text-purple-700">Global Handicrafts & Slow Artisanal Goods Market (Growing at 11.8% CAGR).</p>
              </div>

              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-200 shadow-sm space-y-2">
                <span className="text-xs uppercase font-bold text-purple-600">Serviceable Addressable Market</span>
                <div className="font-serif text-3xl sm:text-4xl font-black text-purple-950">$32.2 Billion</div>
                <p className="text-xs text-purple-700">Indian Traditional Handloom & Handicrafts Ecosystem across registered and unorganized clusters.</p>
              </div>

              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-purple-200 shadow-sm space-y-2">
                <span className="text-xs uppercase font-bold text-emerald-600">Serviceable Obtainable Market</span>
                <div className="font-serif text-3xl sm:text-4xl font-black text-emerald-700">$180 Million</div>
                <p className="text-xs text-purple-700">Kalakriti 3-Year Target GMV across 500,000 verified onboarded master artisans.</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs text-purple-900 font-semibold flex items-center justify-between">
              <span>Rapid Tailwinds: Rising global demand for ethical slow fashion, organic non-plastic home decor, and authentic cultural provenance.</span>
              <span className="font-bold text-purple-950">Massive Scale Potential</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 22: Business Model & Economics
      // -------------------------------------------------------------
      case 22:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Sustainable Revenue Streams</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Ethical Monetization & Unit Economics
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '1. Transparent Commission', pct: '4% - 6%', desc: 'Charged only on successful sales (vs 25-35% on legacy platforms).', icon: '💳' },
                { title: '2. Cross-Border Export Hub', pct: '5% - 8%', desc: 'Logistics fulfillment, international currency hedging, customs clearance packaging.', icon: '✈️' },
                { title: '3. Corporate Gifting Concierge', pct: '12% Margin', desc: 'Curated artisanal hampers for Diwali, corporate summits, and diplomatic delegates.', icon: '🎁' },
                { title: '4. CSR Grant Matchmaking', pct: '2.5% Fee', desc: 'Compliance verification and transparent impact reporting for corporate CSR foundations.', icon: '🤝' }
              ].map((b, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-purple-200 shadow-sm space-y-2">
                  <span className="text-2xl">{b.icon}</span>
                  <div className="text-lg font-black text-purple-950">{b.pct}</div>
                  <h4 className="font-bold text-xs text-purple-900">{b.title}</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-purple-100 p-4 rounded-2xl border border-purple-200 text-xs text-purple-900 font-bold flex items-center justify-between">
              <span>High capital efficiency: Cloud infrastructure costs scale linearly while artisan lifetime value expands rapidly.</span>
              <span className="bg-purple-700 text-white px-3 py-1 rounded-xl">Profitable & Ethical</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 23: Competitive Matrix
      // -------------------------------------------------------------
      case 23:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Market Positioning</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Competitive Matrix: Why Kalakriti Wins
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-purple-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-purple-100/80 text-purple-950 font-bold border-b border-purple-200">
                  <tr>
                    <th className="p-3">Capability / Feature</th>
                    <th className="p-3 text-purple-900">Middlemen Traders</th>
                    <th className="p-3 text-purple-900">Amazon / Etsy</th>
                    <th className="p-3 text-purple-900">Govt e-Portals</th>
                    <th className="p-3 text-emerald-800 font-black">Kalakriti AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-100 text-purple-900">
                  <tr>
                    <td className="p-2.5 font-semibold">Native Voice-First Selling</td>
                    <td className="p-2.5 text-red-600">❌ In-person only</td>
                    <td className="p-2.5 text-red-600">❌ English typing</td>
                    <td className="p-2.5 text-red-600">❌ Rigid web forms</td>
                    <td className="p-2.5 text-emerald-700 font-bold">✅ 100% Vernacular Voice</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">Fair Wage Protection</td>
                    <td className="p-2.5 text-red-600">❌ Exploitative</td>
                    <td className="p-2.5 text-red-600">❌ Race to bottom</td>
                    <td className="p-2.5 text-amber-600">⚠️ Partial</td>
                    <td className="p-2.5 text-emerald-700 font-bold">✅ Algorithmic Guarantee</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">Multi-Channel ONDC Sync</td>
                    <td className="p-2.5 text-red-600">❌ None</td>
                    <td className="p-2.5 text-red-600">❌ Walled garden</td>
                    <td className="p-2.5 text-red-600">❌ Isolated</td>
                    <td className="p-2.5 text-emerald-700 font-bold">✅ 1-Click Multi-Publish</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">Artisan Value Retention</td>
                    <td className="p-2.5 text-red-600">8% - 15%</td>
                    <td className="p-2.5 text-amber-600">65% - 75%</td>
                    <td className="p-2.5 text-purple-700">75% - 80%</td>
                    <td className="p-2.5 text-emerald-700 font-bold">90% Direct Pay</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold">CSR Grant Integration</td>
                    <td className="p-2.5 text-red-600">❌ Zero</td>
                    <td className="p-2.5 text-red-600">❌ Zero</td>
                    <td className="p-2.5 text-amber-600">⚠️ Slow bureaucracy</td>
                    <td className="p-2.5 text-emerald-700 font-bold">✅ Instant Micro-Grants</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-xs text-purple-700 font-medium">
              Kalakriti isn’t just another store; it’s an empowering infrastructure utility for rural creators.
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 24: UN SDGs & Social Impact
      // -------------------------------------------------------------
      case 24:
        return (
          <div className="space-y-6 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Social Impact Framework</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-purple-950">
                Alignment with UN Sustainable Development Goals (SDGs)
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-red-200 shadow-sm space-y-2">
                <span className="bg-red-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full inline-block">
                  SDG 1
                </span>
                <h4 className="font-bold text-sm text-purple-950">No Poverty</h4>
                <p className="text-xs text-purple-700 leading-relaxed">
                  Tripling average daily earnings from ₹180 to ₹700+, lifting rural artisan families permanently above the poverty line.
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-pink-200 shadow-sm space-y-2">
                <span className="bg-pink-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full inline-block">
                  SDG 5
                </span>
                <h4 className="font-bold text-sm text-purple-950">Gender Equality</h4>
                <p className="text-xs text-purple-700 leading-relaxed">
                  Empowering 56% women artisans with direct digital bank accounts, financial autonomy, and dignified leadership.
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-amber-200 shadow-sm space-y-2">
                <span className="bg-amber-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full inline-block">
                  SDG 8
                </span>
                <h4 className="font-bold text-sm text-purple-950">Decent Work</h4>
                <p className="text-xs text-purple-700 leading-relaxed">
                  Preventing distress migration of rural youth to urban slums by establishing viable, dignified heritage careers.
                </p>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-sm space-y-2">
                <span className="bg-emerald-500 text-white font-black text-xs px-2.5 py-0.5 rounded-full inline-block">
                  SDG 12
                </span>
                <h4 className="font-bold text-sm text-purple-950">Responsible Craft</h4>
                <p className="text-xs text-purple-700 leading-relaxed">
                  100% natural, biodegradable, and sustainable non-plastic craft products supporting planetary ecological health.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs text-purple-900 font-bold flex items-center justify-between">
              <span>Measurable ESG metrics for institutional investors, global philanthropies, and corporate sponsors.</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-xl">Global Impact</span>
            </div>
          </div>
        );

      // -------------------------------------------------------------
      // SLIDE 25: Conclusion & Call to Action
      // -------------------------------------------------------------
      case 25:
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto space-y-6">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
              The Path Forward • SIH 2026
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-purple-950 tracking-tight leading-tight">
              Preserving Our Ancient Heritage.
              <span className="block text-purple-600 mt-1">Empowering India's Creators.</span>
            </h2>

            <p className="text-sm sm:text-base text-purple-800/90 max-w-2xl leading-relaxed">
              Kalakriti is not just an e-commerce platform; it is a digital lifeline that protects 5,000 years of civilization craft mastery by arming grassroots creators with the superpower of artificial intelligence.
            </p>

            <div className="py-1">
              <AnimatedMascot
                mood="celebrating"
                size="md"
                speechText="Thank you for believing in India's talented artisans! Together, let us make every loom sing with prosperity."
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  try {
                    confetti({ particleCount: 160, spread: 100, origin: { y: 0.6 } });
                  } catch (e) {}
                  if (onClose) onClose();
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-bold text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Store className="w-4 h-4" />
                <span>Launch & Test Live Kalakriti Portal</span>
              </button>

              <button
                onClick={() => setCurrentSlide(1)}
                className="px-5 py-3.5 bg-white text-purple-800 border border-purple-200 hover:bg-purple-50 font-bold text-sm rounded-2xl shadow-sm transition-all"
              >
                Restart Presentation
              </button>
            </div>

            <div className="text-xs text-purple-600 font-medium">
              Designed & Built with ❤️ for Bharat's Heritage Creators • SIH 2026
            </div>
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col bg-[#F5EDE0] text-maroon-950 select-none transition-all ${
        isFullscreen ? 'p-0' : 'p-2 sm:p-4'
      }`}
    >
      {/* Outer Shell Card */}
      <div className="flex-1 flex flex-col bg-[#FAF6EF] rounded-3xl border border-gold-300/60 shadow-2xl overflow-hidden relative">
        {/* Top Control Bar */}
        <header className="h-16 px-4 sm:px-6 bg-gradient-to-r from-maroon-950 via-maroon-900 to-maroon-950 backdrop-blur-md border-b border-gold-400/30 flex items-center justify-between shrink-0">
          {/* Left: Brand & Slide Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-400/15 border border-gold-400/40 text-gold-300 flex items-center justify-center text-lg shadow-sm">
              🏺
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm sm:text-base text-white">
                  Kalakriti Pitch Deck
                </span>
                <span className="bg-gradient-to-r from-gold-400 to-gold-500 text-maroon-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full font-serif shadow-xs">
                  Slide {currentSlide} of {TOTAL_SLIDES}
                </span>
              </div>
              <p className="text-[11px] text-gold-200/90 font-medium hidden sm:block font-sans">
                {SLIDE_TITLES[currentSlide - 1]}
              </p>
            </div>
          </div>

          {/* Center: Top Progress Bar */}
          <div className="hidden md:flex flex-col items-center w-56 space-y-1">
            <div className="w-full bg-maroon-950/80 h-1.5 rounded-full overflow-hidden border border-gold-400/20">
              <div
                className="bg-gradient-to-r from-gold-500 to-gold-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentSlide / TOTAL_SLIDES) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-gold-300 font-semibold font-serif">
              {Math.round((currentSlide / TOTAL_SLIDES) * 100)}% Completed
            </span>
          </div>

          {/* Right: Presentation Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Auto Play Toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`p-2 rounded-xl text-xs font-serif font-bold transition-all flex items-center gap-1.5 border ${
                isAutoPlay
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 shadow-xs border-gold-300'
                  : 'bg-maroon-900/70 text-gold-200 hover:bg-maroon-850 border-gold-400/30'
              }`}
              title={isAutoPlay ? 'Pause Slideshow' : 'Play Slideshow (Auto 7.5s)'}
            >
              {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isAutoPlay ? 'Playing' : 'Auto'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="p-2 bg-maroon-900/70 text-gold-200 hover:bg-maroon-850 border border-gold-400/30 rounded-xl transition-all"
              title={isSoundOn ? 'Mute Kabir Voice' : 'Enable Voice'}
            >
              {isSoundOn ? <Volume2 className="w-3.5 h-3.5 text-gold-400" /> : <VolumeX className="w-3.5 h-3.5 text-gold-400/60" />}
            </button>

            {/* Slide Drawer Toggle */}
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className={`p-2 rounded-xl transition-all border ${
                isDrawerOpen
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 border-gold-300'
                  : 'bg-maroon-900/70 text-gold-200 hover:bg-maroon-850 border border-gold-400/30'
              }`}
              title="Slide Navigator (All 25 Slides)"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-maroon-900/70 text-gold-200 hover:bg-maroon-850 border border-gold-400/30 rounded-xl transition-all hidden sm:block"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Close Deck Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-gold-500/20 hover:bg-gold-500/30 text-gold-200 text-xs font-serif font-bold rounded-xl transition-all ml-1 border border-gold-400/40"
              >
                Back to Portal
              </button>
            )}
          </div>
        </header>

        {/* Main Slide Canvas */}
        <div className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto relative bg-[#FAF6EF]">
          {renderSlideContent()}
        </div>

        {/* Bottom Slide Navigation Bar */}
        <footer className="h-16 px-4 sm:px-6 bg-white border-t border-gold-300/60 flex items-center justify-between shrink-0 shadow-sm">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 1}
            className="flex items-center gap-2 px-4 py-2 bg-cream-100 hover:bg-cream-200 disabled:opacity-40 disabled:pointer-events-none text-maroon-950 font-serif font-bold text-xs sm:text-sm rounded-2xl border border-gold-300/60 transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 text-maroon-950" />
            <span>Previous</span>
          </button>

          {/* Quick Jump Dots (Visible on larger screens) */}
          <div className="hidden lg:flex items-center gap-1 max-w-md overflow-x-auto py-1">
            {Array.from({ length: TOTAL_SLIDES }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx + 1)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx + 1
                    ? 'w-6 bg-gold-600'
                    : 'w-2 bg-cream-300 hover:bg-gold-400'
                }`}
                title={`Go to Slide ${idx + 1}: ${SLIDE_TITLES[idx]}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-maroon-800 font-medium hidden sm:inline font-sans">
              Use arrow keys <kbd className="bg-cream-200 border border-gold-300/40 px-1.5 py-0.5 rounded text-[10px] text-maroon-950">←</kbd> <kbd className="bg-cream-200 border border-gold-300/40 px-1.5 py-0.5 rounded text-[10px] text-maroon-950">→</kbd>
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 font-serif font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 border border-gold-300"
            >
              <span>{currentSlide === TOTAL_SLIDES ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-4 h-4 text-maroon-950" />
            </button>
          </div>
        </footer>

        {/* Slide Selector Drawer Modal */}
        {isDrawerOpen && (
          <div className="absolute inset-0 z-50 bg-maroon-950/80 backdrop-blur-md p-4 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-gold-400/30 text-white">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">Jump to Any Slide (1 - 25)</h3>
                <p className="text-xs text-gold-200/90 font-sans">Select any topic to jump directly</p>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 bg-maroon-900 hover:bg-maroon-800 text-gold-300 text-xs font-serif font-bold rounded-xl border border-gold-400/30"
              >
                Close Drawer
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {SLIDE_TITLES.map((title, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx + 1);
                    setIsDrawerOpen(false);
                  }}
                  className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between h-24 ${
                    currentSlide === idx + 1
                      ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 border-gold-300 shadow-lg ring-2 ring-gold-400'
                      : 'bg-maroon-900/60 text-gold-200 hover:bg-maroon-850 border-gold-400/20'
                  }`}
                >
                  <span className="text-xs font-serif font-black opacity-85">#{idx + 1}</span>
                  <span className="text-xs font-serif font-bold leading-tight">{title}</span>
                </button>
              ))}
            </div>

            <div className="text-center text-xs text-gold-300/80 pt-2 border-t border-gold-400/20 font-serif">
              Kalakriti • Smart India Hackathon 2026 Presentation System
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
