import { ICustomerProduct } from '@/interfaces/customerProduct.interface';
import { CreateOptionals } from './utils/createOptionals';
import { Media } from './common';

export interface ICustomerProductPayload {
  seller_id: string;
  seller_name: string;
  product_name: string;
  seller_address: string;
  gst: boolean;
  seller_sku_id?: string;
  weight: string;
  length: string;
  breadth: string;
  height: string;
  selling_price: string;
  quantity: string;
  product_desc: string;
}

export interface ICustomerSkuType {
  short_id: string;
  weight: number;
  length: number;
  breadth: number;
  height: number;
  selling_price: number;
  quantity: number;
  sku_id?: string;
  mrp?: string | number;
  size?: string;
  cost_price?: string;
}

export interface ICreateCataloguetype {
  _id?: string;
  seller_id: string;
  seller_name: string;
  internal_display_name: string;
  is_oos: boolean;
  pickup_point: string;
  gst: number;
  seller_sku_id: string;
  customer_skus: ICustomerSkuType[];
  en: ILauguageType;
  media: IMediaType[];
  size_type: string;
  short_id: string;
  colour: string;
  is_active: boolean;
  is_visible: boolean;
  product_attributes: IAttributesType[];
  collections_to_add: string[];
  size_chart: string | { src_url: string };
  customisation_page_short_id: string | null;
  wmall_registered_seller_id?: string;
}

interface IAttributesType {
  universal_key?: string;
  key?: string;
  value?: string;
  type?: string;
}

interface ILauguageType {
  web: {
    title?: string;
    description?: string;
    attributes?: IAttributesType[];
  };
}

interface IMediaType {
  src_url: string;
  gcs_src_url?: string;
  type: string;
  index: number;
}

export interface IGetCatalogueContentCustomerSkuType {
  is_active: boolean;
  quantity: number;
  colour: string;
  size: string;
}

export interface IGetCustomerProductResponse {
  title: string;
  description: string;
  size_text: string;
  size_share_message: string;
  color_text: string;
  color_share_message: string;
}

export interface ICatalogueGroupType {
  group_short_id?: string;
  groupId: string;
  sellerId: string;
  productCodes: string[];
}

export interface ICustomerProductsMap {
  [x: string]: ICustomerProduct;
}

export interface IGroupReportType {
  product_id: string;
  group_id: string;
  status: string;
  failure_reason: string;
}

interface ICustomerSkuTypeForValidation {
  generatedKey: string;
  _id: string;
  short_id: string;
  weight: string;
  length: number;
  breadth: number;
  height: number;
  volume: number;
  size: string;
  sku_id: string;
  selling_price: number;
  mrp: number;
  cost_price: number;
  quantity: number;
  is_active: boolean;
  is_custom_sku_size: boolean;
}

interface ICatalogueMedia {
  error: string;
  catalogueId: string;
  mediaObj: Media[];
  sellerId?: string;
  sellerSkuId?: string;
}

interface IUploadCatalogueMedia {
  catalogueId: string;
  mediaObj: Media[];
}

export type customerSkuTypeForValidationOptional = CreateOptionals<ICustomerSkuTypeForValidation>;
export type CreateCatalogueTypeOptional = CreateOptionals<ICreateCataloguetype>;
