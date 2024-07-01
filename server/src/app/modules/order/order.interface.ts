import { Types } from 'mongoose';

export type TOrderedProduct = {
  product: Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  buyer_name: string;
  buyer_contact: string;
  soldAt: Date;
  products: TOrderedProduct[];
  totalCost: number;
  createdBy?: Types.ObjectId;
};
