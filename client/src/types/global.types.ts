import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: [{ path: string; message: string }];
  };
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  error?: TError;
  success: boolean;
  message: string;
  data: T;
  meta?: TMeta;
};

export type TLabelValuePair = {
  value: string;
  label: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
