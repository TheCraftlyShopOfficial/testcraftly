interface BannerType {
  _id: string;
  bannerImage: string;
  bannerLink: string;
  bannerText: string;
  isMainImage: boolean;
  createdAt: Date;
  bannerImageHash: string;
  phoneBannerImage: string;
  phoneBannerImageHash: string;
}

export type { BannerType };
