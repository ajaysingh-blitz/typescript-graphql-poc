import { z } from 'zod';

export const getSellerTestimonialReqParam = z.object({
  testimonialShortId: z.string({
    required_error: 'testimonialShortId is required',
  }),
});

export const updateSellerTestimonialReqParam = z.object({
  testimonialShortId: z.string({
    required_error: 'testimonialShortId is required',
  }),
});

export const updateSellerTestimonialReqBody = z.object({
  name: z.string({
    required_error: 'name is required for creating testimonial',
  }),
  rating: z.number({
    required_error: 'rating is required for creating testimonial',
  }),
  review: z.string({
    required_error: 'review is required for creating testimonial',
  }),
  review_date: z.string({
    invalid_type_error: 'review_date must be type string',
  }),
  city: z.string({
    invalid_type_error: 'review_date must be type string',
  }),
  deleted_media: z.array(z.string()),
  categories: z
    .string({
      invalid_type_error: 'categories must be of type array of string',
    })
    .array(),
  product_code: z.string({
    invalid_type_error: 'Product Id must be string',
  }),
});

export const deleteTestimonialReqParams = z.object({
  testimonialShortId: z.string({
    required_error: 'testimonialShortId is required',
  }),
});

export const createSellerTestimonialDataReqBody = z.object({
  name: z.string({
    required_error: 'name is required for create testimonial',
    invalid_type_error: 'name must be type string',
  }),
  rating: z.string({
    required_error: 'rating is required for create testimonial',
    invalid_type_error: 'rating must be type string',
  }),
  review: z.string({
    required_error: 'review is required for create testimonial',
    invalid_type_error: 'review must be type string',
  }),
  review_date: z.string({
    invalid_type_error: 'review_date must be type string',
  }),
  city: z.string({
    invalid_type_error: 'review_date must be type string',
  }),
  categories: z
    .string({
      invalid_type_error: 'category must be an array of string',
    })
    .array(),
  product_code: z.string({
    invalid_type_error: 'Product Id must be string',
  }),
});
