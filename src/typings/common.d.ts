import { ROLES, SELLER_TYPES, userTypesEnum } from '@/constants/enums';
import { CreateOptionals } from './utils/createOptionals';
import { SortOrder } from 'mongoose';

export interface Media {
  src_url: string;
  preview_url: string;
  thumbnail_url: string;
  gcs_src_url: string;
  type: string;
  index: number;
}

interface IPickupAddress {
  _id: string;
  nickname: string; //seller's pickup address
  addr_type: string; // Home, work
  addr: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  contact_number: string;
  country: string;
  is_active: boolean;
  warehouses: {
    tpl_name?: string;
    warehouse_id?: string;
  }[];
}

export type IPickupAddressOptions = CreateOptionals<IPickupAddress>;

export interface IReqUser {
  _id: string;
  type: userTypesEnum;
  role: ROLES[];
  first_name?: string;
  email?: string;
  contact_number: number;
  last_name?: string;
  profile_photo?: string;
  custom_domain?: string;
  preferred_web_prefix?: string;
}

interface IMeta {
  brand_name: string;
  gst_number: string;
}

interface IUserAddress {
  // user address
  addr_type: string; // Home, work
  addr: string;
  house_number: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  contact_number: string;
  country: string;
  is_active: boolean;
}

export type IUserAddressOptions = CreateOptionals<IUserAddress>;

interface IReturnAddress {
  name: string;
  contact_number: string;
  email: string;
  addr: string;
  city: string;
  state: string;
  pincode: string;
}

export type IReturnAddressOptions = CreateOptionals<IReturnAddress>;

interface IBillingAddress {
  // seller billing address
  company_name: string; // seller's company name (ex: nueva)
  contact_number: string;
  email: string;
  addr: string;
  city: string;
  state: string;
  pincode: string;
}

export type IBillingAddressOptions = CreateOptionals<IBillingAddress>;

export interface IUser {
  _id: string;
  first_name: string; // user's first name
  last_name: string; // user's last name
  contact_number: number; // user's contact number
  country_code: number; // user's country code of phone no.
  email: string; // user's email
  username: string; // user's username
  display_name: string; // user's display name
  referral_code: string; // referral code by which user is referred
  referral_source: string; // source of referral
  referral_source_id: string; // id of referral source
  referral_platform: string; // referral platform
  platform: string; // platform from which user is created
  agent_phno: [number]; // agent phn no. (used in vartalap)
  comms_whatsapp_number: number; // default number through which hsms will be sent to user
  type: userTypesEnum; // customer | system | seller
  seller_type: SELLER_TYPES; //type of seller - ecomm/live/self-serve
  role: [string];
  addr_tag_3pl: string; // For seller only in case of ship rocket                                                // access granted over admin, super-admin, seller, catlogue-admin, seller-admin, developer
  address: IUserAddressOptions[];
  pickup_address: IPickupAddressOptions[];
  is_same_return_address: boolean; // false if seller has differnt return address
  return_address: IReturnAddressOptions;
  billing_name: string; // name used for billing invoices.
  billing_address: IBillingAddressOptions;
  additional_login_number: string[]; //additional contact number through which login can be done
  whatsapp_number: number;
  whatsapp_number_set_by: string;
  is_active: boolean;
  auth_token: string; // saving jwt
  slack_member_id: string;
}

export type IFileType = Express.Multer.File;

export type UserOptional = CreateOptionals<IUser>;

export interface GetMultipleUsers {
  users: UserOptional[];
}

export interface GetUserResponse {
  data: UserOptional;
}

export interface ISortType {
  [key: string]: SortOrder;
}

export interface IExtendedError extends Error {
  status?: number;
}

type Entries<T> = {
  [K in keyof T]: [keyof K, T[K]];
}[keyof T][];

export interface IAppConfig {
  dynamic_link_prefix: string;
  apk_package_name: string;
  latest_app_version: string;
  firebase_api_key: string;
}