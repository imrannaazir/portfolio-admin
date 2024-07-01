import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import VariantServices from './variant.services';

// create valiant
const createVariant = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await VariantServices.createVariant(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Variant crated successfully.',
    data: result,
  });
});

// get all variants
const getAllVariant = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await VariantServices.getAllVariant(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Variants retrieved successfully.',
    data: result.result,
    meta: result.meta,
  });
});

// create option
const createOption = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await VariantServices.createOption(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Option created successfully.',
    data: result,
  });
});

// get all options
const getAllOption = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await VariantServices.getAllOption(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Options retrieved successfully.',
    data: result.result,
    meta: result.meta,
  });
});
const VariantControllers = {
  createVariant,
  getAllVariant,
  createOption,
  getAllOption,
};

export default VariantControllers;
