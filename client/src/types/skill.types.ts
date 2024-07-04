import { TImage } from "./contents.type";

export interface TSkill {
  _id: string;
  title: string;
  image?: TImage;
  createdAt?: Date;
  updatedAt?: Date;
}
