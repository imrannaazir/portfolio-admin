import { ProductStatus, ProductUnit } from "@/constant/product.constant";
import { z } from "zod";

const productVariantValidationSchema = z.object({
  variantId: z.string(),
  options: z.array(z.string()),
});

export const createProductValidationSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.coerce.number().gte(0),
  compare_price: z.coerce.number().optional(),
  status: z.enum(ProductStatus).optional(),
  weight: z.coerce.number().optional(),
  unit: z.enum(ProductUnit).optional(),
  quantity: z.coerce.number().gte(0).optional(),
  media: z.array(z.string()).optional(),
  brand: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  collections: z.array(z.string()).optional(),
  variants: z.array(productVariantValidationSchema).optional(),
  variant: productVariantValidationSchema,
});

export type TProductFormValues = z.infer<typeof createProductValidationSchema>;
