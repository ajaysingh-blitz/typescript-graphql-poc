import { z } from 'zod';

export const downloadNpsAndStartRatingCustomerFeedbackReport = z.object({
  filters: z
    .object({
      product_code: z.string(),
      product_name: z.string(),
      seller_group_id: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      sort_by: z.string(),
      nps_range_filters: z.array(z.string()),
      orderwise_range_filters: z.array(z.string()),
    })
    .partial(),
});

export const downloadOrderwiseRatingCustomerFeedbackReport = z.object({
  filters: z
    .object({
      product_code: z.string(),
      product_name: z.string(),
      seller_group_id: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      sort_by: z.string(),
      nps_range_filters: z.array(z.string()),
      orderwise_range_filters: z.array(z.string()),
    })
    .partial(),
});

export const getPaginatedCustomerFeedbacks = z.object({
  page_size: z.number({
    required_error: 'page_size is required for fetching feedbacks',
    invalid_type_error: 'page_size must of type number',
  }),
  page_no: z.number({
    required_error: 'page_no is required for fetching feedbacks',
    invalid_type_error: 'page_no must of type number',
  }),
  filters: z
    .object({
      product_code: z.string(),
      product_name: z.string(),
      seller_group_id: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      sort_by: z.string(),
      nps_range_filters: z.array(z.string()),
      orderwise_range_filters: z.array(z.string()),
    })
    .partial(),
});

export const getPaginatedCustomerFeedbackImagesData = z.object({
  page_size: z.number({
    required_error: 'page_size is required for fetching feedbacks',
    invalid_type_error: 'page_size must of type number',
  }),
  page_no: z.number({
    required_error: 'page_no is required for fetching feedbacks',
    invalid_type_error: 'page_no must of type number',
  }),
  filters: z
    .object({
      product_code: z.string(),
      product_name: z.string(),
      seller_group_id: z.string(),
      start_date: z.string(),
      end_date: z.string(),
      sort_by: z.string(),
      nps_range_filters: z.array(z.string()),
      orderwise_range_filters: z.array(z.string()),
    })
    .partial(),
});

export const getCustomerFeedbackFilterData = z.object({
  selected_tab: z.string({
    required_error: 'selected_tab is required for fetching feedbacks',
  }),
});
