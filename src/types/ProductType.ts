interface Product {
  _id: string; // Unique identifier for the product
  slug: string;
  name: string;
  fullDescription: string;
  isCustomizeable: boolean;
  sizes: { name: string; size: string }[] | null;
  colors: { name: string; color: string }[] | null;
  description: string;
  price: number;
  discount: number;
  productImage: string; // URL of the main product image
  productImages: string[]; // Array of URLs for additional product images
  categories: string[]; // Array of category names
  productUniqueId: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  reviews?: Review[]; // Optional, as it may not always have reviews
  isAvailable: boolean;
  sold?: number; // Optional, as it may not always be specified
  tags?: string[]; // Optional, as it may not always be specified
  createdAt?: string; // ISO 8601 datetime string, optional
  updatedAt?: string; // ISO 8601 datetime string, optional
}

interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export type { Product, Review };

// Additional types for other components that use this Product type
