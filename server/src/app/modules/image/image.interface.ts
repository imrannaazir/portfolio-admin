import { Types } from 'mongoose';

export type TImage = {
  _id?: Types.ObjectId;
  file_name: string;
  url: string;
  size: number;
  format: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TDeleteManyReturnType = {
  acknowledged: boolean;
  deletedCount: number;
};
