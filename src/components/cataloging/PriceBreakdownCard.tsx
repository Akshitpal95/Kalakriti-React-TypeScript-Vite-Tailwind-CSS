import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Package, 
  Sparkles, 
  HelpCircle, 
  Globe, 
  ShieldCheck,
  Percent
} from 'lucide-react';
import { ProductPricing, Language } from '../../types';

interface PriceBreakdownCardProps {
  pricing: ProductPricing;
  currentPrice: number;
  onPriceChange: (newPrice: number) => void;
  language: Language;
}

export const PriceBreakdownCard: React.FC<PriceBreakdownCardProps> = ({
  pricing,
  currentPrice,
  onPriceChange,
  language
}) => {
  const isHindi = language === 'hi';

  const fairWageTotal = pricing.craftHours * pricing.hourlyWage;

  return (
    <div className="bg-gradient-to-br from-[#FAF6EF] via-white to-cream-100 rounded-3xl p-5 sm:p-6 border border-gold-300/60 shadow-sm space-y-5">
      {/* Title & Suggested Price Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gold-200/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-maroon-900 to-maroon-800 text-gold-300 flex items-center justify-center font-serif font-bold text-sm shadow-sm border border-gold-400/40">
              ₹
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-maroon-950">
              {isHindi ? 'मार्गदर्शक AI मूल्य निर्धारण' : 'Desk AI Fair Pricing Engine'}
            </h3>
          </div>
          <p className="text-xs text-maroon-700/80 mt-0.5 font-sans">
            {isHindi
              ? 'सामग्री लागत, कारीगरी के घंटे व बाज़ार रुझान के आधार पर अनुशंसित मूल्य'
              : 'Grounded in material costs, master artisan hours & international benchmarks'}
          </p>
        </div>

        {/* Current Active Price Pill */}
        <div className="bg-gradient-to-tr from-maroon-950 to-maroon-900 text-white px-4 py-2.5 rounded-2xl text-right shadow-md border border-gold-400/40">
          <span className="text-[10px] text-gold-300 uppercase font-bold tracking-wider block font-sans">
            {isHindi ? 'अंतिम विक्रय मूल्य' : 'Selected Selling Price'}
          </span>
          <span className="text-2xl font-black tracking-tight text-gold-400 font-serif">
            ₹{currentPrice.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Suggested Range Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-maroon-900 font-serif">
          <span>
            {isHindi ? 'न्यूनतम:' : 'Min Fair Price:'} <span className="text-maroon-700 font-sans">₹{pricing.minPrice.toLocaleString('en-IN')}</span>
          </span>
          <span className="text-gold-700 flex items-center gap-1 font-serif">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            {isHindi ? 'अनुशंसित:' : 'Suggested:'} ₹{pricing.suggestedPrice.toLocaleString('en-IN')}
          </span>
          <span>
            {isHindi ? 'अधिकतम प्रीमियम:' : 'Max Premium:'} <span className="text-maroon-700 font-sans">₹{pricing.maxPrice.toLocaleString('en-IN')}</span>
          </span>
        </div>

        {/* Range slider for artisan control */}
        <input
          type="range"
          min={pricing.minPrice}
          max={pricing.maxPrice}
          step={50}
          value={currentPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-2.5 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-gold-600"
        />

        <div className="flex justify-between text-[11px] text-maroon-700/80 font-medium">
          <button
            type="button"
            onClick={() => onPriceChange(pricing.minPrice)}
            className="hover:text-gold-700 hover:underline"
          >
            {isHindi ? 'न्यूनतम चुनें' : 'Set Min'}
          </button>
          <button
            type="button"
            onClick={() => onPriceChange(pricing.suggestedPrice)}
            className="text-gold-700 font-bold hover:underline"
          >
            {isHindi ? 'अनुशंसित चुनें (बेस्ट)' : 'Set Recommended'}
          </button>
          <button
            type="button"
            onClick={() => onPriceChange(pricing.maxPrice)}
            className="hover:text-gold-700 hover:underline"
          >
            {isHindi ? 'अधिकतम चुनें' : 'Set Max'}
          </button>
        </div>
      </div>

      {/* 4 Metrics Grid: Materials, Hours, Wage, Etsy Comparison */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="bg-white p-3 rounded-2xl border border-gold-300/40 shadow-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-maroon-800 font-medium mb-1">
            <Package className="w-3.5 h-3.5 text-gold-600" />
            <span>{isHindi ? 'कच्चा माल लागत' : 'Material Cost'}</span>
          </div>
          <p className="text-base font-bold text-maroon-950 font-serif">
            ₹{pricing.materialCost.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-maroon-600 font-sans">
            {isHindi ? 'प्रामाणिक रेशम/धातु' : 'Yarn, clay, or metal'}
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-gold-300/40 shadow-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-maroon-800 font-medium mb-1">
            <Clock className="w-3.5 h-3.5 text-gold-600" />
            <span>{isHindi ? 'मेहनत के घंटे' : 'Labor Hours'}</span>
          </div>
          <p className="text-base font-bold text-maroon-950 font-serif">
            {pricing.craftHours} {isHindi ? 'घंटे' : 'Hrs'}
          </p>
          <p className="text-[10px] text-maroon-600 font-sans">
            @ ₹{pricing.hourlyWage}/{isHindi ? 'घंटा' : 'hr'} fair wage
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-gold-300/40 shadow-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-maroon-800 font-medium mb-1">
            <Percent className="w-3.5 h-3.5 text-gold-600" />
            <span>{isHindi ? 'कारीगर प्रत्यक्ष लाभ' : 'Artisan Share'}</span>
          </div>
          <p className="text-base font-bold text-maroon-900 font-serif">
            ~{Math.round(((currentPrice - pricing.materialCost) / currentPrice) * 100)}%
          </p>
          <p className="text-[10px] text-maroon-600 font-sans">
            {isHindi ? 'शून्य बिचौलिया शुल्क' : 'Zero middleman cut'}
          </p>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-gold-300/40 shadow-xs">
          <div className="flex items-center gap-1.5 text-[11px] text-maroon-800 font-medium mb-1">
            <Globe className="w-3.5 h-3.5 text-gold-600" />
            <span>{isHindi ? 'Etsy अंतरराष्ट्रीय दर' : 'Etsy Global Signal'}</span>
          </div>
          <p className="text-base font-bold text-maroon-950 font-serif">
            ${pricing.etsyBenchmarkUsd}
          </p>
          <p className="text-[10px] text-maroon-600 font-sans">
            ~₹{pricing.etsyBenchmarkInr.toLocaleString('en-IN')} global avg
          </p>
        </div>
      </div>

      {/* Rationale explanation */}
      {pricing.pricingRationale && (
        <div className="bg-[#FAF6EF] p-3.5 rounded-2xl border border-gold-300/60 text-xs text-maroon-900 leading-relaxed font-sans">
          <span className="font-serif font-bold text-maroon-950 mr-1">
            {isHindi ? 'Desk AI विश्लेषण:' : 'Desk AI Rationale:'}
          </span>
          {pricing.pricingRationale}
        </div>
      )}
    </div>
  );
};
