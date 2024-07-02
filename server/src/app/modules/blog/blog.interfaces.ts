import { Types } from 'mongoose';

export interface TBlog {
  _id: Types.ObjectId;
  title: string;
  image?: Types.ObjectId;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
