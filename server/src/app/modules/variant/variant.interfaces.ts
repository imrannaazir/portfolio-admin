import { Types } from 'mongoose';

export type TVariant = {
  _id?: Types.ObjectId;
  variant_name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TOption = {
  _id?: Types.ObjectId;
  option_name: string;
  variantId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductVariantOption = {
  _id: Types.ObjectId;
  variantId: Types.ObjectId;
  options: [Types.ObjectId];
};

export type TProductVariant = {
  _id: Types.ObjectId;
  productId: Types.ObjectId;
  productVariantOptions: [Types.ObjectId];
};
