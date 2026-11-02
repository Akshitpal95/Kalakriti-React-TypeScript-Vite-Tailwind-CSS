import React from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Volume2, 
  ExternalLink, 
  Sparkles
} from 'lucide-react';
import { Product, Language } from '../../types';
import { speechService } from '../../services/speechService';
import { PaisleyCorner } from '../common/OrnamentalDetails';

interface ProductCardProps {
  product: Product;
  language: Language;
  onSelectProduct: (product: Product) => void;
  onOpenRatingModal: (product: Product) => void;
  onOpenCrossPublish: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language,
  onSelectProduct,
  onOpenRatingModal,
  onOpenCrossPublish
}) => {
  const isHindi = language === 'hi';

  const handleAudioListen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToSpeak = isHindi
      ? `${product.titleHindi || product.title}। कारीगर ${product.artisanName}, ${product.artisanLocation} से। कीमत ₹${product.currentPrice}। ${product.descriptionHindi || product.description}`
      : `${product.title}. Crafted by ${product.artisanName} in ${product.artisanLocation}. Price ₹${product.currentPrice}. ${product.description}`;
    
    speechService.speak(textToSpeak, isHindi ? 'hi-IN' : 'en-IN');
  };

  // Determine badge tag: "Featured" or "New"
  const isFeatured = product.rating >= 4.9 || product.isVerifiedArtisan;
  const badgeLabel = isHindi 
    ? (isFeatured ? 'शाही चयन (Featured)' : 'नया (New)')
    : (isFeatured ? 'Featured' : 'New');

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group relative bg-[#FAF6EF] rounded-3xl border border-gold-500/35 hover:border-gold-500/80 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-maroon-950/10 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Subtle paisley corner accent on hover */}
      <PaisleyCorner position="top-right" className="w-10 h-10 text-gold-400 opacity-0 group-hover:opacity-40 transition-opacity z-20" color="#C9A15A" />

      {/* Product Image Box with thin gold decorative frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream-200 p-2">
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-gold-500/40">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top-Left Featured / New Badge (Gold-on-Maroon as specified in Req 5) */}
          <div className="absolute top-0 left-0 z-10">
            <span className="inline-flex items-center gap-1 bg-[#5C0E1E] text-gold-300 border-b border-r border-gold-400/60 text-[10px] font-extrabold px-2.5 py-1 rounded-br-xl shadow-md uppercase tracking-wider">
              <Sparkles className="w-2.5 h-2.5 text-gold-400" />
              <span>{badgeLabel}</span>
            </span>
          </div>

          {/* Top-Right Category / Verified pill */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 pointer-events-none z-10">
            {product.isVerifiedArtisan && (
              <span className="bg-[#460814]/90 backdrop-blur-md text-gold-300 border border-gold-400/40 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3 h-3 text-gold-400" />
                <span>GI Tag</span>
              </span>
            )}
          </div>

          {/* Audio Listen Button */}
          <button
            type="button"
            onClick={handleAudioListen}
            className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FAF6EF]/90 backdrop-blur-md text-maroon-900 hover:text-gold-700 hover:bg-white shadow-md border border-gold-400/50 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-10"
            title={isHindi ? 'विवरण सुनें (Audio)' : 'Listen to craft story'}
          >
            <Volume2 className="w-3.5 h-3.5 text-maroon-800" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-1.5">
          {/* Artisan & Location info */}
          <div className="flex items-center justify-between text-xs text-[#5e4a4b]">
            <span className="font-semibold text-[#1E1617] truncate max-w-[160px]">
              {product.artisanName}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#7d6869]">
              <MapPin className="w-3 h-3 text-gold-600 flex-shrink-0" />
              <span className="truncate max-w-[110px]">{product.artisanLocation}</span>
            </span>
          </div>

          {/* Title in editorial serif typography */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-maroon-950 leading-snug line-clamp-2 group-hover:text-maroon-700 transition-colors">
            {isHindi && product.titleHindi ? product.titleHindi : product.title}
          </h3>

          {/* Star Rating summary in warm gold */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <div className="flex items-center text-gold-500">
              <Star className="w-3.5 h-3.5 fill-[#C9A15A] text-[#C9A15A]" />
              <span className="text-xs font-bold text-[#1E1617] ml-1">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-[#7d6869]">
              ({product.reviewCount} {isHindi ? 'समीक्षाएं' : 'reviews'})
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenRatingModal(product);
              }}
              className="text-[11px] text-maroon-700 hover:text-maroon-900 hover:underline font-bold ml-auto"
            >
              {isHindi ? 'रेट करें' : 'Rate'}
            </button>
          </div>
        </div>

        {/* Footer: Price & Quick CTA */}
        <div className="pt-3 border-t border-gold-500/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#7d6869] block uppercase font-bold tracking-wider">
              {isHindi ? 'कारीगर मूल्य' : 'Artisan Price'}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl sm:text-2xl font-bold text-maroon-950">
                ₹{product.currentPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-maroon-800 font-bold bg-gold-100 px-1.5 py-0.5 rounded border border-gold-300/60">
                Etsy ~${product.pricing.etsyBenchmarkUsd}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCrossPublish(product);
              }}
              className="p-2 rounded-xl text-[#5e4a4b] hover:text-maroon-900 hover:bg-cream-200 border border-gold-500/30 transition-colors"
              title="Cross-Publish to Etsy/ONDC"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gold-700" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectProduct(product);
              }}
              className="px-3.5 py-2 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-maroon-950 font-bold rounded-xl text-xs shadow-xs active:scale-95 transition-all border border-gold-300/50"
            >
              {isHindi ? 'विवरण' : 'Details'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
