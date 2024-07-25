import { z } from 'zod';

const CsvDownloadColumns = z.enum(['product_attributes', 'media', 'product_type', 'colour', 'description', 'size_chart', 'customisation_id', 'none']);

export const getCataloguesQuery = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be string',
    })
    .optional(),
  seller_sku_id: z
    .string({
      invalid_type_error: 'seller_sku_id must be string',
    })
    .optional(),
  page_no: z.string({ invalid_type_error: 'page_no must be string' }).optional(),
  page_size: z.string({ invalid_type_error: 'page_size must be string' }).optional(),
  grouped_product_id: z.string({ invalid_type_error: 'grouped_product_id must be string' }).optional(),
  is_visible: z.boolean({ invalid_type_error: 'is_visible must be boolean' }).optional(),
  offset: z.string().optional(),
});

export const billCalculateAllProducts = z.object({
  quantity: z.string({
    required_error: 'quantity must be required',
    invalid_type_error: 'quantity must be a number',
  }),
  discount_type: z
    .string({
      invalid_type_error: 'discount_type must be a string',
    })
    .optional(),
  discount: z
    .string({
      invalid_type_error: 'discount must be a number',
    })
    .optional(),
  action: z
    .string({
      invalid_type_error: 'action must be a string',
    })
    .optional(),
  customer_sku_short_id: z.string({
    required_error: 'customer_sku_short_id must be required',
    invalid_type_error: 'customer_sku_short_id must be a string',
  }),
  customer_product_short_id: z.string({
    required_error: 'customer_product_short_id must be required',
    invalid_type_error: 'customer_product_short_id must be a string',
  }),
});

export const getUpdatedPlaceOrderProductsReqBody = z.object({
  added_products: billCalculateAllProducts.array(),
  payment_mode: z.string({ invalid_type_error: 'action must be a string' }).optional(),
});

export const getPaginatedOOSSkusReqQuery = z.object({
  page_no: z.string().optional(),
  page_size: z.string().optional(),
  preferred_oos_quantity: z.string().optional(),
});

export const skusData = z
  .object({
    _id: z.string(),
    quantity: z.number(),
    size: z.string(),
  })
  .array();

export const updateSkuBody = z.object({
  sku_data: skusData,
});

export const getCatalogue = z.object({
  short_id: z.string(),
});

export const createCatalogueReqBody = z.object({
  catalogue_data: z.string(),
});

export const getCsvForDownloadRequestQuery = z
  .object({
    name: z.string(),
    seller_sku_id: z.string(),
    is_oos: z.string(),
    date_range: z.string().array(),
    seller_id: z.string(),
    grouped_product_id: z.string(),
    is_visible: z.string(),
    sort_by: z.string(),
    product_types: z.string().array(),
    catalogue_link: z.string(),
    sku_id: z.string(),
    pickup_point: z.string().optional(),
    csv_columns: CsvDownloadColumns.array().optional(),
  })
  .partial();

export const createCatalogueGroupRequestBody = z.object({
  selected_catalogue_short_ids: z.string().array(),
});

export const updateSkuQuantityRequestBody = z.object({
  catalogue_short_id: z.string(),
  sku_short_id: z.string(),
  quantity: z.number(),
});

export const editGroupedCatalogueDataRequestBody = z.object({
  removed_catalogue_short_ids: z.string().array(),
  selected_catalogue_short_ids: z.string().array(),
});

export const editGroupedCatalogueByIdRequestParams = z.object({
  grouped_catalogue_id: z.string(),
});

export const syncCatalogueRequestParams = z.object({
  short_id: z.string(),
});

export const updateCatalogueReqParams = z.object({
  catalogue_id: z.string(),
});

export const changeCatalogueVisibilityReqParams = z.object({
  customerProductShortId: z.string(),
});

export const changeCatalogueVisibilityReqBody = z.object({
  is_visible: z.boolean(),
});

export const deleteGroupedCataloguesReqParams = z.object({
  grouped_catalogue_id: z.string(),
});

export const getSellerCataloguesReqQuery = z.object({
  name: z.string().optional(),
  seller_sku_id: z.string().optional(),
  is_oos: z.string().optional(),
  date_range: z.string().array().optional(),
  page_no: z.string(),
  page_size: z.string(),
  grouped_product_id: z.string().optional(),
  is_visible: z.string().optional(),
  sort_by: z.string().optional(),
  product_types: z.string().array().optional(),
  catalogue_link: z.string().optional(),
  sku_id: z.string().optional(),
  pickup_point: z.string().optional(),
  seller_id: z.string().optional(),
});

export const getGroupedCataloguesReqQuery = z.object({
  page_no: z.string(),
  page_size: z.string(),
  name: z.string().optional(),
  seller_sku_id: z.string().optional(),
});

export const permanentDeleteCatalogueRequestParams = z.object({
  shortId: z.string(),
});
