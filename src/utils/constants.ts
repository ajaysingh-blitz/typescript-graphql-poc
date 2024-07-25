export const ROLES = {
  CUSTOMER_CARE: 'customer-care',
  CHAT_AGENT: 'chat-agent',
  INVENTORY_MGMT: 'inventory-mgmt',
  CATALOGUE_DESCRIPTION: 'catalogue-description',
  CATALOGUE_INVENTORY_MGMT: 'catalogue-inventory-mgmt',
  CATALOGUE_HEAD: 'catalogue-head',
  CATALOGUE_MEDIA: 'catalogue-media',
  SCREEN_MGMT: 'screen-mgmt',
  SELLER_MGMT: 'seller-mgmt',
  RESELLER_MGMT: 'reseller-mgmt',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  SELLER: 'seller',
  CUSTOMER_SEARCH_ADMIN: 'customer-search-admin',
  SELLER_ADMIN: 'seller-admin',
  DEVELOPER: 'developer',
  SELLER_SUPER_ADMIN: 'seller-super-admin', // only seller super admins can edit the seller data from dashboard
};

export const SELLER_COLLECTION_TYPES = {
  BULK_UPLOAD: 'bulk_upload',
  CATEGORY_FILTERS: 'category_filters',
  CATALOGUES_SELECTION: 'catalogues_selection',
};

/**
 * Defines where the page will appear on app/web. Is stored in page_type field of Page collection.
 */
export const PAGE_TYPES = {
  HOME_PAGE: 'home_page',
  PRODUCT_PAGE: 'product_page',
  FEATURED_PAGE: 'featured_page',
  ORDER_STATUS_PAGE: 'order_status_page',
  CUSTOMISATION_CATALOGUE: 'customisation_catalogue',
};

export const BULK_DELETION_FIELDS = [
  'Product Code',
  'Image 1',
  'Image 2',
  'Image 3',
  'Image 4',
  'Image 5',
  'Image 6',
  'Image 7',
  'Image 8',
  'Image 9',
  'Image 10',
  'Video 1',
  'Video 2',
  'Size Chart',
  'Amazon ASIN',
  'HSN Code',
  'Description',
];