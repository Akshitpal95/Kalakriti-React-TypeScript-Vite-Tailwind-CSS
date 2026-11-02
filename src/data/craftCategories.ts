import { CraftCategory } from '../types';

export interface CraftMeta {
  category: CraftCategory;
  hindiName: string;
  typicalMaterials: string[];
  benchmarkHourlyRate: number; // in INR
  commonGIRegions: string[];
  description: string;
  iconName: string;
  etsyMultiplierRange: [number, number]; // Ratio of international market price to Indian artisan price
}

export const CRAFT_CATEGORIES_META: Record<CraftCategory, CraftMeta> = {
  'Handloom & Textiles': {
    category: 'Handloom & Textiles',
    hindiName: 'हथकरघा और वस्त्र',
    typicalMaterials: ['Pure Mulberry Silk', 'Khadi Cotton', 'Tussar Silk', 'Zari Gold/Silver Thread', 'Natural Indigo Dye', 'Pashmina Wool'],
    benchmarkHourlyRate: 65,
    commonGIRegions: ['Varanasi (UP)', 'Chanderi (MP)', 'Kanchipuram (TN)', 'Pochampally (Telangana)', 'Sambalpur (Odisha)', 'Bhagalpur (Bihar)'],
    description: 'Ancient pit and frame-loom woven heirlooms, sarees, dupattas, stoles, and tapestries.',
    iconName: 'Shirt',
    etsyMultiplierRange: [1.8, 2.5]
  },
  'Terracotta & Pottery': {
    category: 'Terracotta & Pottery',
    hindiName: 'टेराकोटा और मिट्टी के बर्तन',
    typicalMaterials: ['Riverbed Clay', 'Quartz Stone Powder', 'Multani Mitti', 'Natural Copper Glazes', 'Cobalt Oxide', 'Terracotta Red Clay'],
    benchmarkHourlyRate: 75,
    commonGIRegions: ['Gorakhpur (UP)', 'Jaipur (Rajasthan)', 'Khurja (UP)', 'Bankura (West Bengal)', 'Nizamabad (UP)'],
    description: 'Wheel-thrown pottery, baked terracotta plaques, blue pottery vases, and decorative cookware.',
    iconName: 'Coffee',
    etsyMultiplierRange: [2.0, 3.2]
  },
  'Traditional Painting': {
    category: 'Traditional Painting',
    hindiName: 'पारंपरिक चित्रकला',
    typicalMaterials: ['Handmade Cotton Rag Paper', 'Silk Cloth', 'Natural Mineral Pigments', 'Turmeric', 'Cow Dung Wash', 'Bamboo Nib Pens'],
    benchmarkHourlyRate: 70,
    commonGIRegions: ['Madhubani (Bihar)', 'Raghurajpur / Pattachitra (Odisha)', 'Warli (Maharashtra)', 'Thanjavur (Tamil Nadu)', 'Kalamkari (AP)'],
    description: 'Living ancient visual storytelling, religious folk art, mythological scrolls, and wall art.',
    iconName: 'Palette',
    etsyMultiplierRange: [1.9, 2.8]
  },
  'Metalcraft & Dhokra': {
    category: 'Metalcraft & Dhokra',
    hindiName: 'धातुशिल्प और ढोकरा',
    typicalMaterials: ['Bell Metal Brass', 'Bronze Alloy', 'Pure Beeswax', 'River Sand & Clay Molds', 'Silver Inlay Wire', 'Copper'],
    benchmarkHourlyRate: 85,
    commonGIRegions: ['Bastar (Chhattisgarh)', 'Bidar (Karnataka)', 'Moradabad (UP)', 'Thanjavur (TN)', 'Swamimalai (TN)'],
    description: 'Lost-wax cast figurines, brass lamps, Bidriware etched silverware, and temple bells.',
    iconName: 'Hammer',
    etsyMultiplierRange: [2.2, 3.5]
  },
  'Woodwork & Carving': {
    category: 'Woodwork & Carving',
    hindiName: 'काष्ठकला और नक्काशी',
    typicalMaterials: ['Sheesham Wood (Indian Rosewood)', 'Teak Wood', 'Mulberry Wood', 'Sandalwood', 'Walnut Wood', 'Natural Beeswax Polish'],
    benchmarkHourlyRate: 80,
    commonGIRegions: ['Saharanpur (UP)', 'Sankheda (Gujarat)', 'Channapatna (Karnataka)', 'Kashmir (Walnut Wood)'],
    description: 'Hand-carved furniture, jali screens, lacquered wooden toys, decorative chests, and panels.',
    iconName: 'Boxes',
    etsyMultiplierRange: [2.0, 3.0]
  },
  'Handmade Jewelry': {
    category: 'Handmade Jewelry',
    hindiName: 'हस्तनिर्मित आभूषण',
    typicalMaterials: ['Terracotta Beads', 'Raw Brass', 'Silver Filigree (Tarakasi)', 'Semi-precious Gemstones', 'Glass Beads', 'Silk Threads'],
    benchmarkHourlyRate: 90,
    commonGIRegions: ['Cuttack (Odisha)', 'Jaipur (Rajasthan)', 'Tribal Bastar (CG)', 'Hyderabad (Telangana)'],
    description: 'Silver filigree neckpieces, tribal brass chokers, terracotta earrings, and beaded ornaments.',
    iconName: 'Sparkles',
    etsyMultiplierRange: [2.5, 4.0]
  },
  'Folk Music & Instruments': {
    category: 'Folk Music & Instruments',
    hindiName: 'लोक संगीत और वाद्ययंत्र',
    typicalMaterials: ['Seasoned Tun Wood', 'Mulberry Timber', 'Goat Hide Parchment', 'Brass Strings', 'Bamboo Reeds', 'Gourds'],
    benchmarkHourlyRate: 95,
    commonGIRegions: ['Mirzapur (UP)', 'Rampur (UP)', 'Tanjore (TN)', 'Tripura (Bamboo)', 'Kolkata (WB)'],
    description: 'Handcrafted sitars, sarangis, dholaks, ektaras, morchangs, and bamboo flutes.',
    iconName: 'Music',
    etsyMultiplierRange: [2.0, 3.5]
  },
  'Leather & Jute Crafts': {
    category: 'Leather & Jute Crafts',
    hindiName: 'चर्म और जूट शिल्प',
    typicalMaterials: ['Vegetable-Tanned Leather', 'Natural Golden Jute', 'Cotton Rope', 'Eco-friendly Dyes', 'Embroidered Thread'],
    benchmarkHourlyRate: 60,
    commonGIRegions: ['Kolhapur (Maharashtra)', 'Kolkata (West Bengal)', 'Kanpur (UP)', 'Shantiniketan (WB)'],
    description: 'Handmade Kolhapuri chappals, embossed leather journals, braided jute rugs, and macrame bags.',
    iconName: 'ShoppingBag',
    etsyMultiplierRange: [1.8, 2.6]
  }
};
