import React, { useState } from 'react';
import { 
  Award, 
  Building2, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Code,
  Download
} from 'lucide-react';
import { SponsorshipGrant, Language, Artisan } from '../../types';
import { storageService } from '../../services/storageService';

interface SponsorshipHubProps {
  language: Language;
  activeArtisan: Artisan;
}

export const SponsorshipHub: React.FC<SponsorshipHubProps> = ({
  language,
  activeArtisan
}) => {
  const isHindi = language === 'hi';
  const grants: SponsorshipGrant[] = storageService.getSponsorships();
  const artisans: Artisan[] = storageService.getArtisans();

  const [activeTab, setActiveTab] = useState<'grants' | 'csr_api'>('grants');
  const [selectedCraftFilter, setSelectedCraftFilter] = useState<string>('All');

  const filteredGrants = grants.filter(g => 
    selectedCraftFilter === 'All' || g.eligibleCrafts.includes(selectedCraftFilter as any)
  );

  // Generate public API export JSON feed for NGOs/CSR
  const verifiedArtisansFeed = artisans.filter(a => a.isVerified).map(a => ({
    artisan_id: a.id,
    name: a.name,
    craft: a.craftName,
    category: a.craftCategory,
    odop_gi_tag: a.odopTag,
    district: a.district,
    state: a.state,
    experience_years: a.experienceYears,
    rating: a.rating,
    sponsorship_status: 'Eligible for Direct Grant',
    contact_token: `CSR-DIRECT-CONNECT-${a.id}`
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Hero - Heritage Maroon & Gold */}
      <div className="relative rounded-3xl bg-gradient-to-br from-maroon-950 via-maroon-900 to-[#460814] border border-gold-400/40 text-cream-100 p-6 sm:p-10 shadow-xl overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-serif font-bold">
            <Award className="w-3.5 h-3.5 text-gold-400" />
            <span>{isHindi ? 'कारीगर अनुदान एवं सीएसआर सहायता' : 'Artisan Grants & Sponsorship Portal'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            {isHindi ? 'सरकारी योजनाएं और कॉर्पोरेट सीएसआर अनुदान' : 'Empowering Artisans with Grants & Sponsorships'}
          </h1>

          <p className="text-gold-200/90 text-sm leading-relaxed font-sans">
            {isHindi
              ? 'एनजीओ, कपड़ा मंत्रालय और कॉर्पोरेट ट्रस्ट द्वारा पारंपरिक कारीगरों को सौर करघा, औजार, कच्चा माल और बिना ब्याज के अनुदान प्रदान किए जा रहे हैं।'
              : 'Direct financial assistance, raw material stipends, and solar equipment grants from Ministry of Textiles, Tata Trusts, and cultural NGOs.'}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('grants')}
              className={`px-5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all border ${
                activeTab === 'grants'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 shadow-md border-gold-300'
                  : 'bg-maroon-900/70 text-gold-300 hover:bg-maroon-850 border-gold-400/30'
              }`}
            >
              {isHindi ? 'सक्रिय अनुदान योजनाएं' : 'Active Grant Schemes'}
            </button>
            <button
              onClick={() => setActiveTab('csr_api')}
              className={`px-5 py-2.5 rounded-xl text-xs font-serif font-bold transition-all border ${
                activeTab === 'csr_api'
                  ? 'bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-950 shadow-md border-gold-300'
                  : 'bg-maroon-900/70 text-gold-300 hover:bg-maroon-850 border-gold-400/30'
              }`}
            >
              {isHindi ? 'NGO / CSR कारीगर डिस्कवरी API' : 'NGO & CSR Discovery Feed (Public API)'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'grants' ? (
        <div className="space-y-6">
          {/* Filter Row */}
          <div className="flex items-center justify-between bg-[#FAF6EF] p-4 rounded-2xl border border-gold-300/60 shadow-sm">
            <span className="text-xs font-serif font-bold text-maroon-950">
              {isHindi ? `उपलब्ध योजनाएं (${filteredGrants.length})` : `Available Opportunities (${filteredGrants.length})`}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-xs text-maroon-800 hidden sm:inline font-sans font-medium">
                {isHindi ? 'शिल्प अनुसार चुनें:' : 'Filter by Craft:'}
              </span>
              <select
                value={selectedCraftFilter}
                onChange={(e) => setSelectedCraftFilter(e.target.value)}
                className="py-1.5 px-3 bg-white rounded-xl text-xs font-serif font-semibold text-maroon-950 border border-gold-300/60 outline-none cursor-pointer focus:border-gold-500"
              >
                <option value="All">{isHindi ? 'सभी शिल्प' : 'All Crafts'}</option>
                <option value="Handloom & Textiles">Handloom & Textiles</option>
                <option value="Traditional Painting">Traditional Painting</option>
                <option value="Metalcraft & Dhokra">Metalcraft & Dhokra</option>
                <option value="Terracotta & Pottery">Terracotta & Pottery</option>
              </select>
            </div>
          </div>

          {/* Grants Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredGrants.map((grant) => (
              <div
                key={grant.id}
                className="bg-[#FAF6EF] rounded-3xl border border-gold-300/60 p-6 shadow-sm hover:shadow-lg hover:border-gold-500 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-maroon-900 text-gold-300 text-[10px] font-serif font-bold px-2.5 py-0.5 rounded-full border border-gold-400/30">
                      {grant.orgType}
                    </span>
                    <span className={`text-[10px] font-serif font-bold px-2.5 py-0.5 rounded-full ${
                      grant.status === 'Closing Soon'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-cream-200 text-maroon-950 border border-gold-400/40'
                    }`}>
                      {grant.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-maroon-950 leading-snug">
                    {grant.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-maroon-800 font-serif font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-gold-600" />
                    <span>{grant.organization}</span>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-gold-300/50 space-y-1 shadow-xs">
                    <span className="text-[10px] text-maroon-700/80 uppercase font-serif font-bold tracking-wider block">
                      Grant Amount / Benefit
                    </span>
                    <p className="text-sm font-serif font-extrabold text-maroon-950">
                      {grant.grantAmount}
                    </p>
                  </div>

                  <p className="text-xs text-maroon-850 leading-relaxed font-sans">
                    {grant.description}
                  </p>

                  <div className="pt-2 border-t border-gold-200/80 space-y-1 text-xs text-maroon-700 font-sans">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-600" />
                      <span className="truncate">{grant.targetRegion}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gold-600" />
                      <span>Deadline: {grant.deadline}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={grant.applicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-400 text-maroon-950 font-serif font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 border border-gold-300"
                >
                  <span>{isHindi ? 'योजना के लिए आवेदन करें' : 'Apply for Scheme / Grant'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-maroon-950" />
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* CSR & NGO Public Discovery API Feed */
        <div className="bg-[#FAF6EF] rounded-3xl p-6 sm:p-8 border border-gold-300/60 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-serif font-bold text-maroon-900 uppercase tracking-wider">
                <Code className="w-4 h-4 text-gold-600" />
                <span>Public Artisan Discovery Feed (REST API Endpoint)</span>
              </div>
              <h2 className="font-mono text-xl font-bold text-maroon-950 mt-0.5">
                GET /api/v1/verified-artisans/sponsorship-feed
              </h2>
              <p className="text-xs text-maroon-800 font-sans mt-1">
                Corporate Social Responsibility (CSR) programs, state handicraft departments, and philanthropic grant funds can query this real-time JSON feed to sponsor verified artisan clusters.
              </p>
            </div>

            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(verifiedArtisansFeed, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'verified-artisans-sponsorship-feed.json';
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-500 text-maroon-950 rounded-xl text-xs font-serif font-bold shadow-sm whitespace-nowrap border border-gold-300"
            >
              <Download className="w-4 h-4" />
              <span>Download JSON Feed</span>
            </button>
          </div>

          <div className="bg-maroon-950 text-gold-300 rounded-2xl p-5 font-mono text-xs overflow-x-auto max-h-96 border border-gold-400/40 shadow-inner">
            <pre>{JSON.stringify(verifiedArtisansFeed, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};
