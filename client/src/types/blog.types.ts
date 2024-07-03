import { TImage } from "./contents.type";

export interface TBlog {
  _id: string;
  title: string;
  image?: TImage;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
