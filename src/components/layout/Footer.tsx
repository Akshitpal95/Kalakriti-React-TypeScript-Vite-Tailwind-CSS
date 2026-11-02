import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Heart, 
  Radio, 
  Globe, 
  Layers, 
  Sparkles, 
  Send, 
  CheckCircle2
} from 'lucide-react';
import { Language } from '../../types';
import { 
  MandalaFlourish, 
  PaisleyCorner,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  LinkedinIcon
} from '../common/OrnamentalDetails';

interface FooterProps {
  language: Language;
  onOpenMargdarshak: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onOpenMargdarshak }) => {
  const isHindi = language === 'hi';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-[#460814] text-[#F5EDE0] border-t-2 border-gold-500/40 pt-16 pb-12 overflow-hidden">
      {/* Subtle Background Jali / Mandala Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-jali-dots" />
      <PaisleyCorner position="top-left" className="w-20 h-20 text-gold-400 opacity-20 -top-2 -left-2" color="#D4AF6A" />
      <PaisleyCorner position="top-right" className="w-20 h-20 text-gold-400 opacity-20 -top-2 -right-2" color="#D4AF6A" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Decorative Flourish */}
        <div className="mb-10 text-center">
          <MandalaFlourish className="w-64 h-6 text-gold-400 opacity-70" color="#D4AF6A" />
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Brand & Mission Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7A1B2E] to-[#2B040B] border border-gold-400/50 flex items-center justify-center text-2xl shadow-lg shadow-black/40 text-gold-300">
                🏺
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide block leading-none">
                  Kalakriti
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold mt-0.5 block">
                  Heritage Artisanal Guild
                </span>
              </div>
            </div>
            
            <p className="text-gold-200/80 text-xs sm:text-sm leading-relaxed max-w-sm">
              {isHindi
                ? 'भारत के पारंपरिक कारीगरों, बुनकरों और लोक कलाकारों को बिना किसी बिचौलिये के वैश्विक मंच से जोड़ने की तकनीक। आपकी हर खरीदारी भारत की जीवंत विरासत को जीवित रखती है।'
                : 'A royal confluence of generational Indian artistry and next-generation voice AI. Discover heirloom silks, lost-wax bronzes, and temple handicrafts with 100% fair artisan remuneration.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C0E1E] border border-gold-500/40 text-gold-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                {isHindi ? 'सत्यापित GI व ODOP' : 'GI Tagged & ODOP Verified'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C0E1E] border border-gold-500/40 text-gold-300 text-xs font-semibold">
                <Radio className="w-3.5 h-3.5 text-gold-400" />
                {isHindi ? 'भाषिणी बहुभाषी AI' : 'Bhashini Voice AI'}
              </span>
            </div>

            {/* Social Icons with Gold Trims */}
            <div className="pt-3 flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-[#5C0E1E] border border-gold-500/40 flex items-center justify-center text-gold-300 hover:text-white hover:border-gold-300 hover:scale-110 transition-all" title="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#5C0E1E] border border-gold-500/40 flex items-center justify-center text-gold-300 hover:text-white hover:border-gold-300 hover:scale-110 transition-all" title="YouTube">
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#5C0E1E] border border-gold-500/40 flex items-center justify-center text-gold-300 hover:text-white hover:border-gold-300 hover:scale-110 transition-all" title="X / Twitter">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#5C0E1E] border border-gold-500/40 flex items-center justify-center text-gold-300 hover:text-white hover:border-gold-300 hover:scale-110 transition-all" title="LinkedIn">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Craft Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-gold-300 font-serif font-bold text-sm sm:text-base tracking-wide uppercase border-b border-gold-500/30 pb-1.5">
              {isHindi ? 'शिल्प श्रेणियां' : 'Crafts'}
            </h4>
            <ul className="space-y-2 text-xs text-gold-200/80">
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'बनारसी व कांचीपुरम रेशम' : 'Royal Handloom Silks'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'मधुबनी व पिथोरा चित्रकला' : 'Mithila & Folk Painting'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'बस्तर ढोकरा कांस्य' : 'Bastar Lost-Wax Dhokra'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'जयपुर नीली मिट्टी बर्तन' : 'Jaipur Blue Pottery'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'सहारनपुर काष्ठ नक्काशी' : 'Saharanpur Rosewood'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'कटक तारकशी आभूषण' : 'Cuttack Silver Filigree'}
              </li>
            </ul>
          </div>

          {/* About & Support Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-gold-300 font-serif font-bold text-sm sm:text-base tracking-wide uppercase border-b border-gold-500/30 pb-1.5">
              {isHindi ? 'संस्था व सहायता' : 'Guild & Trust'}
            </h4>
            <ul className="space-y-2 text-xs text-gold-200/80">
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'हमारे शिल्पकार' : 'Master Artisans'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'पारदर्शी मूल्य नीति' : 'Ethical Pricing Formula'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'अनुदान व CSR सहयोग' : 'Artisan Grants & CSR'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'ONDC व अंतर्राष्ट्रीय निर्यात' : 'ONDC & Global Export'}
              </li>
              <li className="hover:text-gold-300 cursor-pointer transition-colors">
                {isHindi ? 'नियम व गोपनीयता' : 'Terms & Privacy Policy'}
              </li>
            </ul>
          </div>

          {/* Newsletter Signup & Desk AI (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#5C0E1E]/90 rounded-2xl p-5 border border-gold-500/40 shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-gold-300" />
                  <span>{isHindi ? 'शाही समाचार पत्रिका' : 'The Connoisseur Circle'}</span>
                </div>
                <p className="text-xs text-gold-200/90 leading-relaxed">
                  {isHindi
                    ? 'सीमित संस्करण की कृतियों, राष्ट्रीय पुरस्कार विजेता कारीगरों और नई कला प्रदर्शनी की जानकारी सीधे ईमेल पर प्राप्त करें।'
                    : 'Subscribe for private access to limited-edition heirloom releases, master artisan stories, and direct exhibition invitations.'}
                </p>

                {subscribed ? (
                  <div className="p-2.5 bg-[#460814] border border-gold-400 text-gold-300 rounded-xl text-xs flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-gold-400" />
                    <span>{isHindi ? 'धन्यवाद! आप हमारे शाही मंडल में शामिल हो चुके हैं।' : 'Thank you for joining our royal circle!'}</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={isHindi ? 'आपका ईमेल पता...' : 'Enter your email...'}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#2B040B] border border-gold-500/40 text-xs text-gold-100 placeholder:text-gold-300/40 focus:outline-none focus:border-gold-400 transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-950 font-bold text-xs hover:brightness-110 active:scale-95 shadow-md flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'जुड़ें' : 'Subscribe'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Desk AI Voice Quick Action */}
            <button
              onClick={onOpenMargdarshak}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#32050E] border border-gold-500/30 hover:border-gold-400 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500 text-maroon-950 flex items-center justify-center font-bold">
                  <Radio className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-gold-200 group-hover:text-white">
                    {isHindi ? 'मार्गदर्शक AI वॉइस हब' : 'Desk AI Voice Assistant'}
                  </span>
                  <span className="block text-[11px] text-gold-300/70">
                    {isHindi ? 'बिना लिखे बोलकर काम करें' : 'Zero-typing voice cataloging'}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-gold-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Bottom copyright and mission line */}
        <div className="border-t border-gold-500/20 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gold-300/80 gap-4">
          <p className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400" /> for Smart India Hackathon 2026 • Kalakriti
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gold-300">
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              Open Source Indian Heritage Protocol
            </span>
            <span className="text-gold-400 font-semibold">100% Direct Fair Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

