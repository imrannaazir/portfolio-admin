import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TTag } from './tag.interface';
import Tag from './tag.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { TMeta } from '../../utils/sendResponse';

// create tag
const createTag = async (payload: TTag): Promise<TTag> => {
  // check is already a Tag by provided name
  const isAlreadyTagByName = await Tag.findOne({
    name: payload.name,
  });
  if (isAlreadyTagByName) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'There is already a Tag by this name.',
    );
  }

  // create
  const result = await Tag.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create Tag.');
  }

  return result;
};

// get all tags
const getAllTags = async (
  query: Record<string, unknown>,
): Promise<{ result: TTag[]; meta: TMeta }> => {
  const tagModelQuery = new QueryBuilder(Tag.find(), query)
    .search(['name'])
    .filter()
    .fields()
    .sort()
    .paginate();
  const result = await tagModelQuery.modelQuery;
  const meta = await tagModelQuery.countTotal();

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No tags founded.');
  }

  return { result, meta };
};
const TagService = {
  createTag,
  getAllTags,
};

export default TagService;
