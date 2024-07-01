import { TErrorSource, TGenericErrorResponse } from '../interface/error';
import AppError from './AppError';

const handleAppError = (error: AppError): TGenericErrorResponse => {
  const message = 'App error.';
  const statusCode = error.statusCode;
  const errorSources: TErrorSource[] = [
    {
      message: error.message,
      path: '',
    },
  ];

  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleAppError;
