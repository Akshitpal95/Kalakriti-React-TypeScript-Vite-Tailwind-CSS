import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MarketplaceGrid } from './components/marketplace/MarketplaceGrid';
import { AddProductVoiceFlow } from './components/cataloging/AddProductVoiceFlow';
import { ArtisanOnboarding } from './components/onboarding/ArtisanOnboarding';
import { SponsorshipHub } from './components/sponsorship/SponsorshipHub';
import { MargdarshakModal } from './components/margdarshak/MargdarshakModal';
import { ProductDetailModal } from './components/marketplace/ProductDetailModal';
import { StarRatingModal } from './components/marketplace/StarRatingModal';
import { CrossPublishModal } from './components/crossPublish/CrossPublishModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { Product, Artisan, Language } from './types';
import { storageService } from './services/storageService';
import { PitchDeck } from './components/presentation/PitchDeck';
import { Mic, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const getInitialTab = (): 'marketplace' | 'catalog' | 'profile' | 'sponsorships' | 'presentation' => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam === 'presentation' || tabParam === 'deck') return 'presentation';
      if (tabParam === 'catalog') return 'catalog';
      if (tabParam === 'profile') return 'profile';
      if (tabParam === 'sponsorships') return 'sponsorships';
      if (window.location.hash === '#presentation') return 'presentation';
    } catch (e) {}
    return 'marketplace';
  };

  const [currentTab, setCurrentTabState] = useState<'marketplace' | 'catalog' | 'profile' | 'sponsorships' | 'presentation'>(getInitialTab);

  const setCurrentTab = (tab: 'marketplace' | 'catalog' | 'profile' | 'sponsorships' | 'presentation') => {
    setCurrentTabState(tab);
    try {
      const url = new URL(window.location.href);
      if (tab === 'marketplace') {
        url.searchParams.delete('tab');
      } else {
        url.searchParams.set('tab', tab);
      }
      window.history.replaceState(null, '', url.toString());
    } catch (e) {}
  };
  const [language, setLanguage] = useState<Language>('hi');
  const [products, setProducts] = useState<Product[]>([]);
  const [activeArtisan, setActiveArtisan] = useState<Artisan>(storageService.getActiveArtisan());

  // Modals state
  const [isMargdarshakOpen, setIsMargdarshakOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [selectedProductForRating, setSelectedProductForRating] = useState<Product | null>(null);
  const [selectedProductForCrossPublish, setSelectedProductForCrossPublish] = useState<Product | null>(null);
  const [catalogVoiceContext, setCatalogVoiceContext] = useState<string>('');

  useEffect(() => {
    // Load products on mount
    const prods = storageService.getProducts();
    setProducts(prods);
  }, []);

  const handleProductPublished = (newProduct: Product) => {
    storageService.saveProduct(newProduct);
    setProducts(storageService.getProducts());
  };

  const handleSaveArtisan = (updatedArtisan: Artisan) => {
    storageService.saveArtisan(updatedArtisan);
    setActiveArtisan(updatedArtisan);
  };

  const handleApplyProfileBio = (bioEn: string, bioHi: string, extra?: any) => {
    const updated = {
      ...activeArtisan,
      bio: bioEn,
      bioHindi: bioHi,
      district: extra?.district || activeArtisan.district,
      state: extra?.state || activeArtisan.state,
      craftName: extra?.craftName || activeArtisan.craftName,
      experienceYears: extra?.experienceYears || activeArtisan.experienceYears
    };
    handleSaveArtisan(updated);
    setCurrentTab('profile');
  };

  const handleNavigateToCatalog = (spokenContext?: string) => {
    if (spokenContext) {
      setCatalogVoiceContext(spokenContext);
    }
    setCurrentTab('catalog');
  };

  const handleReviewAdded = () => {
    const freshProducts = storageService.getProducts();
    setProducts(freshProducts);
    if (selectedProductForDetail) {
      const refreshed = freshProducts.find(p => p.id === selectedProductForDetail.id);
      if (refreshed) setSelectedProductForDetail(refreshed);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5EDE0] text-[#1E1617] selection:bg-[#C9A15A] selection:text-[#5C0E1E]">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onOpenMargdarshak={() => setIsMargdarshakOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        activeArtisan={activeArtisan}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'marketplace' && (
          <MarketplaceGrid
            products={products}
            language={language}
            onSelectProduct={(p) => setSelectedProductForDetail(p)}
            onOpenRatingModal={(p) => setSelectedProductForRating(p)}
            onOpenCrossPublish={(p) => setSelectedProductForCrossPublish(p)}
            onNavigateToCatalog={() => setCurrentTab('catalog')}
          />
        )}

        {currentTab === 'catalog' && (
          <AddProductVoiceFlow
            language={language}
            activeArtisan={activeArtisan}
            initialVoiceContext={catalogVoiceContext}
            onProductPublished={handleProductPublished}
            onOpenCrossPublish={(p) => setSelectedProductForCrossPublish(p)}
          />
        )}

        {currentTab === 'profile' && (
          <ArtisanOnboarding
            language={language}
            artisan={activeArtisan}
            onSaveArtisan={handleSaveArtisan}
            onOpenMargdarshak={() => setIsMargdarshakOpen(true)}
          />
        )}

        {currentTab === 'sponsorships' && (
          <SponsorshipHub
            language={language}
            activeArtisan={activeArtisan}
          />
        )}

        {currentTab === 'presentation' && (
          <PitchDeck
            onClose={() => setCurrentTab('marketplace')}
            isHindi={language === 'hi'}
          />
        )}
      </main>

      {/* Floating Desk AI Button (Always Reachable - Royal Maroon & Gold) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMargdarshakOpen(true)}
          className="relative flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-maroon-800 via-maroon-700 to-[#460814] text-white rounded-full shadow-2xl shadow-maroon-950/40 hover:shadow-gold-500/20 hover:scale-105 active:scale-95 transition-all border-2 border-gold-400/70 group cursor-pointer"
          title="Open Desk AI Voice Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-gold-400 text-maroon-950 flex items-center justify-center animate-pulse">
            <Mic className="w-4 h-4 text-maroon-950" />
          </div>
          <div className="text-left pr-1">
            <span className="block text-xs font-black tracking-wide flex items-center gap-1 text-gold-200">
              {language === 'hi' ? 'डेस्क AI' : 'Desk AI'}
              <Sparkles className="w-3 h-3 text-gold-300" />
            </span>
            <span className="block text-[10px] text-gold-300/80 font-medium">
              {language === 'hi' ? 'बोलकर काम करें' : 'Voice Guide'}
            </span>
          </div>
        </button>
      </div>

      {/* Footer */}
      <Footer
        language={language}
        onOpenMargdarshak={() => setIsMargdarshakOpen(true)}
      />

      {/* Modals & Dialogs */}
      <MargdarshakModal
        isOpen={isMargdarshakOpen}
        onClose={() => setIsMargdarshakOpen(false)}
        language={language}
        onApplyProfileBio={handleApplyProfileBio}
        onNavigateToCatalog={handleNavigateToCatalog}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={Boolean(selectedProductForDetail)}
        onClose={() => setSelectedProductForDetail(null)}
        language={language}
        onOpenRatingModal={(p) => {
          setSelectedProductForRating(p);
        }}
        onOpenCrossPublish={(p) => {
          setSelectedProductForCrossPublish(p);
        }}
      />

      <StarRatingModal
        product={selectedProductForRating}
        isOpen={Boolean(selectedProductForRating)}
        onClose={() => setSelectedProductForRating(null)}
        language={language}
        onReviewAdded={handleReviewAdded}
      />

      <CrossPublishModal
        product={selectedProductForCrossPublish}
        isOpen={Boolean(selectedProductForCrossPublish)}
        onClose={() => setSelectedProductForCrossPublish(null)}
        language={language}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        language={language}
      />
    </div>
  );
};
