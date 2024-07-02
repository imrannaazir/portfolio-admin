import { Types } from 'mongoose';

export type TProject = {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  technologies: string[];
  liveLink: string;
  clientGitHub?: string;
  backendGitHub?: string;
  startDate: Date;
  endDate: Date;
  tags: Types.ObjectId[];
  image?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
