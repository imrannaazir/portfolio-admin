/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateKeyError = (error: any): TGenericErrorResponse => {
  const statusCode = StatusCodes.CONFLICT;

  const path = error.keyValue ? Object?.keys(error?.keyValue)?.[0] : '';
  const message = `Duplicate Key error at path '${path}'`;
  const errorSources: TErrorSource[] = [
    {
      path: `${path}`,
      message: path
        ? `${error.keyValue[path]} is already exist at '${path}`
        : error.message,
    },
  ];
  return {
    statusCode,
    message,
    errorSources,
  };
};

export default handleDuplicateKeyError;
