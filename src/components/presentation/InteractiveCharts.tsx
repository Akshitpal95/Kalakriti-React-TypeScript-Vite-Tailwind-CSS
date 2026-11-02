import React, { useState } from 'react';
import { TrendingUp, ArrowUpRight, DollarSign, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

/**
 * Interactive Pie / Donut Chart component comparing Middlemen Margin Drain vs Kalakriti Direct Artisan Value
 */
export const MiddlemanProfitPieChart: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'traditional' | 'kalakriti'>('traditional');

  const traditionalData = [
    { label: 'Middlemen & Aggregators', pct: 82, color: '#ef4444', text: '₹8,200 of every ₹10,000 lost to agents' },
    { label: 'Logistics & Market Fees', pct: 10, color: '#f59e0b', text: 'Transport, warehousing, brokerage' },
    { label: 'Artisan Actual Share', pct: 8, color: '#10b981', text: 'Artisan barely recovers raw material costs' }
  ];

  const kalakritiData = [
    { label: 'Direct to Artisan Bank Account', pct: 90, color: '#10b981', text: 'Guaranteed fair hourly wage + craft margin' },
    { label: 'Insured Logistics & Packaging', pct: 6, color: '#8b5cf6', text: 'Direct pickup from rural workshop' },
    { label: 'Kalakriti Platform Sustainability', pct: 4, color: '#3b82f6', text: 'Hosting, AI inference, multi-channel sync' }
  ];

  const currentData = activeModel === 'traditional' ? traditionalData : kalakritiData;

  // Calculate SVG donut stroke offsets
  let accumulatedPct = 0;
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200 shadow-md flex flex-col justify-between h-full">
      {/* Chart Header & Model Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            Value Distribution Analysis
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-purple-950">
            Where Does the Buyer's Money Go?
          </h4>
        </div>

        {/* Interactive Segmented Switch */}
        <div className="flex bg-purple-100/80 p-1 rounded-2xl border border-purple-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveModel('traditional')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeModel === 'traditional'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-purple-800 hover:text-purple-950'
            }`}
          >
            Traditional Middleman (Status Quo)
          </button>
          <button
            onClick={() => setActiveModel('kalakriti')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeModel === 'kalakriti'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-purple-800 hover:text-purple-950'
            }`}
          >
            Kalakriti AI (Direct)
          </button>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-5">
        {/* Animated SVG Donut Chart */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-48 h-48 sm:w-52 sm:h-52">
            <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
              {currentData.map((slice, idx) => {
                const strokeDasharray = `${(slice.pct / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -((accumulatedPct / 100) * circumference);
                accumulatedPct += slice.pct;

                return (
                  <circle
                    key={idx}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke={slice.color}
                    strokeWidth="24"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out hover:opacity-85"
                  />
                );
              })}
            </svg>

            {/* Donut Center Callout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
              <span className="text-2xl sm:text-3xl font-black text-purple-950">
                {activeModel === 'traditional' ? '82%' : '90%'}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                activeModel === 'traditional' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {activeModel === 'traditional' ? 'Middleman Drain' : 'Artisan Receives'}
              </span>
            </div>
          </div>
        </div>

        {/* Legend & Context Description */}
        <div className="md:col-span-7 space-y-3.5">
          {currentData.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition-all ${
                (activeModel === 'traditional' && idx === 0) || (activeModel === 'kalakriti' && idx === 0)
                  ? 'bg-purple-50/70 border-purple-300 ring-1 ring-purple-400'
                  : 'bg-white border-purple-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs sm:text-sm font-bold text-purple-950">{item.label}</span>
                </div>
                <span className="text-sm sm:text-base font-black" style={{ color: item.color }}>
                  {item.pct}%
                </span>
              </div>
              <p className="text-[11px] text-purple-800/80 pl-5.5">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Key Takeaway Callout */}
      <div className={`p-3 rounded-2xl text-xs flex items-center gap-2.5 font-medium border ${
        activeModel === 'traditional'
          ? 'bg-red-50 text-red-900 border-red-200'
          : 'bg-emerald-50 text-emerald-900 border-emerald-200'
      }`}>
        {activeModel === 'traditional' ? (
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        )}
        <span>
          {activeModel === 'traditional'
            ? 'In the status quo, an artisan crafting a ₹20,000 silk saree for 25 days earns barely ₹1,600, forcing generational poverty.'
            : 'With Kalakriti, the same artisan receives ₹18,000 directly via UPI/Bank transfer, transforming rural livelihood sustainably.'}
        </span>
      </div>
    </div>
  );
};

/**
 * Interactive Monthly Income Bar Graph comparing traditional earnings vs Kalakriti
 */
export const IncomeComparisonBarGraph: React.FC = () => {
  const crafts = [
    { name: 'Banarasi Silk Handloom', traditional: 5400, kalakriti: 28500, multiplier: '5.2x' },
    { name: 'Bastar Dhokra Bell Metal', traditional: 6100, kalakriti: 31200, multiplier: '5.1x' },
    { name: 'Mithila Madhubani Painting', traditional: 4800, kalakriti: 24600, multiplier: '5.1x' },
    { name: 'Terracotta & Clay Pottery', traditional: 4200, kalakriti: 22000, multiplier: '5.2x' },
    { name: 'Channapatna Lacquer Wood', traditional: 5100, kalakriti: 25400, multiplier: '4.9x' }
  ];

  const maxVal = 35000;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-purple-200 shadow-md flex flex-col justify-between h-full">
      <div className="flex items-center justify-between pb-4 border-b border-purple-100">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            Income Transformation Benchmark
          </span>
          <h4 className="font-serif text-lg sm:text-xl font-bold text-purple-950">
            Average Monthly Artisan Take-Home Income (₹ INR)
          </h4>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-red-400" />
            <span className="text-purple-800">Traditional Trader</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-emerald-500" />
            <span className="text-emerald-800">Kalakriti AI</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="space-y-4 py-4">
        {crafts.map((craft, idx) => {
          const tradPct = (craft.traditional / maxVal) * 100;
          const loomPct = (craft.kalakriti / maxVal) * 100;

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-950">{craft.name}</span>
                <span className="bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded-full text-[10px]">
                  +{craft.multiplier} Growth
                </span>
              </div>

              {/* Comparative Dual Bars */}
              <div className="space-y-1">
                {/* Traditional Bar */}
                <div className="flex items-center gap-2">
                  <div className="w-full bg-purple-50 h-4 rounded-full overflow-hidden flex">
                    <div
                      className="bg-red-400/80 h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2"
                      style={{ width: `${tradPct}%` }}
                    >
                      <span className="text-[9px] font-bold text-white whitespace-nowrap">₹{craft.traditional.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Kalakriti Bar */}
                <div className="flex items-center gap-2">
                  <div className="w-full bg-purple-50 h-5 rounded-full overflow-hidden flex">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-3 shadow-xs"
                      style={{ width: `${loomPct}%` }}
                    >
                      <span className="text-[10px] font-extrabold text-white whitespace-nowrap">₹{craft.kalakriti.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 text-xs text-purple-900 flex items-center justify-between">
        <span>National Living Wage Threshold for Crafts: <strong>₹18,000/mo</strong></span>
        <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
          100% Meets Living Wage Standard on Kalakriti
        </span>
      </div>
    </div>
  );
};

/**
 * Demographics & Field Data Cards
 */
export const DemographicDataCards: React.FC = () => {
  const metrics = [
    {
      num: '7.3M+',
      label: 'Registered Artisans in India',
      sub: 'Ministry of Textiles official census; 200M+ allied informal rural makers',
      color: 'border-purple-300 bg-purple-50/60'
    },
    {
      num: '56.1%',
      label: 'Women Artisan Workforce',
      sub: 'Primary household income generators, mostly home-based micro-producers',
      color: 'border-pink-300 bg-pink-50/60'
    },
    {
      num: '92%',
      label: 'Language & Tech Barrier',
      sub: 'Cannot read/write English or navigate barcode/SKU conventional portals',
      color: 'border-red-300 bg-red-50/60'
    },
    {
      num: '34%',
      label: 'Generational Abandonment Risk',
      sub: 'Youth leaving generational lineages due to starvation-level wages',
      color: 'border-amber-300 bg-amber-50/60'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {metrics.map((m, idx) => (
        <div key={idx} className={`p-5 rounded-3xl border shadow-xs transition-transform hover:-translate-y-1 ${m.color}`}>
          <div className="font-serif text-3xl font-black text-purple-950 mb-1">{m.num}</div>
          <div className="text-sm font-bold text-purple-900 mb-1.5">{m.label}</div>
          <div className="text-xs text-purple-700/90 leading-relaxed">{m.sub}</div>
        </div>
      ))}
    </div>
  );
};
