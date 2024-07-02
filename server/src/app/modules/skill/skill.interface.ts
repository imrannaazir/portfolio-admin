import { Types } from 'mongoose';

export type TSkill = {
  id?: string;
  label: string;
  image?: Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
};
