import { Types } from 'mongoose';

export type TTag = {
  _id?: Types.ObjectId;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
