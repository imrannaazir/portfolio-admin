import { TImage } from "./contents.type";

export interface TSkill {
  _id: string;
  label: string;
  image?: TImage;
  createdAt?: Date;
  updatedAt?: Date;
}
