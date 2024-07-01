import { Types } from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import CollectionServices from './collection.services';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

// create collection
const createCollection = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user._id;
  const result = await CollectionServices.createCollection(
    payload,
    userId as Types.ObjectId,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Collection created successfully.',
    data: result,
  });
});

// get all collections
const getAllCollections = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await CollectionServices.getAllCollections(query);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collections retrieved successfully.',
    data: result.result,
    meta: result.meta,
  });
});

// delete single collection
const deleteSingleCollection = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CollectionServices.deleteSingleCollection(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collection deleted successfully.',
    data: result,
  });
});

// delete many collections
const deleteManyCollection = catchAsync(async (req, res) => {
  const ids = req.body.ids;
  const result = await CollectionServices.deleteManyCollection(ids);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collections deleted successfully.',
    data: result,
  });
});
const CollectionControllers = {
  createCollection,
  getAllCollections,
  deleteSingleCollection,
  deleteManyCollection,
};

export default CollectionControllers;
