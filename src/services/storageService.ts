import { Artisan, Product, Review, SponsorshipGrant, AIServiceConfig } from '../types';
import { SEED_ARTISANS, SEED_PRODUCTS, SEED_REVIEWS, SEED_SPONSORSHIPS } from '../data/seedData';

const KEYS = {
  ARTISANS: 'ag_talent_hub_artisans',
  PRODUCTS: 'ag_talent_hub_products',
  REVIEWS: 'ag_talent_hub_reviews',
  SPONSORSHIPS: 'ag_talent_hub_sponsorships',
  CURRENT_ARTISAN: 'ag_talent_hub_active_artisan',
  AI_CONFIG: 'ag_talent_hub_ai_config',
  LANGUAGE: 'ag_talent_hub_language',
};

export const storageService = {
  getArtisans(): Artisan[] {
    try {
      const data = localStorage.getItem(KEYS.ARTISANS);
      if (data) return JSON.parse(data);
      localStorage.setItem(KEYS.ARTISANS, JSON.stringify(SEED_ARTISANS));
      return SEED_ARTISANS;
    } catch (e) {
      console.warn('Storage read error, using seed artisans', e);
      return SEED_ARTISANS;
    }
  },

  saveArtisan(artisan: Artisan): void {
    const list = this.getArtisans();
    const idx = list.findIndex(a => a.id === artisan.id);
    if (idx >= 0) {
      list[idx] = artisan;
    } else {
      list.unshift(artisan);
    }
    localStorage.setItem(KEYS.ARTISANS, JSON.stringify(list));
    this.setActiveArtisan(artisan);
  },

  getActiveArtisan(): Artisan {
    try {
      const data = localStorage.getItem(KEYS.CURRENT_ARTISAN);
      if (data) return JSON.parse(data);
    } catch (e) {
      // fallback
    }
    const artisans = this.getArtisans();
    return artisans[0];
  },

  setActiveArtisan(artisan: Artisan): void {
    localStorage.setItem(KEYS.CURRENT_ARTISAN, JSON.stringify(artisan));
  },

  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(KEYS.PRODUCTS);
      if (data) return JSON.parse(data);
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
      return SEED_PRODUCTS;
    } catch (e) {
      console.warn('Storage read error, using seed products', e);
      return SEED_PRODUCTS;
    }
  },

  saveProduct(product: Product): void {
    const list = this.getProducts();
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) {
      list[idx] = product;
    } else {
      list.unshift(product);
    }
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(list));
  },

  getReviews(productId?: string): Review[] {
    try {
      const data = localStorage.getItem(KEYS.REVIEWS);
      const all: Review[] = data ? JSON.parse(data) : SEED_REVIEWS;
      if (!data) localStorage.setItem(KEYS.REVIEWS, JSON.stringify(SEED_REVIEWS));
      if (productId) {
        return all.filter(r => r.productId === productId);
      }
      return all;
    } catch (e) {
      return SEED_REVIEWS;
    }
  },

  addReview(review: Review): void {
    const list = this.getReviews();
    list.unshift(review);
    localStorage.setItem(KEYS.REVIEWS, JSON.stringify(list));

    // Update product rating average
    const products = this.getProducts();
    const product = products.find(p => p.id === review.productId);
    if (product) {
      const productReviews = list.filter(r => r.productId === review.productId);
      const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      product.rating = Math.round(avg * 10) / 10;
      product.reviewCount = productReviews.length;
      this.saveProduct(product);
    }
  },

  getSponsorships(): SponsorshipGrant[] {
    try {
      const data = localStorage.getItem(KEYS.SPONSORSHIPS);
      if (data) return JSON.parse(data);
      localStorage.setItem(KEYS.SPONSORSHIPS, JSON.stringify(SEED_SPONSORSHIPS));
      return SEED_SPONSORSHIPS;
    } catch (e) {
      return SEED_SPONSORSHIPS;
    }
  },

  getAIConfig(): AIServiceConfig {
    try {
      const data = localStorage.getItem(KEYS.AI_CONFIG);
      if (data) return JSON.parse(data);
    } catch (e) {
      // fallback
    }
    return {
      sttProvider: 'bhashini',
      preferredLanguage: 'hi-IN'
    };
  },

  saveAIConfig(config: AIServiceConfig): void {
    localStorage.setItem(KEYS.AI_CONFIG, JSON.stringify(config));
  }
};
