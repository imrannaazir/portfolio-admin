/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Application, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Api not found.',
  });
};

export default notFoundHandler;
