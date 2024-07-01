import { Types } from 'mongoose';
import { ProductStatus, ProductUnit } from './product.constant';

export type TProductStatus = (typeof ProductStatus)[number];
export type TProductUnit = (typeof ProductUnit)[number];
export type TInputVariant = {
  variantId: Types.ObjectId;
  options: [Types.ObjectId];
};

export type TProduct = {
  _id?: Types.ObjectId;

  title: string;
  price: number;

  compare_price?: number;
  description?: string;
  status: TProductStatus;
  quantity?: number;
  weight?: number;
  unit: TProductUnit;

  media?: [Types.ObjectId];
  variants?: [TInputVariant] | Types.ObjectId[];
  categories?: [Types.ObjectId];
  collections?: [Types.ObjectId];
  brand?: Types.ObjectId;
  tags?: [Types.ObjectId];
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
