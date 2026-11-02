import React, { useState } from 'react';
import { 
  Sparkles, 
  Mic, 
  ShoppingBag, 
  PlusCircle, 
  User, 
  Award, 
  Languages, 
  Settings, 
  ShieldCheck, 
  Presentation,
  Key,
  X
} from 'lucide-react';
import { Language, Artisan } from '../../types';

interface NavbarProps {
  currentTab: 'marketplace' | 'catalog' | 'profile' | 'sponsorships' | 'presentation';
  setCurrentTab: (tab: 'marketplace' | 'catalog' | 'profile' | 'sponsorships' | 'presentation') => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenMargdarshak: () => void;
  onOpenSettings: () => void;
  activeArtisan: Artisan;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onOpenMargdarshak,
  onOpenSettings,
  activeArtisan
}) => {
  const isHindi = language === 'hi';
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#5C0E1E]/95 backdrop-blur-md border-b border-gold-500/30 shadow-lg shadow-maroon-950/20 transition-all w-full max-w-full">
      {/* Top micro-announcement banner in deep wine */}
      <div className="w-full bg-[#460814] text-gold-300 border-b border-gold-500/20 text-xs py-1.5 px-3 sm:px-4 text-center font-medium flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span className="truncate max-w-[240px] xs:max-w-none text-gold-200">
            {isHindi 
              ? 'भारत के हस्तशिल्पियों और बुनकरों के लिए समर्पित: Desk AI द्वारा संचालित' 
              : 'Dedicated to India’s Heritage Artisans: Powered by Desk AI'}
          </span>
        </div>
        <button
          onClick={() => setCurrentTab('presentation')}
          className="bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-maroon-950 px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold shadow-sm transition-transform active:scale-95 flex items-center gap-1 cursor-pointer flex-shrink-0"
        >
          <Presentation className="w-3 h-3 text-maroon-950" />
          <span>{isHindi ? '25 स्लाइड्स प्रेजेंटेशन' : '25-Slide Pitch Deck'}</span>
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-3">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setCurrentTab('marketplace')} 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none flex-shrink-0 min-w-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#7A1B2E] to-[#460814] border border-gold-400/50 flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-maroon-950/50 group-hover:scale-105 group-hover:border-gold-300 transition-transform flex-shrink-0">
              🏺
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  Kalakriti
                </span>
                <span className="hidden sm:inline-block bg-[#460814] text-gold-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-gold-500/30 leading-none">
                  Artisan Hub
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gold-200/80 font-medium mt-0.5 sm:mt-1 leading-none truncate">
                {isHindi ? 'कलाकृति AI • शिल्पकार बाज़ार' : 'Kalakriti AI • Artisan Marketplace'}
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Desktop & Large screens) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-[#460814]/75 p-1 rounded-2xl border border-gold-500/30 flex-shrink-0 shadow-inner">
            <button
              onClick={() => setCurrentTab('marketplace')}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all h-9 ${
                currentTab === 'marketplace'
                  ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-950 shadow-md font-bold'
                  : 'text-gold-200 hover:text-white hover:bg-maroon-700/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4 flex-shrink-0" />
              <span>{isHindi ? 'कारीगरी बाज़ार' : 'Marketplace'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('catalog')}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all h-9 ${
                currentTab === 'catalog'
                  ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-950 shadow-md font-bold'
                  : 'text-gold-200 hover:text-white hover:bg-maroon-700/50'
              }`}
            >
              <PlusCircle className="w-4 h-4 flex-shrink-0" />
              <span>{isHindi ? 'उत्पाद जोड़ें' : 'Add Product'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('profile')}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all h-9 ${
                currentTab === 'profile'
                  ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-950 shadow-md font-bold'
                  : 'text-gold-200 hover:text-white hover:bg-maroon-700/50'
              }`}
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span>{isHindi ? 'शिल्पकार प्रोफ़ाइल' : 'Artisan Profile'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('sponsorships')}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all h-9 ${
                currentTab === 'sponsorships'
                  ? 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-950 shadow-md font-bold'
                  : 'text-gold-200 hover:text-white hover:bg-maroon-700/50'
              }`}
            >
              <Award className="w-4 h-4 flex-shrink-0" />
              <span>{isHindi ? 'अनुदान व CSR' : 'Grants & CSR'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('presentation')}
              className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all h-9 ${
                currentTab === 'presentation'
                  ? 'bg-gold-400 text-maroon-950 shadow-md font-bold ring-1 ring-gold-300'
                  : 'text-gold-200 hover:text-white hover:bg-maroon-700/50'
              }`}
            >
              <Presentation className="w-4 h-4 flex-shrink-0 text-gold-300" />
              <span className="flex items-center gap-1">
                <span>{isHindi ? 'प्रेजेंटेशन' : 'Pitch Deck'}</span>
                <span className="bg-maroon-950 text-gold-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none border border-gold-500/40">
                  25
                </span>
              </span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Primary Voice AI Callout - Desk AI Button in Radiant Gold */}
            <button
              onClick={onOpenMargdarshak}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 h-9 sm:h-10 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-maroon-950 font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-maroon-950/40 hover:brightness-110 hover:shadow-lg transition-all active:scale-95 flex-shrink-0 border border-gold-300/60"
              title="Speak with Desk AI Assistant"
            >
              <div className="w-5 h-5 rounded-full bg-maroon-950 text-gold-400 flex items-center justify-center flex-shrink-0">
                <Mic className="w-3 h-3" />
              </div>
              <div className="text-left flex flex-col justify-center">
                <span className="flex items-center gap-1 font-extrabold text-xs leading-none text-maroon-950">
                  {isHindi ? 'डेस्क AI' : 'Desk AI'}
                  <Sparkles className="w-2.5 h-2.5 text-maroon-800" />
                </span>
                <span className="text-[10px] text-maroon-900 font-semibold leading-none mt-0.5 hidden xs:inline">
                  {isHindi ? 'वॉइस सहायक' : 'Voice Assistant'}
                </span>
              </div>
            </button>

            {/* Language Switcher Button */}
            <button
              onClick={() => setLanguage(isHindi ? 'en' : 'hi')}
              className="hidden sm:flex h-9 sm:h-10 px-2.5 sm:px-3 bg-[#460814] rounded-xl border border-gold-500/40 text-xs font-bold text-gold-300 hover:border-gold-300 hover:text-white shadow-xs transition-all items-center gap-1.5 flex-shrink-0"
              title="Toggle Hindi / English"
            >
              <Languages className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>{isHindi ? 'English' : 'हिन्दी'}</span>
            </button>

            {/* Settings & User Account Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`flex items-center gap-1.5 h-9 sm:h-10 px-2 sm:px-2.5 rounded-xl border transition-all flex-shrink-0 cursor-pointer ${
                  isSettingsOpen 
                    ? 'bg-[#460814] text-gold-300 border-gold-400 ring-2 ring-gold-500/30 shadow-xs' 
                    : 'text-gold-200 hover:text-white hover:bg-[#460814] border-gold-500/40 bg-[#460814]/70 shadow-xs'
                }`}
                title={isHindi ? 'सेटिंग्स और खाता' : 'Settings & Account'}
                aria-label="Settings and Account"
                aria-expanded={isSettingsOpen}
              >
                <div className="relative flex-shrink-0">
                  <img 
                    src={activeArtisan.avatarUrl} 
                    alt={activeArtisan.name}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-gold-400" 
                  />
                  {activeArtisan.isVerified && (
                    <div className="absolute -bottom-0.5 -right-0.5 bg-gold-600 text-maroon-950 p-[1px] rounded-full ring-1 ring-gold-200" title="Verified Heritage Artisan">
                      <ShieldCheck className="w-2 h-2" />
                    </div>
                  )}
                </div>
                <Settings className="w-4 h-4 text-gold-300 flex-shrink-0" />
              </button>

              {/* Tooltip Popover Dropdown (Warm Ivory & Maroon luxury style) */}
              {isSettingsOpen && (
                <>
                  {/* Backdrop to close when clicking outside */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsSettingsOpen(false)} 
                  />

                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 max-w-[calc(100vw-1.5rem)] bg-[#FAF6EF] text-[#1E1617] rounded-2xl shadow-2xl border border-gold-500/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Tooltip triangle indicator */}
                    <div className="absolute -top-1.5 right-4 w-3.5 h-3.5 bg-[#5C0E1E] border-t border-l border-gold-500/50 rotate-45 z-10" />

                    {/* Header in deep maroon */}
                    <div className="bg-[#5C0E1E] px-4 py-3 border-b border-gold-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-gold-300">
                        <Settings className="w-4 h-4 text-gold-400" />
                        <span className="font-serif font-bold text-xs text-gold-200 uppercase tracking-wider">
                          {isHindi ? 'सेटिंग्स और शिल्पकार खाता' : 'Settings & Artisan Account'}
                        </span>
                      </div>
                      <button
                        onClick={() => setIsSettingsOpen(false)}
                        className="w-6 h-6 rounded-lg text-gold-300 hover:text-white hover:bg-maroon-700/60 flex items-center justify-center transition-colors cursor-pointer"
                        title="Close"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Artisan User Account Section */}
                    <div className="p-4 bg-gradient-to-br from-cream-100 via-white to-gold-50/40 border-b border-cream-300">
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img 
                            src={activeArtisan.avatarUrl} 
                            alt={activeArtisan.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gold-500 shadow-xs" 
                          />
                          {activeArtisan.isVerified && (
                            <div className="absolute -bottom-0.5 -right-0.5 bg-maroon-800 text-gold-300 p-0.5 rounded-full ring-1 ring-gold-400" title="Verified Heritage Artisan">
                              <ShieldCheck className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-serif font-bold text-sm text-[#1E1617] truncate">
                              {isHindi && activeArtisan.nativeName ? activeArtisan.nativeName : activeArtisan.name}
                            </h4>
                            {activeArtisan.isVerified && (
                              <span className="bg-maroon-50 text-maroon-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-maroon-700/30">
                                {isHindi ? 'सत्यापित' : 'Verified'}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-maroon-700 font-semibold truncate mt-0.5">
                            {activeArtisan.craftName}
                          </p>
                          <p className="text-[11px] text-[#5e4a4b] truncate">
                            {activeArtisan.district}, {activeArtisan.state}
                            {activeArtisan.odopTag ? ` • ODOP: ${activeArtisan.odopTag}` : ''}
                          </p>
                        </div>
                      </div>

                      {/* View Profile Action */}
                      <button
                        onClick={() => {
                          setCurrentTab('profile');
                          setIsSettingsOpen(false);
                        }}
                        className="mt-3 w-full py-2 px-3 bg-gradient-to-r from-maroon-800 to-maroon-700 hover:from-maroon-700 hover:to-maroon-600 text-gold-200 text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-gold-500/40"
                      >
                        <User className="w-3.5 h-3.5 text-gold-300" />
                        <span>{isHindi ? 'शिल्पकार प्रोफ़ाइल देखें' : 'View Full Artisan Profile'}</span>
                      </button>
                    </div>

                    {/* Settings Quick Options */}
                    <div className="p-2 space-y-1">
                      {/* AI & API Configurations */}
                      <button
                        onClick={() => {
                          onOpenSettings();
                          setIsSettingsOpen(false);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-gold-50 text-left transition-colors flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gold-100 text-maroon-800 border border-gold-300/60 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon-800 group-hover:text-gold-300 transition-colors">
                          <Key className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#1E1617] group-hover:text-maroon-800">
                              {isHindi ? 'AI और API सेटिंग्स' : 'AI & API Settings'}
                            </p>
                            <span className="text-[10px] bg-gold-100 text-maroon-800 font-bold px-1.5 py-0.5 rounded border border-gold-300/40">
                              Gemini
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5e4a4b] truncate">
                            {isHindi ? 'Gemini API Key, वॉयस और STT/TTS प्रदाता' : 'Gemini API Key, Voice & STT/TTS Provider'}
                          </p>
                        </div>
                      </button>

                      {/* Language Toggle in Menu */}
                      <button
                        onClick={() => {
                          setLanguage(isHindi ? 'en' : 'hi');
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-gold-50 text-left transition-colors flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gold-100 text-maroon-800 border border-gold-300/60 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon-800 group-hover:text-gold-300 transition-colors">
                          <Languages className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#1E1617] group-hover:text-maroon-800">
                              {isHindi ? 'भाषा (Language)' : 'Language'}
                            </p>
                            <span className="text-[10px] bg-maroon-100 text-maroon-900 font-bold px-1.5 py-0.5 rounded border border-maroon-300">
                              {isHindi ? 'हिन्दी Active' : 'English Active'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5e4a4b] truncate">
                            {isHindi ? 'अंग्रेज़ी में बदलें (Switch to English)' : 'Switch to Hindi (हिन्दी में बदलें)'}
                          </p>
                        </div>
                      </button>

                      {/* Desk AI Voice Shortcut */}
                      <button
                        onClick={() => {
                          onOpenMargdarshak();
                          setIsSettingsOpen(false);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-gold-50 text-left transition-colors flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gold-100 text-maroon-800 border border-gold-300/60 flex items-center justify-center flex-shrink-0 group-hover:bg-maroon-800 group-hover:text-gold-300 transition-colors">
                          <Mic className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#1E1617] group-hover:text-maroon-800">
                              {isHindi ? 'मार्गदर्शक AI सहायक' : 'Desk AI Assistant'}
                            </p>
                            <span className="text-[10px] bg-forest-100 text-forest-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              <Sparkles className="w-2.5 h-2.5 text-forest-600" />
                              Live
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5e4a4b] truncate">
                            {isHindi ? 'कीमत, कैटलॉग व योजनाओं के लिए बोलें' : 'Voice queries for pricing & cataloging'}
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Footer info */}
                    <div className="px-4 py-2 bg-cream-200 border-t border-cream-300 text-[10px] text-[#5e4a4b] flex items-center justify-between">
                      <span>Kalakriti AI Platform</span>
                      <span className="text-maroon-800 font-bold">SIH 2026</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Navigation Row */}
        <div 
          className="flex lg:hidden items-center justify-between sm:justify-around py-2 border-t border-gold-500/30 overflow-x-auto gap-1 bg-[#460814] w-full max-w-full px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            onClick={() => setCurrentTab('marketplace')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              currentTab === 'marketplace' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 font-bold shadow-xs' : 'text-gold-200 hover:bg-maroon-700/50'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isHindi ? 'बाज़ार' : 'Market'}</span>
          </button>
          <button
            onClick={() => setCurrentTab('catalog')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              currentTab === 'catalog' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 font-bold shadow-xs' : 'text-gold-200 hover:bg-maroon-700/50'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{isHindi ? 'नया उत्पाद' : 'Add Item'}</span>
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              currentTab === 'profile' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 font-bold shadow-xs' : 'text-gold-200 hover:bg-maroon-700/50'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isHindi ? 'प्रोफ़ाइल' : 'Profile'}</span>
          </button>
          <button
            onClick={() => setCurrentTab('sponsorships')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              currentTab === 'sponsorships' ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 font-bold shadow-xs' : 'text-gold-200 hover:bg-maroon-700/50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{isHindi ? 'अनुदान' : 'Grants'}</span>
          </button>
          <button
            onClick={() => setCurrentTab('presentation')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
              currentTab === 'presentation' ? 'bg-gold-400 text-maroon-950 font-bold shadow-xs' : 'text-gold-200 hover:bg-maroon-700/50'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>{isHindi ? 'डेक (25)' : 'Deck (25)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
