import { Artisan, Product, SponsorshipGrant, Review } from '../types';

export const SEED_ARTISANS: Artisan[] = [
  {
    id: 'artisan-1',
    name: 'Ramkishan Vishwakarma',
    nativeName: 'रामकिशन विश्वकर्मा',
    craftCategory: 'Handloom & Textiles',
    craftName: 'Banarasi Kadhwa Silk Weaving',
    village: 'Kotwa',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    bio: 'Fourth-generation master weaver from Varanasi specializing in heritage Kadhwa jacquard and real zari borders. Every sari takes between 25 to 40 days on a pit loom without digital punch cards.',
    bioHindi: 'वाराणसी के चौथी पीढ़ी के मास्टर बुनकर। असली ज़री और कढ़वा तकनीक से शुद्ध रेशम की साड़ियों की बुनाई में 32 वर्षों का अनुभव।',
    experienceYears: 32,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
    ],
    phone: '+91 98391 24102',
    isVerified: true,
    odopTag: 'Varanasi Zari & Handloom Brocade (ODOP-UP-01)',
    awards: ['National Handloom Merit Award 2018', 'Sant Kabir Weaver Recognition'],
    rating: 4.9,
    totalReviews: 48,
    joinedDate: '2023-01-15'
  },
  {
    id: 'artisan-2',
    name: 'Sunita Devi',
    nativeName: 'सुनीता देवी',
    craftCategory: 'Traditional Painting',
    craftName: 'Madhubani Kachni & Bharni Folk Art',
    village: 'Ranti',
    district: 'Madhubani',
    state: 'Bihar',
    bio: 'Master folk painter practicing ancient Mithila art using bamboo nibs, natural cow dung wash, and mineral pigments derived from turmeric, indigo, and marigold petals.',
    bioHindi: 'मधुबनी (मिथिला) की पारंपरिक लोक चित्रकार। प्राकृतिक रंगों, हल्दी और नील से हाथ से बनाए गए कैनवास पर जीवन का वृक्ष और प्रकृति चित्रण।',
    experienceYears: 24,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    ],
    phone: '+91 94712 55901',
    isVerified: true,
    odopTag: 'Madhubani Painting (GI & ODOP-BR-14)',
    awards: ['Bihar State Shilpa Award 2021'],
    rating: 4.95,
    totalReviews: 62,
    joinedDate: '2023-03-20'
  },
  {
    id: 'artisan-3',
    name: 'Somaru Baghel',
    nativeName: 'सोमारू बघेल',
    craftCategory: 'Metalcraft & Dhokra',
    craftName: 'Bastar Lost-Wax Cast Bell Metal',
    village: 'Kondagaon',
    district: 'Bastar',
    state: 'Chhattisgarh',
    bio: 'Tribal craftsman continuing the 4,000-year-old Harappan lost-wax casting technique (cire perdue). Using bees-wax threads and clay molds to forge unique one-of-a-kind brass and bronze artefacts.',
    bioHindi: 'बस्तर के आदिवासी शिल्पकार। 4000 वर्ष पुरानी मोम-सांचा (ढोकरा) तकनीक से कांसा व पीतल की मूर्तियां बनाते हैं।',
    experienceYears: 19,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'
    ],
    phone: '+91 91310 88204',
    isVerified: true,
    odopTag: 'Bastar Dhokra Bell Metal (ODOP-CG-04)',
    awards: ['Tribal Artisan Fellowship 2022'],
    rating: 4.85,
    totalReviews: 31,
    joinedDate: '2023-06-10'
  },
  {
    id: 'artisan-4',
    name: 'Kripal Singh Kumpawat',
    nativeName: 'कृपाल सिंह कुंपावत',
    craftCategory: 'Terracotta & Pottery',
    craftName: 'Jaipur Turquoise Blue Pottery',
    village: 'Kot Jewar',
    district: 'Jaipur',
    state: 'Rajasthan',
    bio: 'Heritage blue potter sculpting without clay, using Egyptian paste made of quartz stone powder, powdered glass, Fuller’s earth, and natural gum, fired at low temperature with copper oxide glaze.',
    bioHindi: 'जयपुर की पारंपरिक नीली मिट्टी (क्वार्ट्ज़ व तांबे के रंग) से बर्तन और हस्तशिल्प तैयार करने वाले कुशल कारीगर।',
    experienceYears: 28,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    workshopImages: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80'
    ],
    phone: '+91 94140 12893',
    isVerified: true,
    odopTag: 'Jaipur Blue Pottery (GI Tagged)',
    awards: ['Rajasthan Vikas Shilpkar 2019'],
    rating: 4.88,
    totalReviews: 54,
    joinedDate: '2023-02-18'
  }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    artisanId: 'artisan-1',
    artisanName: 'Ramkishan Vishwakarma',
    artisanLocation: 'Varanasi, Uttar Pradesh',
    isVerifiedArtisan: true,
    title: 'Heritage Banarasi Kadhwa Zari Pure Mulberry Silk Saree',
    titleHindi: 'पारंपरिक बनारसी कढ़वा ज़री शुद्ध शहतूत सिल्क साड़ी',
    category: 'Handloom & Textiles',
    description: 'Masterfully handwoven over 28 continuous days on a traditional pit loom. Crafted from pure 3-ply Mulberry silk warp and weft, featuring intricately entwined gold and silver electroplated Zari floral bel motifs along the pallu and scalloped borders. Drapes with royal heirloom weight.',
    descriptionHindi: '28 दिनों की लगातार मेहनत से पारंपरिक गड्ढा करघे पर बुनी गई विशुद्ध शहतूत रेशम साड़ी। पल्लू पर सोने-चांदी की तारों का महीन बेल-बूटा कार्य।',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80'
    ],
    material: '100% Pure Mulberry Silk & Electroplated Gold Zari',
    colors: ['Deep Crimson Red', 'Burnished Gold', 'Antique Emerald'],
    craftsmanshipStyle: 'Kadhwa Brocade Weave (Non-floating weft thread technique)',
    estimatedCraftTime: '28 Days (approx. 196 hours)',
    craftHours: 196,
    dimensions: '6.3 Meters (5.5m Saree + 0.8m Unstitched Blouse piece) x 45 inches width',
    careInstructions: 'Strictly dry clean only. Wrap in soft unbleached muslin cloth and store flat. Air in mild shade once every six months.',
    pricing: {
      suggestedPrice: 16500,
      minPrice: 14200,
      maxPrice: 19800,
      materialCost: 6800,
      craftHours: 196,
      hourlyWage: 50,
      etsyBenchmarkUsd: 280,
      etsyBenchmarkInr: 23240,
      pricingRationale: 'Raw mulberry silk filament (₹4,200) + certified zari spool (₹2,600) + 196 hours master artisan weaving wage @ ₹50/hr + fair profit margin. Comparable luxury handloom sarees retail on international marketplaces for $260-$340.'
    },
    currentPrice: 16500,
    rating: 4.9,
    reviewCount: 29,
    inStock: true,
    externalListings: {
      etsyExportReady: true,
      ondcExportReady: true,
      shopifyExportReady: true,
      suggestedEtsyTitle: 'Pure Silk Banarasi Handloom Saree | Authentic Wedding Heirloom Kadhwa Zari Draped Silk Sari with Blouse',
      etsyTags: ['banarasi silk saree', 'indian wedding attire', 'handwoven silk', 'kadhwa zari', 'heirloom textile', 'ethical artisan fashion'],
      etsyCategoryPath: 'Clothing > Women Clothing > Dresses & Traditional > Sarees',
      sku: 'AG-VAR-SILK-001'
    },
    createdAt: '2024-01-10'
  },
  {
    id: 'prod-2',
    artisanId: 'artisan-2',
    artisanName: 'Sunita Devi',
    artisanLocation: 'Madhubani, Bihar',
    isVerifiedArtisan: true,
    title: 'Madhubani "Tree of Life & Birds" Folk Painting on Handmade Canvas',
    titleHindi: 'मधुबनी हस्तनिर्मित कैनवास पर "जीवन का वृक्ष एवं पक्षी" लोक चित्र',
    category: 'Traditional Painting',
    description: 'Hand-painted with natural mineral and floral pigments on handmade recycled cotton rag paper treated with cow-dung wash for archival longevity. Depicts the sacred Kalpavriksha surrounded by peacocks, sun, and dancing fish symbolizing eternal harmony, using delicate Kachni (cross-hatching) linework.',
    descriptionHindi: 'प्राकृतिक रंगों और बांस की कलम से हस्तनिर्मित कॉटन पेपर पर उकेरा गया कल्पवृक्ष एवं मयूर चित्रण।',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1000&q=80'
    ],
    material: 'Handmade Cotton Rag Paper & Pure Plant Pigments (Turmeric, Indigo, Lampblack)',
    colors: ['Ochre Yellow', 'Cobalt Indigo', 'Terracotta Red', 'Lamp Black'],
    craftsmanshipStyle: 'Mithila Kachni & Bharni Line Painting using Bamboo Nib',
    estimatedCraftTime: '6 Days (approx. 42 hours)',
    craftHours: 42,
    dimensions: '22 inches x 30 inches (Framing ready with 1-inch border margin)',
    careInstructions: 'Keep away from direct moisture. Frame under non-reflective UV museum glass for 50+ year color preservation.',
    pricing: {
      suggestedPrice: 3800,
      minPrice: 3200,
      maxPrice: 4600,
      materialCost: 750,
      craftHours: 42,
      hourlyWage: 70,
      etsyBenchmarkUsd: 85,
      etsyBenchmarkInr: 7055,
      pricingRationale: 'Archival handmade cotton paper and organic hand-ground pigments (₹750) + 42 hours precision line-drawing labor. Etsy benchmark for authentic certified Mithila folk paintings is $75-$110.'
    },
    currentPrice: 3800,
    rating: 5.0,
    reviewCount: 38,
    inStock: true,
    externalListings: {
      etsyExportReady: true,
      ondcExportReady: true,
      shopifyExportReady: true,
      suggestedEtsyTitle: 'Original Madhubani Folk Art Painting | Indian Tree of Life Handpainted Wall Decor on Archival Paper',
      etsyTags: ['madhubani art', 'tree of life painting', 'indian folk art', 'original wall art', 'natural pigment canvas', 'mithila painting'],
      etsyCategoryPath: 'Art & Collectibles > Painting > Folk & Tribal Art',
      sku: 'AG-MDB-PNT-002'
    },
    createdAt: '2024-02-04'
  },
  {
    id: 'prod-3',
    artisanId: 'artisan-3',
    artisanName: 'Somaru Baghel',
    artisanLocation: 'Bastar, Chhattisgarh',
    isVerifiedArtisan: true,
    title: 'Bastar Lost-Wax Cast Dhokra Tribal Horn Player & Antelope Figurine',
    titleHindi: 'बस्तर मोम-सांचा ढोकरा आदिवासी वाद्ययंत्र वादक एवं हिरण मूर्ति',
    category: 'Metalcraft & Dhokra',
    description: 'Cast using the 4,000-year-old non-ferrous lost-wax process. Every spiral and filigree thread is individually hand-rolled from pure beeswax over a clay core, covered in riverbed clay, and poured with molten bell brass. Since the clay mold is shattered to retrieve the cooled metal, each sculpture is an irreproducible original.',
    descriptionHindi: '4000 वर्ष पुरानी लुप्त मोम तकनीक से ढली हुई पीतल-कांसा मूर्ति। प्रत्येक कलाकृति अपने आप में अद्वितीय और एक मात्र प्रति है।',
    images: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80'
    ],
    material: 'Bell Metal Brass Alloy (Copper + Zinc + Tin) with Natural Wax Finish',
    colors: ['Antique Burnished Brass', 'Dark Patina Charcoal', 'Golden Highlights'],
    craftsmanshipStyle: 'Dhokra Cire Perdue (Lost-Wax) Hand-coiled Metal Casting',
    estimatedCraftTime: '9 Days (Clay curing, wax threading & kiln pouring: 36 hours)',
    craftHours: 36,
    dimensions: 'Height: 11 inches, Base Width: 5.5 inches, Weight: 1.45 kg',
    careInstructions: 'Wipe with dry microfiber cloth. Avoid harsh chemical polishes to maintain the authentic tribal antique patina.',
    pricing: {
      suggestedPrice: 4200,
      minPrice: 3600,
      maxPrice: 5100,
      materialCost: 1200,
      craftHours: 36,
      hourlyWage: 80,
      etsyBenchmarkUsd: 95,
      etsyBenchmarkInr: 7885,
      pricingRationale: 'Raw recycled brass metal (1.5kg ₹750) + pure wild beeswax & kiln fuel (₹450) + 36 hours sculpting and furnace casting. International tribal art collectors pay $90-$120 on Etsy and gallery stores.'
    },
    currentPrice: 4200,
    rating: 4.8,
    reviewCount: 19,
    inStock: true,
    externalListings: {
      etsyExportReady: true,
      ondcExportReady: true,
      shopifyExportReady: true,
      suggestedEtsyTitle: 'Handmade Dhokra Brass Sculpture | Lost Wax Tribal Art Figurine | Authentic Bastar Bell Metal Craft',
      etsyTags: ['dhokra sculpture', 'bastar tribal art', 'lost wax casting', 'brass musician figurine', 'vintage indian metalwork', 'ethnic home decor'],
      etsyCategoryPath: 'Art & Collectibles > Sculpture > Metal Figurines',
      sku: 'AG-BST-DKR-003'
    },
    createdAt: '2024-03-12'
  },
  {
    id: 'prod-4',
    artisanId: 'artisan-4',
    artisanName: 'Kripal Singh Kumpawat',
    artisanLocation: 'Jaipur, Rajasthan',
    isVerifiedArtisan: true,
    title: 'Jaipur Hand-Painted Turquoise Blue Pottery Botanical Urn Vase',
    titleHindi: 'जयपुर हस्तनिर्मित फ़िरोज़ी ब्लू पॉटरी वनस्पति फूलदान',
    category: 'Terracotta & Pottery',
    description: 'Iconic Rajasthani low-fire ceramic sculpted entirely without clay using quartz powder, saji, katira gum, and ground glass. Hand-painted with Persian-inspired floral arabesques and cobalt-copper oxide motifs under a lustrous translucent glaze.',
    descriptionHindi: 'क्वार्ट्ज़ और तांबे के प्राकृतिक नीले रंग से निर्मित जयपुर की प्रसिद्ध हस्तनिर्मित फूलदान।',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80'
    ],
    material: 'Quartz Powder, Multani Mitti, Powdered Glass, Copper Oxide Pigments',
    colors: ['Turquoise Blue', 'Cobalt Royal Blue', 'Ivory White', 'Chrome Green'],
    craftsmanshipStyle: 'Jaipur Blue Pottery Dough Mold & Freehand Oxide Painting',
    estimatedCraftTime: '5 Days (Mold setting, painting, single kiln firing: 22 hours)',
    craftHours: 22,
    dimensions: 'Height: 12 inches, Diameter: 6.5 inches, Mouth Opening: 3.5 inches',
    careInstructions: 'Clean gently with damp cloth. Hand-wash only, not microwave or dishwasher safe. Does not crack with mild heat.',
    pricing: {
      suggestedPrice: 2450,
      minPrice: 2100,
      maxPrice: 3000,
      materialCost: 550,
      craftHours: 22,
      hourlyWage: 85,
      etsyBenchmarkUsd: 55,
      etsyBenchmarkInr: 4565,
      pricingRationale: 'Quartz dough and natural oxide pigments (₹550) + 22 hours delicate freehand brushwork and wood-fired kiln supervision. Comparable glazed artisanal vases sell on Etsy and West Elm for $50-$70.'
    },
    currentPrice: 2450,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    externalListings: {
      etsyExportReady: true,
      ondcExportReady: true,
      shopifyExportReady: true,
      suggestedEtsyTitle: 'Handcrafted Jaipur Blue Pottery Flower Vase | Turquoise Botanical Ceramic Decorative Urn for Tabletop',
      etsyTags: ['jaipur blue pottery', 'turquoise ceramic vase', 'handpainted pottery', 'boho home accent', 'indian decor', 'quartz pottery'],
      etsyCategoryPath: 'Home & Living > Home Decor > Vases',
      sku: 'AG-JPR-POT-004'
    },
    createdAt: '2024-03-25'
  }
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    reviewerName: 'Pooja Narang (Mumbai)',
    rating: 5,
    comment: 'The Banarasi saree is beyond breathtaking. You can physically feel the density of the pure mulberry silk and the zari work shines with pure royalty. Ramkishan ji is a true treasure of India.',
    date: '2024-04-10',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    reviewerName: 'Ananya Roy (Kolkata)',
    rating: 5,
    comment: 'Bought this for my sister’s wedding reception. Everyone asked where I found such authentic Kadhwa weave. Desk AI audio description was 100% accurate.',
    date: '2024-04-18',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    reviewerName: 'David Miller (Austin, USA)',
    rating: 5,
    comment: 'Shipped safely in a reinforced tube. The fine line detailing of Sunita Devi’s Madhubani art is even more intricate in person than on screen. Framed it right above my study desk!',
    date: '2024-05-02',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    reviewerName: 'Kavita Subramanian (Bengaluru)',
    rating: 5,
    comment: 'Dhokra art has such a raw, timeless soul. The bell metal has a great heavy feel. So glad the money goes directly to Somaru ji without middleman cuts.',
    date: '2024-05-15',
    verifiedPurchase: true
  }
];

export const SEED_SPONSORSHIPS: SponsorshipGrant[] = [
  {
    id: 'grant-1',
    title: 'National Handloom & Khadi Revival Grant 2026',
    organization: 'Ministry of Textiles, Govt. of India',
    orgType: 'Government Grant',
    grantAmount: '₹1,50,000 to ₹3,00,000 per artisan cluster',
    eligibleCrafts: ['Handloom & Textiles'],
    description: 'Providing direct financial assistance for setting up solar-powered pit looms, purchasing certified mulberry/eri silk yarn, and training master weavers on international e-commerce platforms.',
    targetRegion: 'Uttar Pradesh, Bihar, Assam, West Bengal',
    deadline: '2026-10-31',
    status: 'Open',
    applicationUrl: 'https://handlooms.nic.in/schemes'
  },
  {
    id: 'grant-2',
    title: 'Heritage Craft Preservation & Global Export Fellowship',
    organization: 'Tata Trust Artisans Foundation & ONDC',
    orgType: 'Corporate CSR',
    grantAmount: '₹85,000 direct tool stipend + zero-commission logistics',
    eligibleCrafts: ['Metalcraft & Dhokra', 'Terracotta & Pottery', 'Traditional Painting'],
    description: 'Empowering generational rural artisans with sustainable kiln upgrades, non-toxic pigment research, high-res cataloging, and direct ONDC marketplace listing support.',
    targetRegion: 'Pan-India Tribal & Rural Districts',
    deadline: '2026-11-15',
    status: 'Open',
    applicationUrl: 'https://tatatrusts.org/crafts'
  },
  {
    id: 'grant-3',
    title: 'Women Folk Artists Digital Empowerment Initiative',
    organization: 'SEWA Bharat & Google Arts & Culture Foundation',
    orgType: 'NGO Mission',
    grantAmount: '₹50,000 equipment fund + smartphone + voice-AI training',
    eligibleCrafts: ['Traditional Painting', 'Handloom & Textiles', 'Leather & Jute Crafts'],
    description: 'Special grant designed for women artisans in Mithila, Warli, and Pattachitra folk art traditions to document oral stories and connect directly to buyers through Desk AI.',
    targetRegion: 'Bihar, Odisha, Maharashtra, Gujarat',
    deadline: '2026-10-15',
    status: 'Closing Soon',
    applicationUrl: 'https://sewabharat.org/programs'
  }
];
