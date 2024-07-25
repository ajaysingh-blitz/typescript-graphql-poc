export interface ICategoryMasterParsedData {
  'Category-Name': string;
  'Sub-Category': string;
  'Product-Type': string;
}

export interface IStoreEntry {
  type: 'category' | 'sub_category' | 'product_type';
  display_value: string;
  category_key?: string;
  sub_category_key?: string;
}
