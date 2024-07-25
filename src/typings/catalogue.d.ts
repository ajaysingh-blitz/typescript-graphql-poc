import { ROLES } from '@/constants/enums';
import { GetCsvForDownloadRequestQuery } from '@/controllers/typings/catalogue.controller';
import { ICustomerProduct, ICustomerSku } from '@/interfaces/customerProduct.interface';
import { Schema } from 'mongoose';
import { CreateOptionals } from './utils/createOptionals';
import { ICreateCataloguetype } from './customerProduct';
import { IFileType, Media } from './common';

export interface ICreateCatalogueData {
  en: {
    web: {
      title: string;
      description?: string;
      attributes: {
        value: string;
        universal_key: string;
        key: string;
        type: string;
      };
    };
  };
  short_id?: string;
  name: string;
  pickup_point: string;
  product_type?: string;
  gst: number;
  return_condition: string;
  colour: string;
  seller_sku_id: string;
  amazon_asin_id: string;
  hsn_code: number;
  description: string;
  customisation_page_short_id: string;
  seller_id: string;
  customer_skus: ICustomerSku[];
  is_custom_product_type?: boolean;
  product_attributes?: {
    generatedKey?: string;
    key: string;
    label: string;
    value: string;
  }[];
  size_chart?: string;
  media?: {
    src_url: string;
    gcs_src_url?: string;
    type: string;
    index: number;
  }[];
  collections_to_add?: string[];
  video_upload_count: number;
  seller_name?: string;
  size_type: string;
  internal_display_name?: string;
  internal_description?: string;
  category?: string;
  sub_category?: string;
  is_oos?: boolean;
  gcs_size_chart?: string;
  is_active?: boolean;
  is_visible?: boolean;
  creation_source?: string;
  has_discrepancy: boolean;
  total_images?: Number;
  success_images?: Number;
  failure_images?: Number;
  image_error?: string[];
}

//getCatalogues type
export interface getCatalogueDataResponse {
  _id: Schema.Types.ObjectId;
  customer_product_short_id: string;
  customer_sku_short_id: string;
  product_id: string;
  sku_id: string;
  available_quantity: number;
  size: string;
  color: string;
  price: string;
  price_numeric: number;
  title: string;
  image_url: string;
  selected_quantity: string;
  total_price: string;
  discount: string;
  discount_type: string;
  weight: string;
}

export interface getCatalogueQueryData {
  name: string;
  seller_sku_id: string;
  page_no: string;
  page_size: string;
  grouped_product_id?: string;
  is_visible?: boolean;
  offset: string;
  seller_id: string;
}

// getCatalogues response for search api
export interface getCatalogueResponseType {
  catalogues: getCatalogueDataResponse[];
  meta: { count: number; has_more: boolean; offset: number };
}

export interface calculateProductResponseType {
  catalogues: getCatalogueDataResponse[];
  bill: {
    total_discount: string;
    total_selling_price: string;
    final_selling_price: string;
  };
  invalid_items_count: number;
}

export interface getUpdatedPlaceOrderProductsReqBodyType {
  added_products: billCalAllProductReqBody[];
  payment_mode?: string;
}

export interface billCalAllProductReqBody {
  quantity: string;
  discount_type: string;
  discount: string;
  action: string;
  customer_sku_short_id: string;
  customer_product_short_id: string;
}

export interface IGetCsvForDownload {
  sellerId: string | null;
  needSellerIdInCSV: boolean;
  reqQuery: GetCsvForDownloadRequestQuery;
  role: ROLES[];
  _id: string;
}

export interface IFormattedGroupedCatalogues {
  grouped_product_id: string;
  selectedCatalogues: ICustomerProduct[];
}

export interface IWaitTime {
  CREATE_CATALOGUES?: {
    start_time: number;
    wait_time: number;
  };
  BULK_UPDATE_IMAGES?: {
    start_time: number;
    wait_time: number;
  };
  BULK_UPDATE_VIDEOS?: {
    start_time: number;
    wait_time: number;
  };
  BULK_GROUP_CATALOGUE?: {
    start_time: number;
    wait_time: number;
  };
  DELETE_CATALOGUE_COLUMN_DATA?: {
    start_time: number;
    wait_time: number;
  };
  DELETE_CATALOGUE?: {
    start_time: number;
    wait_time: number;
  };
}

export interface IFormattedCatalogue {
  'Product Code': string;
  'Amazon ASIN': string;
  Name: string;
  'Sku Id': string;
  'Selling Price': number;
  'Cost Price': number;
  MRP: number;
  Quantity: number;
  'Packaging Length (in cm)': number;
  'Packaging Breadth (in cm)': number;
  'Packaging Height (in cm)': number;
  'Packaging Weight (in kg)': string;
  'GST %': number;
  'Image 1': string;
  'Image 2': string;
  'Image 3': string;
  'Image 4': string;
  'Image 5': string;
  'Image 6': string;
  'Image 7': string;
  'Image 8': string;
  'Image 9': string;
  'Image 10': string;
  'Video 1': string;
  'Video 2': string;
  'Product Type': string;
  Size: string;
  'Size Type': string;
  Colour: string;
  Description: string;
  'Return/Exchange Condition': string;
  Visibility: boolean;
  'Size Chart': string;
  'Pickup Point': number;
  'Customisation Id': string;
}

export interface IGetCsvQuery {
  is_active: boolean;
  is_visible: string;
  seller_id?: string;
  internal_display_name?: string;
  short_id?: string;
  seller_sku_id?: string;
  customer_skus?: string;
  createdAt?: Date;
  grouped_product_id?: string;
  product_type?: string;
  pickup_point?: string;
}

export interface IBulkCsvData extends IFormattedCatalogue {
  'HSN Code': string;
  'attr1_Attribute Name': string;
  'attr2_Attribute Name': string;
  'attr3_Attribute Name': string;
  'attr4_Attribute Name': string;
  'attr5_Attribute Nam': string;
  collection_1: string;
  collection_2: string;
  collection_3: string;
}

export interface IBulkImageUpdateData {
  'Product Code': string;
  'Image 1': string;
  'Image 2': string;
  'Image 3': string;
  'Image 4': string;
  'Image 5': string;
  'Image 6': string;
  'Image 7': string;
  'Image 8': string;
  'Image 9': string;
  'Image 10': string;
  'Size Chart': string;
}

export interface IBulkVideoUpdateData {
  'Product Code': string;
  'Video 1': string;
  'Video 2': string;
}

export interface IBulkDeleteData {
  'Product Code': string;
  'SKU ID': string;
  "Action (use 'del' keyword)": string;
}

export interface IBulkUploadQuantity {
  'Product Code': string;
  'SKU ID': string;
  Quantity: string;
}

export interface IBulkUploadWeightAndDimentionData {
  'Product Code': string;
  'SKU ID': string;
  'Weight (in kg)': string;
  'Length (in cm)': string;
  'Breadth (in cm)': string;
  'Height (in cm)': string;
}

export interface IBulkCatalogueDeleteData {
  productCode: string;
  skuCodes: string[];
}

export interface IBulkInventoryData {
  productCode?: string;
  skus?: {
    skuCode: string;
    quantity: number;
  }[];
}

export interface IBulkImageUpdateErrorEnrichedData extends IBulkImageUpdateData {
  errors: string[] | string;
}

export interface IBulkVideoUpdateErrorEnrichedData extends IBulkVideoUpdateData {
  errors: string[] | string;
}

export interface IBulkCatalogueDeleteErrorEnrichedData extends IBulkDeleteData {
  errors: string[] | string;
}

export interface IBulkUploadQuantityErrorEnrichedData extends IBulkUploadQuantity {
  errors: string[] | string;
}

export interface IBulkUploadWeightAndDimentionErrorEnrichedData extends IBulkUploadWeightAndDimentionData {
  errors: string[] | string;
}

export interface IBulkCatalogueErrorEnrichedData extends IBulkCsvData {
  row_number: number;
  errors: string[] | string;
}

export interface IBulkCatalogueHeaderConfig {
  header: string;
  primaryKey?: boolean;
  assocPaths: (string | number)[][];
  length?: number;
  required?: boolean;
  requiredForAmazonUpload?: boolean;
  skipInSampleCSV?: boolean;
  minLength?: number;
  allowedRange?: [number, number];
  allowedValues?: string[];
  maxLength?: number;
  validator?: ({ val, sku }: { val: string; sku: object }) => boolean | string;
  valueFormatter?: (value: string) =>
    | {
        src_url: string;
        preview_url: string;
        thumbnail_url: string;
        type: string;
      }
    | ((value: string) => number)
    | ((value: string) => boolean);
  validateMediaUrl?: boolean;
  toLowerCase?: boolean;
  allowedFormat?: RegExp;
}

export interface IPublishCatalogueUpload {
  catalogue: CreateOptionals<ICreateCataloguetype>;
  createCatalogue: boolean;
  reportId: string;
  userId: string;
  bucketType: string;
  changedBy: string;
  platform: string;
  sellerAccountStatus: string;
  baseUrl: string;
  isDescriptionKeyPresent: boolean;
}

export interface IPublishCatalogueImageUpload {
  catalogue: ICustomerProduct;
  images: string[];
  sizeChart: string;
  reportShortId: string;
  userId: string;
  bucketType: string;
}

export interface IPublishCatalogueVideoUpload {
  catalogue: ICustomerProduct;
  videos: string[];
  reportShortId: string;
  userId: string;
  bucketType: string;
}

export interface IPublishSendSMS {
  content: {
    customer_contact_number: string;
    template_id: string;
    template_arguments: {
      seller_name: string;
      product_count: string;
    };
    customer_id: string;
    user_type: string;
  };
}

export interface IPublishCatalogueBulkDelete {
  catalogue: ICustomerProduct;
  skuIds: string[];
  type: string;
  reportShortId: string;
  userId: string;
  sellerId: string;
  bucketType: string;
}

export interface IPublishInventoryBulkUpload {
  catalogue: ICustomerProduct;
  skus: { skuCode: string; quantity: number }[] | { skuCode: string; height: number; length: number; breadth: number; weight: number }[];
  type: string;
  report_short_id: string;
  user_id: string;
  seller_id: string;
  bucket_type: string;
}

export interface IPublishCatalogueVideoUploadMessage {
  catalogue: ICustomerProduct;
  videos: string[];
  report_short_id: string;
  user_id: string;
  bucket_type: string;
}

export interface IPublishCatalogueBulkDeleteMessage {
  catalogue: ICustomerProduct;
  sku_ids: string[];
  type: string;
  report_short_id: string;
  user_id: string;
  seller_id: string;
  bucket_type: string;
}

export interface IPublishInventoryBulkUploadMessage {
  catalogue: ICustomerProduct;
  type: string;
  skus: { skuCode: string; quantity: number }[] | { skuCode: string; height: number; length: number; breadth: number; weight: number }[];
  report_short_id: string;
  user_id: string;
  seller_id: string;
  bucket_type: string;
}

export interface IFiles {
  images: IFileType[];
  sizeChart: IFileType[];
}

export interface ISellerInfo {
  data: {
    seller: {
      _id: string;
      contact_number: string;
      billing_address: {
        company_name: string;
      };
      settings: {
        list_on_wmall: string;
      };
      first_name: string;
      last_name: string;
      wmall_registered_seller_id: string;
      growthConsultant: string;
      websiteName: string;
      displayName: string;
      custom_domain: string;
    };
    seller_payment_details: {
      gst_no: string;
    };
  };
}
export interface IUpdatePriceCsvData {
  'Seller Id': string;
  'Seller Name': string;
  'Product Code': string;
  'SKU ID'?: string;
  'Field Category'?: string;
  'Field Changed'?: string;
  'Initial Value'?: string | number | boolean;
  'Final Value'?: string | number | boolean;
  'Product Link'?: string | string;
  'Updated at'?: Date;
}

export interface IGetGroupedCatalogues {
  page_no: string;
  page_size: string;
  name?: string;
  seller_sku_id?: string;
  role: ROLES;
  _id: string;
  userType: string;
  preferredWebPrefix: string;
  customDomain: string;
}

export interface IFormattedBulkCatalogue {
  [key: string]: boolean | number | string | undefined;
}

export interface IformatCatalogueObject {
  catalogue: ICustomerProduct;
  sku: ICustomerSku;
  index: number;
  images: Media[];
  videos: Media[];
  indexOfPickupAddress: number;
  csvColumns?: string[];
}

export interface IFormatBulkCatalogueDataObject {
  catalogues: ICustomerProduct[];
  pickupAddressIds: string[];
  csvColumns?: string[];
}
