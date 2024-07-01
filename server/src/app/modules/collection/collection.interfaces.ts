import { Types } from 'mongoose';

export type TCollection = {
  _id?: Types.ObjectId;
  title: string;
  description?: string;
  image?: Types.ObjectId;
  icon?: Types.ObjectId;
  createdBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};
