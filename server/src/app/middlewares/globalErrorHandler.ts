/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import config from '../config';
import handleMongooseError from '../errors/handleMongooseError';
import handleDuplicateKeyError from '../errors/handleDuplicateKeyError';
import handleCastError from '../errors/handleCastError';
import AppError from '../errors/AppError';
import handleAppError from '../errors/handleAppError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  /* 
    1. handle zod error
    2. handle mongoose validation error
    3. handle duplicate key error
    4. handle cast error
    5. handle error that instance of AppError
    */

  const success = false;
  let statusCode = 500;
  let message = error.message || 'Internal server error.';
  let errorSources = null;

  // handle zod error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // handle mongoose validation error
  if (error.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }

  // handle duplicate key error
  if (error.code === 11000) {
    const simplifiedError = handleDuplicateKeyError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }

  // handle CastError
  if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }

  //handle instance of app error
  if (error instanceof AppError) {
    const simplifiedError = handleAppError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // send response
  res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
