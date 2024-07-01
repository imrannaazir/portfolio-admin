import { PipelineStage, Types } from 'mongoose';
import { TCollection } from './collection.interfaces';
import { Collection } from './collection.models';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TMeta } from '../../utils/sendResponse';
import { Image } from '../image/image.model';
import Icon from '../icon/icon.model';
import config from '../../config';
import { TDeleteManyReturnType } from '../image/image.interface';

// create collection
const createCollection = async (
  payload: TCollection,
  userId: Types.ObjectId,
): Promise<TCollection> => {
  // check image id is valid
  if (payload.image) {
    const isImageExist = await Image.findById(payload.image);
    if (!isImageExist) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `No image founded by id: ${payload.image}`,
      );
    }
  }
  // check icon id is valid
  if (payload.icon) {
    const isIconExist = await Icon.findById(payload.icon);
    if (!isIconExist) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `No icon founded by id: ${payload.icon}`,
      );
    }
  }

  payload.createdBy = userId;
  const result = await Collection.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create collection.');
  }

  return result;
};

// get all collections
const getAllCollections = async (
  query: Record<string, unknown>,
): Promise<{ result: TCollection[]; meta: TMeta }> => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || Number(config.data_limit);
  const skip = (page - 1) * limit;

  // searching condition
  const searchCondition = query.searchTerm
    ? { title: { $regex: query.searchTerm, $options: 'i' } }
    : {};

  const collectionPipeline: PipelineStage[] = [
    //search
    {
      $match: searchCondition,
    },
    {
      $lookup: {
        from: 'categories', // The name of the categories collection
        localField: '_id', // Field in the collection schema
        foreignField: 'collection', // Field in the category schema
        as: 'categories', // The array field to add categories
      },
    },
    // lookup pipeline collections
    {
      $lookup: {
        from: 'products', // table name would be plural
        localField: '_id',
        foreignField: 'collections',
        as: 'products',
      },
    },
    // lookup pipeline for image
    {
      $lookup: {
        from: 'images', // table name would be plural
        localField: 'image',
        foreignField: '_id',
        as: 'image',
      },
    },
    // lookup pipeline for icon
    {
      $lookup: {
        from: 'icons', // table name would be plural
        localField: 'icon',
        foreignField: '_id',
        as: 'icon',
      },
    },
    // add field pipeline
    {
      $addFields: {
        noOfProducts: {
          $size: '$products',
        },
        image: {
          $arrayElemAt: ['$image', 0],
        },
        icon: {
          $arrayElemAt: ['$icon', 0],
        },
      },
    },
    // project pipeline
    {
      $project: {
        products: 0,
      },
    },

    //sorting
    {
      $sort: {
        [`${query.sort}`]: query.order === 'asc' ? 1 : -1,
      },
    },

    //pagination
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await Collection.aggregate(collectionPipeline);
  const total = result.length;
  const meta: TMeta = {
    limit,
    page,
    total,
    totalPage: Math.ceil(total / limit),
  };

  return { result, meta };
};

// delete single collection
const deleteSingleCollection = async (
  id: string,
): Promise<TCollection | null> => {
  // check is the collection is exist
  const isCollectionExist = await Collection.findById(id);
  if (!isCollectionExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Collection not founded by id: ${id}`,
    );
  }

  const result = await Collection.findByIdAndDelete(id);

  return result;
};

// delete many collection
const deleteManyCollection = async (
  ids: string[],
): Promise<TDeleteManyReturnType> => {
  // check are collections exist
  const notExistingCollections: string[] = [];

  for (const id of ids) {
    const isCollectionExist = await Collection.findById(id);

    if (!isCollectionExist) {
      notExistingCollections.push(id);
    }
  }

  if (notExistingCollections.length) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Collections not founded by id : ${notExistingCollections.join(',')}`,
    );
  }

  const result = await Collection.deleteMany({ _id: { $in: ids } });

  return result;
};
const CollectionServices = {
  createCollection,
  getAllCollections,
  deleteSingleCollection,
  deleteManyCollection,
};
export default CollectionServices;
