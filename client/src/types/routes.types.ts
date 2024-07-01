import { ReactNode } from "react";

export type TRoute = {
  index?: boolean;
  path?: string;
  element?: ReactNode;
  children?: TRoute[];
};

export type TPath = {
  label?: string;
  icon?: ReactNode;
  path?: string;
  element?: ReactNode;
  children?: TPath[];
  index?: boolean;
};
