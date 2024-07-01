export type TImage = {
  _id?: string;
  file_name: string;
  url: string;
  size: number;
  format: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TIcon = {
  _id: string;
  name: string;
  __v: number;
};

export type TCollection = {
  title: string;
  description?: string;
  icon?: TIcon;
  image?: TImage;
  noOfProducts?: number;
  _id: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TCategory = {
  _id: string;
  title: string;
  description?: string;
  image?: TImage;
  collection: TCollection;
  noOfProducts?: number;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TBrand = {
  _id?: string;
  name: string;
  description?: string;
  logo?: TImage;
  slogan?: string;
  cover_photo?: TImage;
  noOfProducts?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
