import { z } from 'zod';
import { ProductStatus, ProductUnit } from './product.constant';

const variantValidationSchema = z.object({
  variantId: z.string(),
  options: z.array(z.string()),
});

export const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string().optional(),
    media: z.array(z.string()).optional(),

    price: z.number().gte(0),
    compare_price: z.number().optional(),
    quantity: z.number().gte(0).optional(),

    weight: z.number().optional(),
    unit: z.enum(ProductUnit).optional(),

    variants: z.array(variantValidationSchema).optional(),

    status: z.enum(ProductStatus).optional(),

    brand: z.string().optional(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    collections: z.array(z.string()).optional(),
  }),
});

export const deleteBulkProductValidationSchema = z.object({
  body: z.object({
    ids: z.array(z.string()),
  }),
});
