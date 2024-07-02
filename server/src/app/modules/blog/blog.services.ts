import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TMeta } from '../../utils/sendResponse';
import { TBlog } from './blog.interfaces';
import Blog from './blog.model';
import { Image } from '../image/image.model';

// create new blog
const createBlog = async (payload: TBlog) => {
  // check is image is exist
  const isImageExist = await Image.findById(payload.image);
  if (payload?.image && !isImageExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Image is not founded by provided id.',
    );
  }
  const result = await Blog.create(payload);
  return result;
};

// get all blogs
const getAllBlogs = async (
  query: Record<string, unknown>,
): Promise<{ data: TBlog[]; meta: TMeta }> => {
  // Create a QueryBuilder instance for blog
  const blogModelQuery = new QueryBuilder(Blog.find(), query)
    .filter()
    .sort()
    .fields()
    .paginate();

  // Execute the query to get the data
  const data = await blogModelQuery.modelQuery;

  // Get the total count of items for pagination
  const meta = await blogModelQuery.countTotal();

  return { data, meta };
};

// get single blog by id
const getSingleBlogById = async (id: string): Promise<TBlog> => {
  const result = await Blog.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not founded by this ID.');
  }

  return result;
};

const BlogServices = {
  createBlog,
  getAllBlogs,
  getSingleBlogById,
};
export default BlogServices;
