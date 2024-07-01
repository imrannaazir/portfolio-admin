import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TMeta } from '../../utils/sendResponse';
import { TDeleteManyReturnType, TImage } from './image.interface';
import { Image } from './image.model';

// create image
const createSingleImage = async (payload: TImage): Promise<TImage> => {
  const result = await Image.create(payload);
  return result;
};

// create multiple image
const createManyImage = async (payload: TImage[]): Promise<TImage[]> => {
  const result = await Image.insertMany(payload);
  return result;
};

// get all image
const getAllImages = async (
  query: Record<string, unknown>,
): Promise<{ result: TImage[]; meta: TMeta }> => {
  const imageModelQuery = new QueryBuilder(Image.find(), query)
    .search(['file_name'])
    .fields()
    .filter()
    .sort()
    .paginate();

  const result = await imageModelQuery.modelQuery;

  const meta = await imageModelQuery.countTotal();

  return { result, meta };
};

// delete many image
const deleteManyImages = async (
  ids: string[],
): Promise<TDeleteManyReturnType> => {
  if (ids.length < 1) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Please send image ids.');
  }

  // check is ids are exist
  const notExistingImageIds: string[] = [];
  for (const id of ids) {
    const isImageExist = await Image.findById(id);
    if (!isImageExist) {
      notExistingImageIds.push(id);
    }
  }
  if (notExistingImageIds.length) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Image not founded by id : ${notExistingImageIds.join(',')}`,
    );
  }

  const result = await Image.deleteMany({ _id: { $in: ids } });
  return result;
};

const ImageServices = {
  createSingleImage,
  createManyImage,
  getAllImages,
  deleteManyImages,
};

export default ImageServices;
