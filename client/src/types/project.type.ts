import { TImage } from "./contents.type";
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
