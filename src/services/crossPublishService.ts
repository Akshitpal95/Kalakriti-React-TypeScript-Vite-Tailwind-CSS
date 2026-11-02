import { Product } from '../types';

export const crossPublishService = {
  /**
   * Generates Etsy-compatible listing payload
   */
  generateEtsyPayload(product: Product) {
    return {
      title: product.externalListings.suggestedEtsyTitle || product.title,
      description: `${product.description}\n\nCraft Details:\n- Material: ${product.material}\n- Technique: ${product.craftsmanshipStyle}\n- Dimensions: ${product.dimensions}\n- Estimated Artisan Crafting Time: ${product.estimatedCraftTime}\n- Care: ${product.careInstructions}\n\nHandmade with pride by ${product.artisanName} in ${product.artisanLocation}, India. Directly supports sustainable village craft revival.`,
      price: product.pricing.etsyBenchmarkUsd,
      currency_code: 'USD',
      quantity: 1,
      taxonomy_id: product.externalListings.etsyCategoryPath,
      who_made: 'i_did',
      is_customizable: true,
      is_supply: false,
      when_made: 'made_to_order',
      materials: [product.material, ...product.colors],
      tags: product.externalListings.etsyTags.slice(0, 13),
      sku: product.externalListings.sku,
      shipping_profile: 'Standard International Insured Artisan Express (7-12 days)',
      processing_min: 3,
      processing_max: 7
    };
  },

  /**
   * Generates ONDC (Open Network for Digital Commerce) handicraft protocol item
   */
  generateONDCPayload(product: Product) {
    return {
      context: {
        domain: 'nic2004:52110', // Retail - Handicrafts & Handlooms
        country: 'IND',
        city: 'std:0542', // Varanasi / Origin standard
        action: 'on_search',
        core_version: '1.2.0'
      },
      message: {
        catalog: {
          bpp_descriptor: {
            name: "Kalakriti",
            symbol: "🏺"
          },
          bpp_providers: [
            {
              id: product.artisanId,
              descriptor: {
                name: product.artisanName,
                short_desc: product.artisanLocation
              },
              items: [
                {
                  id: product.id,
                  descriptor: {
                    name: product.title,
                    code: product.externalListings.sku,
                    long_desc: product.description,
                    images: product.images
                  },
                  price: {
                    currency: 'INR',
                    value: product.currentPrice.toString()
                  },
                  category_id: product.category,
                  tags: {
                    odop: 'true',
                    handmade: 'true',
                    gi_tagged: product.isVerifiedArtisan ? 'true' : 'false'
                  }
                }
              ]
            }
          ]
        }
      }
    };
  },

  generateShopifyPayload(product: Product) {
    return {
      Handle: product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      Title: product.title,
      Body_HTML: `<p>${product.description}</p><p><strong>Craft:</strong> ${product.craftsmanshipStyle}</p><p><strong>Dimensions:</strong> ${product.dimensions}</p><p><strong>Artisan:</strong> ${product.artisanName} (${product.artisanLocation})</p>`,
      Vendor: product.artisanName,
      Type: product.category,
      Tags: product.externalListings.etsyTags.join(', '),
      Variant_Price: product.currentPrice,
      Variant_SKU: product.externalListings.sku,
      Images: product.images.map(src => ({ src }))
    };
  },

  generateWooCommercePayload(product: Product) {
    return {
      name: product.title,
      type: "simple",
      regular_price: product.currentPrice.toString(),
      description: `<p>${product.description}</p><p><strong>Craft Technique:</strong> ${product.craftsmanshipStyle}</p><p><strong>Care:</strong> ${product.careInstructions}</p>`,
      short_description: `${product.craftsmanshipStyle} handcrafted by ${product.artisanName} in ${product.artisanLocation}.`,
      sku: product.externalListings.sku,
      manage_stock: true,
      stock_quantity: 1,
      categories: [{ name: product.category }],
      images: product.images.map(src => ({ src })),
      attributes: [
        { name: "Material", visible: true, options: [product.material] },
        { name: "Dimensions", visible: true, options: [product.dimensions] },
        { name: "Craft Hours", visible: true, options: [`${product.craftHours} hrs`] },
        { name: "GI Provenance", visible: true, options: [product.artisanLocation] }
      ]
    };
  },

  downloadListingJSON(product: Product, platform: 'etsy' | 'ondc' | 'shopify' | 'woocommerce'): void {
    let data: any;
    let filename = '';

    if (platform === 'etsy') {
      data = this.generateEtsyPayload(product);
      filename = `etsy-listing-${product.externalListings.sku}.json`;
    } else if (platform === 'ondc') {
      data = this.generateONDCPayload(product);
      filename = `ondc-catalog-${product.externalListings.sku}.json`;
    } else if (platform === 'woocommerce') {
      data = this.generateWooCommercePayload(product);
      filename = `woocommerce-product-${product.externalListings.sku}.json`;
    } else {
      data = this.generateShopifyPayload(product);
      filename = `shopify-product-${product.externalListings.sku}.json`;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
