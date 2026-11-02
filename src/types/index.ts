export type Language = 'en' | 'hi';

export type CraftCategory = 
  | 'Handloom & Textiles'
  | 'Terracotta & Pottery'
  | 'Traditional Painting'
  | 'Metalcraft & Dhokra'
  | 'Woodwork & Carving'
  | 'Handmade Jewelry'
  | 'Folk Music & Instruments'
  | 'Leather & Jute Crafts';

export interface Artisan {
  id: string;
  name: string;
  nativeName?: string;
  craftCategory: CraftCategory;
  craftName: string; // e.g. "Banarasi Brocade Weaving" or "Madhubani Painting"
  district: string;
  state: string;
  village?: string;
  bio: string;
  bioHindi?: string;
  experienceYears: number;
  avatarUrl: string;
  workshopImages: string[];
  phone: string;
  isVerified: boolean;
  odopTag?: string; // One District One Product e.g. "Varanasi Silk", "Khurja Pottery"
  awards?: string[];
  rating: number;
  totalReviews: number;
  joinedDate: string;
}

export interface ProductPricing {
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  materialCost: number;
  craftHours: number;
  hourlyWage: number;
  etsyBenchmarkUsd: number;
  etsyBenchmarkInr: number;
  pricingRationale: string;
}

export interface ExternalListingMeta {
  etsyExportReady: boolean;
  ondcExportReady: boolean;
  shopifyExportReady: boolean;
  suggestedEtsyTitle: string;
  etsyTags: string[];
  etsyCategoryPath: string;
  sku: string;
}

export interface Product {
  id: string;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  isVerifiedArtisan: boolean;
  title: string;
  titleHindi?: string;
  category: CraftCategory;
  description: string;
  descriptionHindi?: string;
  images: string[];
  material: string;
  colors: string[];
  craftsmanshipStyle: string;
  estimatedCraftTime: string;
  craftHours: number;
  dimensions: string;
  careInstructions: string;
  pricing: ProductPricing;
  currentPrice: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  externalListings: ExternalListingMeta;
  createdAt: string;
}

/**
 * Strict JSON schema returned by Vision + Pricing AI Orchestrator
 */
export interface ProductAnalysisJSON {
  title: string;
  titleHindi: string;
  description: string;
  descriptionHindi: string;
  material: string;
  colors: string[];
  craftsmanshipStyle: string;
  estimatedCraftTime: string;
  craftHours: number;
  dimensions: string;
  careInstructions: string;
  category: CraftCategory;
  price_range: {
    min: number;
    max: number;
    suggested: number;
  };
  materialCostEstimate: number;
  etsyComparablePriceUsd: number;
  craftHeritageNotes: string;
  seoTags: string[];
}

export interface Review {
  id: string;
  productId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface SponsorshipGrant {
  id: string;
  title: string;
  organization: string;
  orgType: 'Government Grant' | 'Corporate CSR' | 'NGO Mission' | 'Heritage Trust';
  grantAmount: string;
  eligibleCrafts: CraftCategory[];
  description: string;
  targetRegion: string;
  deadline: string;
  status: 'Open' | 'Closing Soon' | 'Reviewing';
  applicationUrl: string;
}

export type STTProvider = 'bhashini' | 'whisper' | 'google' | 'azure' | 'webspeech';

export interface AIServiceConfig {
  sttProvider: STTProvider;
  bhashiniApiKey?: string;
  bhashiniUserId?: string;
  openaiApiKey?: string;
  geminiApiKey?: string;
  anthropicApiKey?: string;
  googleApiKey?: string;
  azureSpeechKey?: string;
  azureRegion?: string;
  preferredLanguage: 'hi-IN' | 'en-IN' | 'bn-IN' | 'ta-IN' | 'te-IN' | 'mr-IN';
}
