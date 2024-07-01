import { Types } from 'mongoose';

export type TBrand = {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  logo?: Types.ObjectId;
  slogan?: string;
  cover_photo?: Types.ObjectId;
  noOfProducts?: number;
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
