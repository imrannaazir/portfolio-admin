import { ProductStatus, ProductUnit } from "@/constant/product.constant";
import { TBrand, TCategory, TCollection, TImage } from "./contents.type";
export type TProductStatus = (typeof ProductStatus)[number];
export type TProductUnit = (typeof ProductUnit)[number];
export type TTag = {
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductVariant = {
  _id: string;
  variantId: TVariant;
  options: TOption[];
  __v: number;
};

export type TVariant = {
  _id: string;
  variant_name: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TOption = {
  _id: string;
  option_name: string;
  variantId?: string;
  __v?: number;
};

export type TProduct = {
  _id?: string;

  title: string;
  price: number;

  compare_price?: number;
  description?: string;
  status: TProductStatus;
  quantity?: number;
  weight?: number;
  unit: TProductUnit;

  media?: TImage[];
  variants?: TProductVariant[];
  categories?: TCategory[];
  collections?: TCollection[];
  brand?: TBrand;
  tags?: TTag[];
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TProject = {
  _id: string; // Assuming you are using Mongoose for ObjectId
  title: string;
  description?: string;
  image?: TImage;
  liveLink: string;
  clientGitHub?: string;
  backendGitHub?: string;
  startDate: Date; // Use Date type for dates
  endDate: Date; // Use Date type for dates
  createdAt: Date;
  updatedAt: Date;
};
