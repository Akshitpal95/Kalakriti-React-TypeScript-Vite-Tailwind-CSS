import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Volume2, 
  MessageCircle, 
  CreditCard, 
  Layers, 
  Clock, 
  Package, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Product, Language, Review } from '../../types';
import { speechService } from '../../services/speechService';
import { storageService } from '../../services/storageService';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onOpenRatingModal: (product: Product) => void;
  onOpenCrossPublish: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  language,
  onOpenRatingModal,
  onOpenCrossPublish
}) => {
  const [selectedImgIdx, setSelectedImgIdx] = useState<number>(0);
  const [isCheckoutSimOpen, setIsCheckoutSimOpen] = useState<boolean>(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const isHindi = language === 'hi';
  const reviews: Review[] = storageService.getReviews(product.id);

  const handleAudioListen = () => {
    const textToSpeak = isHindi
      ? `${product.titleHindi || product.title}। यह कलाकृति ${product.artisanName} द्वारा ${product.artisanLocation} में निर्मित है। सामग्री: ${product.material}। तकनीक: ${product.craftsmanshipStyle}। निर्माण समय: ${product.estimatedCraftTime}। विवरण: ${product.descriptionHindi || product.description}`
      : `${product.title}. Created by ${product.artisanName} in ${product.artisanLocation}. Material: ${product.material}. Craft technique: ${product.craftsmanshipStyle}. Crafting duration: ${product.estimatedCraftTime}. Description: ${product.description}`;
    
    speechService.speak(textToSpeak, isHindi ? 'hi-IN' : 'en-IN');
  };

  const handleSimulatePayment = () => {
    setIsOrderPlaced(true);
    setTimeout(() => {
      setIsOrderPlaced(false);
      setIsCheckoutSimOpen(false);
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-4xl bg-[#FAF6EF] rounded-3xl shadow-2xl border-2 border-gold-500/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header bar in Deep Maroon */}
        <div className="bg-[#5C0E1E] text-[#F5EDE0] px-6 py-4 flex items-center justify-between border-b border-gold-500/30">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#460814] text-gold-300 border border-gold-400/50 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>{isHindi ? 'सत्यापित शिल्पकला' : 'Verified GI Heritage'}</span>
            </span>
            <span className="text-xs text-gold-200/90 font-semibold">{product.category}</span>
          </div>

          <button
            onClick={() => {
              speechService.stopSpeaking();
              onClose();
            }}
            className="p-1.5 text-gold-300 hover:text-white hover:bg-maroon-700/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery Column (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cream-200 border-2 border-gold-500/40 shadow-inner p-1">
                <img
                  src={product.images[selectedImgIdx] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={handleAudioListen}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-maroon-950 text-xs font-bold shadow-md hover:bg-white transition-all active:scale-95 border border-gold-400/50"
                  title="Listen to story"
                >
                  <Volume2 className="w-4 h-4 text-maroon-800" />
                  <span>{isHindi ? 'कहानी सुनें' : 'Listen Story'}</span>
                </button>
              </div>

              {/* Thumbnails if multiple */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImgIdx(i)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedImgIdx === i ? 'border-gold-500 ring-2 ring-gold-400/50' : 'border-gold-500/30 opacity-70'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Artisan Profile Cardlet */}
              <div className="bg-white p-4 rounded-2xl border border-gold-500/40 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#7d6869] uppercase tracking-wider">
                  <span>{isHindi ? 'कारीगर परिचय' : 'Master Craftsperson'}</span>
                  {product.isVerifiedArtisan && (
                    <span className="text-maroon-800 flex items-center gap-1 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                      GI Certified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#5C0E1E] border border-gold-400/60 flex items-center justify-center font-serif text-lg font-bold text-gold-300">
                    {product.artisanName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-maroon-950">
                      {product.artisanName}
                    </h4>
                    <p className="text-xs text-[#5e4a4b] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold-600" />
                      {product.artisanLocation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details & Purchase Actions (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              {/* Title & Ratings */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-wood-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-wood-900 ml-1.5">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-wood-500">
                    ({product.reviewCount} {isHindi ? 'समीक्षाएं' : 'reviews'})
                  </span>
                  <button
                    onClick={() => onOpenRatingModal(product)}
                    className="text-xs text-terracotta-700 font-bold hover:underline ml-auto"
                  >
                    {isHindi ? '+ अपनी समीक्षा लिखें' : '+ Write a Review'}
                  </button>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-maroon-950 leading-tight">
                  {isHindi && product.titleHindi ? product.titleHindi : product.title}
                </h2>
              </div>

              {/* Price & Fair-Trade Guarantee in Deep Velvet Maroon & Gold */}
              <div className="bg-[#460814] text-[#F5EDE0] p-5 rounded-2xl border border-gold-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div>
                  <span className="text-[10px] text-gold-400 uppercase font-extrabold tracking-wider block">
                    {isHindi ? 'प्रत्यक्ष कारीगर मूल्य' : 'Direct Fair Artisan Price'}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-black text-gold-300">
                      ₹{product.currentPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-maroon-950 font-bold bg-gold-400 px-2.5 py-0.5 rounded-full">
                      Etsy Benchmark: ${product.pricing.etsyBenchmarkUsd}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs text-gold-200/90 font-medium">
                  <span className="block font-bold text-gold-300">100% Direct Payout</span>
                  <span className="text-[11px] text-gold-300/70">Zero Commission Deductions</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-maroon-900 uppercase tracking-wider">
                  {isHindi ? 'शिल्प का विवरण एवं इतिहास' : 'Craft Heritage & Description'}
                </h4>
                <p className="text-sm text-[#38201a] leading-relaxed font-normal">
                  {isHindi && product.descriptionHindi ? product.descriptionHindi : product.description}
                </p>
              </div>

              {/* Specification Table */}
              <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-gold-500/30 text-xs shadow-xs">
                <div>
                  <span className="text-[#7d6869] block text-[11px] font-medium">{isHindi ? 'सामग्री' : 'Material'}</span>
                  <span className="font-bold text-maroon-950">{product.material}</span>
                </div>
                <div>
                  <span className="text-[#7d6869] block text-[11px] font-medium">{isHindi ? 'कारीगरी शैली' : 'Craft Style'}</span>
                  <span className="font-bold text-maroon-950">{product.craftsmanshipStyle}</span>
                </div>
                <div>
                  <span className="text-[#7d6869] block text-[11px] font-medium">{isHindi ? 'निर्माण समय' : 'Crafting Duration'}</span>
                  <span className="font-bold text-maroon-950">{product.estimatedCraftTime}</span>
                </div>
                <div>
                  <span className="text-[#7d6869] block text-[11px] font-medium">{isHindi ? 'आयाम' : 'Dimensions'}</span>
                  <span className="font-bold text-maroon-950">{product.dimensions}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-gold-500/20">
                  <span className="text-[#7d6869] block text-[11px] font-medium">{isHindi ? 'देखभाल निर्देश' : 'Care & Storage'}</span>
                  <span className="font-medium text-[#38201a]">{product.careInstructions}</span>
                </div>
              </div>

              {/* Purchase / Inquire CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutSimOpen(true)}
                  className="w-full sm:flex-1 py-3.5 px-6 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-maroon-950 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-gold-300"
                >
                  <CreditCard className="w-4 h-4 text-maroon-950" />
                  <span>{isHindi ? 'अभी खरीदें (UPI / Razorpay)' : 'Buy Now (Instant UPI / Card)'}</span>
                </button>

                <a
                  href={`https://wa.me/919839124102?text=${encodeURIComponent(`Hello ${product.artisanName}, I am interested in your craft: "${product.title}" on Kalakriti.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto py-3.5 px-5 bg-maroon-800 hover:bg-maroon-900 text-gold-200 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border border-gold-500/40"
                >
                  <MessageCircle className="w-4 h-4 text-gold-400" />
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onOpenCrossPublish(product)}
                  className="p-3.5 bg-gold-100 hover:bg-gold-200 text-maroon-900 border border-gold-400/50 rounded-2xl font-bold text-xs transition-colors flex items-center gap-1.5"
                  title="Cross-Publish to Etsy/ONDC"
                >
                  <Layers className="w-4 h-4 text-maroon-800" />
                  <span className="hidden sm:inline">Etsy/ONDC</span>
                </button>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="pt-6 border-t border-gold-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-maroon-950">
                {isHindi ? 'सत्यापित खरीदार समीक्षाएं' : 'Verified Buyer Reviews'} ({reviews.length})
              </h3>
              <button
                onClick={() => onOpenRatingModal(product)}
                className="text-xs text-terracotta-700 font-bold hover:underline"
              >
                {isHindi ? '+ नई समीक्षा जोड़ें' : '+ Write Review'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-4 rounded-2xl border border-wood-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-wood-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-wood-500">{rev.date}</span>
                  </div>
                  <p className="text-xs text-wood-800 font-medium italic">
                    "{rev.comment}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-wood-600 font-semibold pt-1 border-t border-wood-100">
                    <span>{rev.reviewerName}</span>
                    {rev.verifiedPurchase && (
                      <span className="text-forest-700 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* UPI / Razorpay Checkout Simulator Modal */}
      {isCheckoutSimOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#FAF6EF] rounded-3xl max-w-md w-full p-6 border-2 border-gold-500/50 shadow-2xl text-center space-y-5">
            <div className="flex items-center justify-between border-b border-gold-500/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">💳</span>
                <span className="font-serif font-bold text-maroon-950">
                  {isHindi ? 'सुरक्षित भुगतान (Razorpay / UPI)' : 'Razorpay & Direct UPI Checkout'}
                </span>
              </div>
              <button
                onClick={() => setIsCheckoutSimOpen(false)}
                className="text-[#7d6869] hover:text-maroon-950 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isOrderPlaced ? (
              <div className="py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-gold-100 text-maroon-800 mx-auto flex items-center justify-center border border-gold-400">
                  <CheckCircle2 className="w-10 h-10 animate-bounce text-gold-600" />
                </div>
                <h4 className="font-serif text-xl font-bold text-maroon-950">
                  {isHindi ? 'भुगतान सफल! आदेश दर्ज हो गया' : 'Payment Successful! Order Placed'}
                </h4>
                <p className="text-xs text-[#5e4a4b]">
                  {isHindi
                    ? `राशि ₹${product.currentPrice} सीधे ${product.artisanName} के बैंक खाते में स्थानांतरित की जा रही है।`
                    : `₹${product.currentPrice} has been directly credited to ${product.artisanName}'s artisan escrow account.`}
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-left">
                <div className="bg-white p-3.5 rounded-2xl border border-gold-500/30 space-y-1 shadow-xs">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#5e4a4b]">{product.title}</span>
                    <span className="font-bold text-maroon-950">₹{product.currentPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-maroon-800 font-medium">
                    <span>Artisan Fair Trade Fund (0% platform cut)</span>
                    <span className="font-bold text-gold-700">₹0 fee</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-gold-500/20 pt-1.5 text-maroon-950">
                    <span>Total Amount</span>
                    <span>₹{product.currentPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-maroon-950">
                    {isHindi ? 'UPI आईडी या कार्ड विवरण' : 'UPI ID (GPay / PhonePe / Paytm)'}
                  </label>
                  <input
                    type="text"
                    defaultValue="artisan.patron@okhdfcbank"
                    className="w-full text-xs font-semibold p-3 rounded-xl border border-gold-500/40 bg-white outline-none focus:border-maroon-800"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-maroon-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-gold-300"
                >
                  <ShieldCheck className="w-4 h-4 text-maroon-950" />
                  <span>{isHindi ? `₹${product.currentPrice} का भुगतान करें` : `Complete Payment of ₹${product.currentPrice}`}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
