import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import BlogServices from './blog.services';

// upload blog
const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlog(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Blog created Successfully.',
    data: result,
  });
});

// get all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BlogServices.getAllBlogs(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Blogs Fetched Successfully',
    data: result,
  });
});

// get single blog by id
const getSingleBlogById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await BlogServices.getSingleBlogById(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blog Fetched Successfully',
    data: result,
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingleBlogById,
};
