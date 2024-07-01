import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import IconServices from './icon.services';

// create icons
const createIcons = catchAsync(async (req, res) => {
  const result = await IconServices.createIcons();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Icons inserted into db.',
    data: result,
  });
});

// get all icons
const getAllIcons = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await IconServices.getAllIcons(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Icons retrieved successfully.',
    data: result.data,
    meta: result.meta,
  });
});

const IconControllers = { createIcons, getAllIcons };

export default IconControllers;
