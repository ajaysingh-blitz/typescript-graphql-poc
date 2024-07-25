export interface IFiltersQuery {
  is_active: boolean;
  seller_id: string;
  internal_display_name?: RegExp;
  product_type?: { $in: string[] };
  is_visible?: { $in: boolean[] };
  customer_skus?: { $not: { $elemMatch: { quantity: { $gt: number } } } } | { $elemMatch: { quantity: { $gt: number }; is_active: boolean } };
  'customer_skus.is_active'?: boolean;
}
