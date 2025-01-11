export const ProductsQuery = `*[_type == "products"] {
  _id,
  name,
  price,
  discount,
  "productImage": productImage.asset->url,
  "categories": categories[]->title,
  isFeatured,
  isBestSeller,
  isAvailable,
  "slug":slug.current,
}
`;

export const GetCategoryProductsQuery = (
  category: string
) => `*[_type == "products" && "${category}" in categories[]->title] {
  _id,
  name,
  price,
  discount,
  "productImage": productImage.asset->url,
  "categories": categories[]->title,
  isFeatured,
  isBestSeller,
  isAvailable,
  "slug":slug.current,
}`;

export const GetAProductQuery = (id: string) =>
  `*[_type == "products" && _id == "${id}"][0] {
  _id,
  name,
  description,
   isCustomizeable,
  "sizes":sizes[] -> {name,size},
  "colors":colors[] -> {name,color},
  fullDescription,
  price,
  discount,
  "productImage": productImage.asset->url,
  "productImages": productImages[].asset->url,
  "categories": categories[]->title,
  productUniqueId,
  isFeatured,
  isBestSeller,
  reviews[] {
    reviewer,
    rating,
    comment
  },
  isAvailable,
  sold,
  tags,
  createdAt,
  updatedAt
}
`;

export const searchAProducutQuery = (
  searchString: string
) => `*[_type == "products" && (name match "*${searchString}*" || "${searchString}" in tags)] {
  _id,
  name,
  tags
}

`;

export const LegalTermsQuery = `*[_type == "legal"] {
  _id,
  name,
  returnPolicy,
    shippingPolicy,
    privacyPolicy,
    termsAndConditions
}`;

export const AboutQuery = `*[_type == "about"] {
  _id,
  name,
  aboutUs,
  contactUs
}`;


export const GetCategoryQuery = `*[_type == "category"] {
  _id,
  title,
  "slug":slug.current,
  "image":image.asset->url
}[0...4]`;

export const GetAllCategoryQuery = `*[_type == "category"] {
  _id,
  title,
  "slug":slug.current,
  "image":image.asset->url
}`;
