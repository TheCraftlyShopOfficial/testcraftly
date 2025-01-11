interface MiniProduct {
  _id: string;
  productImage: string;
  name: string;
  catagories: string;
  discount: string | number;
  isAvailable: boolean;
  isDraft: boolean;
}

export type { MiniProduct };
