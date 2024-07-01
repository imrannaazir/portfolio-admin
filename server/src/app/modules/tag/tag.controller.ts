import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import TagService from './tag.service';

// create Tag
const createTag = catchAsync(async (req, res) => {
  const result = await TagService.createTag(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Tag created successfully.',
    data: result,
  });
});

// get all tags
const getAllTags = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await TagService.getAllTags(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Tags retrieved successfully.',
    data: result.result,
    meta: result.meta,
  });
});
const TagController = {
  createTag,
  getAllTags,
};

export default TagController;
