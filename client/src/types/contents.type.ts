export type TImage = {
  _id?: string;
  file_name: string;
  url: string;
  size: number;
  format: string;
  createdAt?: string;
  updatedAt?: string;
};

export type TIcon = {
  _id: string;
  name: string;
  __v: number;
};
