import { Media } from './common';
import { CreateOptionals } from './utils/createOptionals';

interface IProfilePicture {
  src_url: string;
  preview_url: string;
  thumbnail_url: string;
}

export interface ITestimonial {
  short_id: string;
  seller_id: string;
  name: string;
  profile_pic?: IProfilePicture;
  rating: string;
  review: string;
  tagged_product?: {
    customer_product_short_id: string;
    customer_sku_short_id: string;
  };
  product_types: string[];
  sub_categories: string[];
  categories: string[];
  media?: Media[];
  review_date?: Date;
  city?: string;
  is_visible?: boolean;
  is_active?: boolean;
}

export type TestimonialOptionals = CreateOptionals<ITestimonial>;

export interface ICreateTestimonialData {
  product_types?: string[];
  sub_categories?: string[];
  categories?: string[];
  sellerId: string;
  name: string;
  rating: string;
  review: string;
  city: string;
  review_date: string;
  tagged_product: {
    customer_product_short_id: string;
  };
}
