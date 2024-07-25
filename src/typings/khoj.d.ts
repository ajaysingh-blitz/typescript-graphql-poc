export interface IAovBucket {
  aov_bucket_range: string;
  aov_bucket_form_data: {
    cancellation: number;
    rto: number;
    marketing_cost: number;
    profit: number;
    round_off_to_nearest: string;
    logistic_charge_type: string;
    below_two_kg: string;
    two_to_five_kg: string;
    five_to_ten_kg: string;
    above_five_kg: string;
  };
}

export type IProductCategoryAOV = IProductCategoryWiseAOVBucket & { aov_bucket_data: IAovBucket[] };

export interface IProductCategoryWiseAOVBucket {
  product_category: string;
  aov_bucket: string[];
}

export interface IProductCategoryAOVResponse {
  available_product_category_and_aov_bucket: IProductCategoryWiseAOVBucket[];
}
