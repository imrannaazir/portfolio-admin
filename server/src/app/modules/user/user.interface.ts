import { Types } from 'mongoose';
import { Role } from './user.constant';

export type TRole = (typeof Role)[number];

export type TUser = {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  role: TRole;
  createdAt?: Date;
  updatedAt?: Date;
};
