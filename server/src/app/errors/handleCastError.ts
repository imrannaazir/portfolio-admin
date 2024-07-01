import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';
import { StatusCodes } from 'http-status-codes';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST;
  const message = 'Invalid object id.';
  const errorSources: TErrorSource[] = [
    {
      path: error.path,
      message: error.message,
    },
  ];
  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleCastError;
