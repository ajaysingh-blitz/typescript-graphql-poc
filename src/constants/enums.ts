export enum ProductReviewStars {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export enum ProductReviewPlatform {
  Amazon = 'amazon',
  Google = 'google',
  Meesho = 'meesho',
  Flipkart = 'flipkart',
  Others = 'others',
  WhatsApp = 'whatsapp',
}

export enum userTypesEnum {
  SELLER = 'seller',
  SYSTEM = 'system',
  CUSTOMER = 'customer',
}

export enum ROLES {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin',
  SELLER = 'seller',
  FINANCE_MANAGER = 'finance-manager',
}

export enum SELLER_TYPES {
  ECOMM = 'ecomm',
  LIVE = 'live',
  SELF_SERVE = 'self-serve',
}

export enum requestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * Bulk Upload or Update Catalogue Type
 */
export enum catalogueUploadTypeEnum {
  UPDATE = 'update',
  CREATE = 'create',
}

/**
 * Bulk Upload or Update Catalogue Type
 */
export enum bulkUploadCatalogueUploadTypeEnum {
  CREATE_CATALOGUES = 'CREATE_CATALOGUES',
  BULK_UPDATE_IMAGES = 'BULK_UPDATE_IMAGES',
  BULK_UPDATE_VIDEOS = 'BULK_UPDATE_VIDEOS',
  BULK_GROUP_CATALOGUE = 'BULK_GROUP_CATALOGUE',
  DELETE_CATALOGUE_COLUMN_DATA = 'DELETE_CATALOGUE_COLUMN_DATA',
  DELETE_CATALOGUE = 'DELETE_CATALOGUE',
}

/**
 * Bulk Upload or Update Catalogue Report Type
 */
export enum catalogueReportTypeEnum {
  PRODUCT_BULK_UPLOAD = 'product_bulk_upload',
  PRODUCT_BULK_DELETE = 'product_bulk_delete',
  IMAGES_BULK_UPLOAD = 'image_bulk_upload',
  VIDEOS_BULK_UPLOAD = 'video_bulk_upload',
  QUANTITY_BULK_UPLOAD = 'quantity_bulk_upload',
  WEIGHT_DIMENSION_BULK_UPLOAD = 'weight_dimention_bulk_upload',
  AMAZON_BULK_UPLOAD = 'amazon_bulk_upload',
}

export enum nushopCatalogueSellerwiseBucketsEnum {
  IMAGES = 'images',
  BULK_UPLOAD = 'bulk_upload',
  VIDEOS = 'videos',
}

// Possible report statuses
export enum reportStatusEnum {
  PENDING = 'pending',
  COMPLETE = 'complete',
  FAILED = 'failed',
}

export enum catalgoueStatusEnum {
  TODO = 'to-do',
  COMPLETED = 'completed',
}
