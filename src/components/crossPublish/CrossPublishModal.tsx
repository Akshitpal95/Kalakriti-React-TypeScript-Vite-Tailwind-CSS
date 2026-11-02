import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  ExternalLink, 
  Copy, 
  Download, 
  Check, 
  Globe, 
  Share2, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { Product, Language } from '../../types';
import { crossPublishService } from '../../services/crossPublishService';

interface CrossPublishModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CrossPublishModal: React.FC<CrossPublishModalProps> = ({
  product,
  isOpen,
  onClose,
  language
}) => {
  const [activePlatform, setActivePlatform] = useState<'etsy' | 'ondc' | 'shopify' | 'woocommerce'>('etsy');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen || !product) return null;

  const isHindi = language === 'hi';

  const etsyData = crossPublishService.generateEtsyPayload(product);
  const ondcData = crossPublishService.generateONDCPayload(product);
  const shopifyData = crossPublishService.generateShopifyPayload(product);
  const wooData = crossPublishService.generateWooCommercePayload(product);

  const currentPayload =
    activePlatform === 'etsy'
      ? etsyData
      : activePlatform === 'ondc'
      ? ondcData
      : activePlatform === 'woocommerce'
      ? wooData
      : shopifyData;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(currentPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    crossPublishService.downloadListingJSON(product, activePlatform);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#FAF6EF] rounded-3xl shadow-2xl border-2 border-gold-500/50 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header in Deep Maroon */}
        <div className="bg-[#5C0E1E] text-[#F5EDE0] p-5 sm:p-6 flex items-center justify-between border-b border-gold-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#460814] border border-gold-400/50 flex items-center justify-center text-xl shadow-inner text-gold-300">
              🌐
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                {isHindi ? 'मल्टी-प्लेटफ़ॉर्म क्रॉस-पब्लिश हब' : 'Cross-Publishing & Multi-Marketplace Sync'}
              </h3>
              <p className="text-xs text-gold-200/90">
                {isHindi
                  ? 'एक क्लिक में अपने उत्पाद को Etsy, ONDC और Shopify के लिए निर्यात करें'
                  : 'Generate standard listing payloads for Etsy, India ONDC, and Shopify'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gold-300 hover:text-white hover:bg-maroon-700/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Platform Tabs */}
        <div className="flex items-center gap-2 p-4 bg-cream-200 border-b border-gold-500/20 overflow-x-auto">
          <button
            onClick={() => setActivePlatform('etsy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePlatform === 'etsy'
                ? 'bg-maroon-800 text-gold-200 border border-gold-400 shadow-sm'
                : 'bg-white text-maroon-900 hover:bg-gold-50 border border-gold-500/30'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-gold-500" />
            <span>Etsy International (${product.pricing.etsyBenchmarkUsd})</span>
          </button>

          <button
            onClick={() => setActivePlatform('ondc')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePlatform === 'ondc'
                ? 'bg-maroon-800 text-gold-200 border border-gold-400 shadow-sm'
                : 'bg-white text-maroon-900 hover:bg-gold-50 border border-gold-500/30'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-gold-500" />
            <span>Govt. ONDC Protocol (₹{product.currentPrice})</span>
          </button>

          <button
            onClick={() => setActivePlatform('shopify')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePlatform === 'shopify'
                ? 'bg-maroon-800 text-gold-200 border border-gold-400 shadow-sm'
                : 'bg-white text-maroon-900 hover:bg-gold-50 border border-gold-500/30'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-gold-500" />
            <span>Shopify Admin API</span>
          </button>

          <button
            onClick={() => setActivePlatform('woocommerce')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePlatform === 'woocommerce'
                ? 'bg-maroon-800 text-gold-200 border border-gold-400 shadow-sm'
                : 'bg-white text-maroon-900 hover:bg-gold-50 border border-gold-500/30'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-gold-500" />
            <span>WooCommerce REST v3</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activePlatform === 'etsy' && (
            <div className="bg-[#460814]/10 p-4 rounded-2xl border border-gold-500/40 text-xs text-maroon-950 space-y-1">
              <span className="font-bold block text-maroon-900">
                ⭐ Etsy Global Export Ready
              </span>
              <p className="text-[#5e4a4b]">
                This payload includes curated SEO tags, craftsmanship material breakdown, USD conversion (${product.pricing.etsyBenchmarkUsd}), and GI origin description tailored for North American and European buyers.
              </p>
            </div>
          )}

          {activePlatform === 'ondc' && (
            <div className="bg-[#460814]/10 p-4 rounded-2xl border border-gold-500/40 text-xs text-maroon-950 space-y-1">
              <span className="font-bold block text-maroon-900">
                🇮🇳 ONDC Open Network Protocol v1.2.0
              </span>
              <p className="text-[#5e4a4b]">
                Strictly formatted for Government of India's Open Network for Digital Commerce, tagged with ODOP origin and artisan direct bank settlement.
              </p>
            </div>
          )}

          {activePlatform === 'shopify' && (
            <div className="bg-[#460814]/10 p-4 rounded-2xl border border-gold-500/40 text-xs text-maroon-950 space-y-1">
              <span className="font-bold block text-maroon-900">
                🛍️ Shopify Product Admin REST & GraphQL Ready
              </span>
              <p className="text-[#5e4a4b]">
                Pre-formatted for Shopify catalog import with HTML story formatting, SKU ({product.externalListings.sku}), variant pricing (₹{product.currentPrice}), and craft tags.
              </p>
            </div>
          )}

          {activePlatform === 'woocommerce' && (
            <div className="bg-[#460814]/10 p-4 rounded-2xl border border-gold-500/40 text-xs text-maroon-950 space-y-1">
              <span className="font-bold block text-maroon-900">
                📦 WooCommerce REST API v3 Payload
              </span>
              <p className="text-[#5e4a4b]">
                Standard WordPress WooCommerce product schema with structured craft attributes (Material, Dimensions, Labor Hours, GI Provenance).
              </p>
            </div>
          )}

          {/* Code Viewer */}
          <div className="relative bg-[#2B040B] text-gold-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto max-h-72 border border-gold-500/40">
            <pre>{JSON.stringify(currentPayload, null, 2)}</pre>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyJSON}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-gold-50 border border-gold-500/40 text-maroon-950 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-gold-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isHindi ? 'कॉपी हो गया!' : 'Copied!') : (isHindi ? 'JSON कॉपी करें' : 'Copy Payload')}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-maroon-950 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer border border-gold-300"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isHindi ? 'फ़ाइल डाउनलोड करें' : 'Download JSON File'}</span>
              </button>
            </div>

            <span className="text-[11px] text-[#7d6869] italic">
              SKU: {product.externalListings.sku}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
