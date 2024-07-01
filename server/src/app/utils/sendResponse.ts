import { Response } from 'express';

export type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: TMeta;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const { message, statusCode, success } = data;
  res.status(statusCode).json({
    success,
    message,
    meta: data?.meta,
    data: data.data,
  });
};

export default sendResponse;
