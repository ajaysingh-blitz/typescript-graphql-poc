import { z } from 'zod';

const BULK_IMAGE_UPDATE_MEDIA_TYPE = z.enum(['media', 'sizechart']);

export const getCustomerProductsReqBody = z.object({
  short_ids: z
    .string({
      required_error: 'short_ids is required',
      invalid_type_error: 'short_ids must be array of string',
    })
    .array(),
  fields: z.string().array().optional(),
});

export const createCustomerProductReqBody = z.object({
  seller_id: z.string({
    required_error: 'seller_id is required',
    invalid_type_error: 'seller_id must be string',
  }),
  seller_name: z.string({
    required_error: 'seller_name is required',
    invalid_type_error: 'seller_name must be string',
  }),
  product_name: z.string({
    required_error: 'product_name is required',
    invalid_type_error: 'product_name must be string',
  }),
  seller_address: z.string({
    required_error: 'seller_address is required',
    invalid_type_error: 'seller_address must be string',
  }),
  gst: z.number({ required_error: 'gst is required', invalid_type_error: 'gst must be number' }).optional(),
  seller_sku_id: z.string({ invalid_type_error: 'seller_sku_id must be string' }).optional(),
  weight: z.number({
    required_error: 'weight is required',
    invalid_type_error: 'weight must be string',
  }),
  length: z.number({
    required_error: 'length is required',
    invalid_type_error: 'length must be string',
  }),
  breadth: z.number({
    required_error: 'breadth is required',
    invalid_type_error: 'breadth must be string',
  }),
  height: z.number({
    required_error: 'height is required',
    invalid_type_error: 'height must be string',
  }),
  selling_price: z.number({
    required_error: 'selling_price is required',
    invalid_type_error: 'selling_price must be string',
  }),
  quantity: z.number({
    required_error: 'quantity is required',
    invalid_type_error: 'quantity must be string',
  }),
  product_desc: z
    .string({
      invalid_type_error: 'product_desc must be string',
    })
    .optional(),
});

export const deleteCustomerProductreqBody = z.object({
  catalogue_id: z.string({
    required_error: 'catalogue_id is required',
    invalid_type_error: 'catalogue_id must be string',
  }),
  type: z.string().optional(),
  sku_id: z.string().optional(),
});

export const getProductsByProductShortIdsReqBody = z.object({
  short_ids: z
    .string({
      invalid_type_error: 'short Ids must be array of string',
    })
    .array(),
  fields: z
    .string({
      invalid_type_error: 'fields must be array of string',
    })
    .array()
    .optional(),
});

export const getCustomerProductsByShortIdsReqBody = z.object({
  product_short_ids: z.string().array(),
  get_only_active: z.boolean().optional(),
  fields: z.string().array(),
  get_only_visible: z.boolean().optional(),
});

export const getCustomerProductBySellerSkuIdReqParams = z.object({
  sellerSkuId: z.string(),
});

export const getCustomerProductBySellerSkuIdReqQuery = z.object({
  seller_id: z.string(),
  fields: z.string().array().optional(),
});

export const getCustomerSkusBySkuIdReqParams = z.object({
  skuId: z.string(),
});

export const getCustomerProductsBySellerReqBody = z.object({
  seller_sku_ids: z.string().array(),
  seller_id: z.string(),
  fields: z.string().array().optional(),
});

export const checkProductAvailabilityReqQuery = z.object({
  customerSkuShortId: z.string(),
});

const catalogue = z.object({
  en: z.object({
    web: z.object({
      title: z.string(),
      description: z.string().optional(),
      attributes: z.object({
        value: z.string(),
        universal_key: z.string(),
        key: z.string(),
        type: z.string(),
      }),
    }),
  }),
  short_id: z.string().optional(),
  name: z.string(),
  pickup_point: z.string(),
  product_type: z.string().optional(),
  gst: z.number(),
  return_condition: z.string(),
  colour: z.string(),
  seller_sku_id: z.string(),
  amazon_asin_id: z.string(),
  hsn_code: z.number(),
  description: z.string(),
  customisation_page_short_id: z.string(),
  seller_id: z.string(),
  customer_skus: z
    .object({
      _id: z.string().optional(),
      short_id: z.string().optional(),
      weight: z.string(),
      length: z.number(),
      breadth: z.number(),
      height: z.number(),
      volume: z.number(),
      size: z.string(),
      sku_id: z.string(),
      selling_price: z.number(),
      mrp: z.number(),
      cost_price: z.number().optional(),
      quantity: z.number(),
      is_active: z.boolean(),
      is_custom_sku_size: z.boolean().optional(),
    })
    .array(),
  is_custom_product_type: z.boolean().optional(),
  product_attributes: z
    .object({
      generatedKey: z.string().optional(),
      key: z.string(),
      label: z.string(),
      value: z.string(),
    })
    .array()
    .optional(),
  size_chart: z.string().optional(),
  media: z
    .object({
      src_url: z.string(),
      gcs_src_url: z.string().optional(),
      type: z.string(),
      index: z.number(),
    })
    .array()
    .optional(),
  collections_to_add: z.string().array().optional(),
  video_upload_count: z.number(),
  seller_name: z.string().optional(),
  size_type: z.string(),
  internal_display_name: z.string().optional(),
  internal_description: z.string().optional(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  is_oos: z.boolean().optional(),
  gcs_size_chart: z.string().optional(),
  is_active: z.boolean().optional(),
  is_visible: z.boolean().optional(),
  total_images: z.number().optional(),
  success_images: z.number().optional(),
  failure_images: z.number().optional(),
  image_error: z.string().array().optional(),
});

export const createOrEditNuShopCatalogueReqBody = z.object({
  catalogue: catalogue,
  createCatalogue: z.boolean(),
  changedBy: z.string(),
  platform: z.string(),
  sellerAccountStatus: z.string(),
  reportId: z.string(),
  baseUrl: z.string(),
  isDescriptionKeyPresent: z.boolean().optional(),
});

export const createAmazonCatalogueReqBody = z.object({
  catalogue: catalogue,
});

export const updateElasticIdsReqBody = z.object({
  catalogue: catalogue,
  new_elastic_id: z.string(),
});

export const generateReportAndSlackAlertForUpdatePriceAlertReqBody = z.object({
  user_id: z.string(),
  report_id: z.string(),
});

export const getAmazonProductReqQuery = z.object({
  asin: z.string(),
});

export const lowStockAlertReqBody = z.object({
  seller_id: z.string(),
  preferred_oos_quantity: z.number(),
  product_ids: z.string().array(),
});

export const updateCatalogueImagesReqBody = z.object({
  updatedMedia: z
    .object({
      src_url: z.string(),
      gcs_src_url: z.string(),
      preview_url: z.string(),
      thumbnail_url: z.string(),
      type: z.string(),
      index: z.number(),
    })
    .array(),
  catalogueShortId: z.string(),
  updatedSizeChartS3Url: z.string(),
  updatedSizeChartGCSUrl: z.string(),
});

export const retrieveAllProductsReqQuery = z.object({
  seller_id: z.string(),
  fields: z.string().array(),
  retrieve_product_type: z.string(),
});

export const getCustomerProductShortIdReqQuery = z.object({
  fields: z.string().array().optional(),
  lang: z.string().optional(),
});

export const discrepancyStatusChangeReqBody = z.object({
  product_short_ids: z.array(
    z.string({
      invalid_type_error: 'product_short_ids must be array of string',
      required_error: 'product_short_ids is required',
    }),
  ),
});

export const addCatalogueMediaReqParam = z.object({
  catalogue_id: z.string(),
});

export const addCatalogueMediaReqBody = z.object({
  error: z.string().optional(),
  media: z
    .object({
      src_url: z.string(),
      gcs_src_url: z.string(),
      type: z.string(),
      index: z.number(),
      preview_url: z.string(),
      thumbnail_url: z.string(),
    })
    .array()
    .optional(),
  sellerId: z.string(),
  sellerSkuId: z.string(),
});

export const updateCatalogueImagesV2ReqBody = z
  .object({
    media_type: BULK_IMAGE_UPDATE_MEDIA_TYPE,
    updated_media: z.object({
      src_url: z.string(),
      gcs_src_url: z.string(),
      preview_url: z.string(),
      thumbnail_url: z.string(),
      type: z.string(),
      index: z.number(),
    }),
    image_error: z.string(),
    updated_size_chart: z.object({
      s3_url: z.string(),
      gcs_url: z.string(),
    }),
  })
  .partial()
  .refine(data => data.image_error || (data.media_type === 'media' && data.updated_media) || (data.media_type === 'sizechart' && data.updated_size_chart), {
    message: 'Either updated_media if media type is media or updated_size_chart if media type is sizechart should be present.',
  });
