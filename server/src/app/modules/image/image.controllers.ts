import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ImageServices from './image.services';

// create single image
const createSingleImage = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await ImageServices.createSingleImage(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Single image inserted into db.',
    data: result,
  });
});

// create multiple image
const createManyImage = catchAsync(async (req, res) => {
  const payload = req.body.images;
  const result = await ImageServices.createManyImage(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Images inserted into db.',
    data: result,
  });
});

// get all images
const getAllImages = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await ImageServices.getAllImages(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Images retrieved successfully.',
    data: result.result,
    meta: result.meta,
  });
});

// delete many images
const deleteManyImages = catchAsync(async (req, res) => {
  const ids = req.body.ids;
  const result = await ImageServices.deleteManyImages(ids);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Images deleted successfully.',
    data: result,
  });
});

const ImageControllers = {
  createSingleImage,
  createManyImage,
  getAllImages,
  deleteManyImages,
};

export default ImageControllers;
