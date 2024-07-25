import { ProductReviewPlatform, ProductReviewStars } from '@/constants/enums';
import { CreateOptionals } from './utils/createOptionals';
import { CustomerFeedbackFiltersType } from '@/interfaces/productReview.interface';

export interface IProductReview {
  short_id: string;
  platform_review_id?: string;
  seller_id: string;
  customer_product_short_id: string;
  customer_name?: string;
  customer_image?: string;
  stars: ProductReviewStars;
  review_heading?: string;
  review_description?: string;
  review_date: Date;
  media?: {
    index: number;
    type: 'image';
    src_url: string;
    preview_url?: string;
    thumbnail_url?: string;
  }[];
  review_platform: ProductReviewPlatform;
  is_visible?: boolean;
  seller_group_id?: string;
  rating_type?: 'nps' | 'star';
}

export interface IFormattedFeedbackData {
  product_name: string;
  product_code: string;
  product_image: {
    baseURL?: string;
    previewURL?: string;
    thumbnailURL?: string;
  };
  avg_rating: string;
  total_rating_count: number;
  five_star: number;
  four_star: number;
  three_star: number;
  two_star: number;
  one_star: number;
}

type Media = {
  _id: string;
  src_url: string;
  index: number;
  type: string;
};

export interface IFormattedImageFeedbackData {
  seller_group_id?: string;
  stars: number;
  review_date: string;
  customer_media: string[];
  catalogue_media: string[];
  product_name: string;
  product_code: string;
}

export type IFormattedFeedbackDataReport = {
  'Product Name': string;
  'Product Code': string;
  'Average Ratings': string;
  'Total Ratings': number;
  'Five Star': number;
  'Four Star': number;
  'Three Star': number;
  'Two Star': number;
  'One Star': number;
};

export type IGenerateCustomerFeedBackReport = {
  filters: CustomerFeedbackFiltersType;
  report_short_id: string;
  sellerId: string;
};

export type IGenerateAllProductReviewsReport = {
  report_short_id: string;
  sellerId: string;
};

export type UpdateReviewVisibiltyPayload = {
  short_id: string;
  seller_id: string;
  is_visible: boolean;
};

export interface IFeedbackRatings {
  rating_breakdown: {
    five_star: number;
    four_star: number;
    three_star: number;
    two_star: number;
    one_star: number;
  };
}

type IProductReviewOptionals = CreateOptionals<IProductReview>;
