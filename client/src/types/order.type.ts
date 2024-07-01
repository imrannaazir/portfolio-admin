import { TProduct } from "./product.type";

export type TOrder = {
  _id?: string;
  buyer_name: string;
  buyer_contact: string;
  products: { product: TProduct; quantity: number }[];
  quantity: number;
  totalCost: number;
  createdBy?: string;
  soldAt: string;
  createdAt?: string;
  updatedAt?: string;
};
