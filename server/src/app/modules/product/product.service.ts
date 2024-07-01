import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TInputVariant, TProduct } from './product.interface';
import Product from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ProductSearchableFields } from './product.constant';
import mongoose, { Types } from 'mongoose';
import Brand from '../brand/brand.model';
import Category from '../category/category.model';
import { Collection } from '../collection/collection.models';
import { Image } from '../image/image.model';
import {
  Option,
  ProductVariantOption,
  Variant,
} from '../variant/variant.model';
import Tag from '../tag/tag.model';
import { TMeta } from '../../utils/sendResponse';

// create product
const createProduct = async (
  payload: TProduct,
  userId: Types.ObjectId,
): Promise<TProduct> => {
  /* 
1. check is brand exist 
2. check are categories  exist
3. check are collections  exist
4. check are media  exist
5. check is variants are exist
6. check is tags
7. check is price is smaller then compare price
*/

  // insert  userId into payload
  payload.createdBy = userId;

  // check is brand is exist
  if (payload.brand) {
    const isBrandExist = await Brand.findById(payload.brand);
    if (!isBrandExist) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Brand not founded.');
    }
  }

  // check categories are exist
  if (payload.categories && payload.categories.length > 0) {
    const notExistingCategoryIds: string[] = [];
    for (const categoryId of payload.categories) {
      const isCategoryExist = await Category.findById(categoryId);

      if (!isCategoryExist) {
        notExistingCategoryIds.push(`${categoryId}`);
      }
    }

    if (notExistingCategoryIds.length > 0) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Category not founded by id: ${notExistingCategoryIds.join(',')}`,
      );
    }
  }

  // check collections are exist
  if (payload.collections && payload.collections.length > 0) {
    const notExistingCollectionIds: string[] = [];
    for (const collectionId of payload.collections) {
      const isCollectionExist = await Collection.findById(collectionId);

      if (!isCollectionExist) {
        notExistingCollectionIds.push(`${collectionId}`);
      }
    }
    if (notExistingCollectionIds.length > 0) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Collection not founded by id: ${notExistingCollectionIds.join(',')}`,
      );
    }
  }

  // check are images exist
  if (payload.media && payload.media.length) {
    const notExistingImageIds: string[] = [];

    for (const imageId of payload.media) {
      const isImageExist = await Image.findById(imageId);
      if (!isImageExist) {
        notExistingImageIds.push(`${imageId}`);
      }
    }

    if (notExistingImageIds.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Image not founded by id: ${notExistingImageIds.join(',')}`,
      );
    }
  }

  // check are variants and options  exist
  if (payload.variants && payload.variants.length) {
    const notExistingVariantIds: string[] = [];
    for (const variant of payload.variants) {
      const isVariantExist = await Variant.findById(
        (variant as TInputVariant)?.variantId,
      );
      if (!isVariantExist) {
        notExistingVariantIds.push(`${(variant as TInputVariant)?.variantId}`);
      } else {
        const options = (variant as TInputVariant)?.options;
        // check options are exist
        const notExistingOptionIds: string[] = [];
        for (const optionId of options) {
          const isOptionExist = await Option.findOne({
            _id: optionId,
            variantId: (variant as TInputVariant)?.variantId,
          });

          if (!isOptionExist) {
            notExistingOptionIds.push(`${optionId}`);
          }
        }

        if (notExistingOptionIds.length) {
          throw new AppError(
            StatusCodes.NOT_FOUND,
            `Option not founded by id: ${notExistingOptionIds.join(',')}`,
          );
        }
      }
    }

    if (notExistingVariantIds.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Variant not founded by id: ${notExistingVariantIds.join(',')}`,
      );
    }
  }

  // check are tags exist
  if (payload.tags && payload.tags.length) {
    const notExistingTagIds: string[] = [];
    for (const tagId of payload.tags) {
      const isTagExist = await Tag.findById(tagId);
      if (!isTagExist) {
        notExistingTagIds.push(`${tagId}`);
      }
    }
    if (notExistingTagIds.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        `Tag not founded by id: ${notExistingTagIds.join(',')}`,
      );
    }
  }

  // check compare price is getter than price
  if (payload.compare_price && payload.compare_price <= payload.price) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Compare price should be getter than price.',
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let variants;
    if (payload.variants) {
      variants = await ProductVariantOption.insertMany(payload.variants, {
        session,
      });

      // insert product variant options into payload
      if (variants.length) {
        payload.variants = variants.map((variant) => variant._id);
      }
    }

    // create product
    const product = await Product.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return product[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, error?.message);
  }
};

// get all product
const getAllProduct = async (
  query: Record<string, unknown>,
): Promise<{ data: TProduct[]; meta: TMeta }> => {
  const queryObj = { ...query };
  ['tags', 'categories', 'collections', ''].forEach((item) => {
    delete queryObj[item];
  });
  // convert into filterable
  const tags = (query?.tags as string)?.split(',');
  const collections = (query?.collections as string)?.split(',');
  const categories = (query?.categories as string)?.split(',');

  if (query.tags) {
    queryObj['tags'] = { $in: tags };
  }
  if (query.collections) {
    queryObj['collections'] = { $in: collections };
  }
  if (query.categories) {
    queryObj['categories'] = { $in: categories };
  }

  // price range filterable query
  let priceRangeFilter = {};
  if (query.lowPrice && query.highPrice) {
    priceRangeFilter = {
      $and: [
        { price: { $gte: query.lowPrice } },
        { price: { $lte: query.highPrice } },
      ],
    };
  }

  // product query model
  const productModelQuery = new QueryBuilder(
    Product.find(priceRangeFilter)
      .populate('brand createdBy categories tags collections media')
      .populate({
        path: 'variants',
        populate: {
          path: 'variantId options',
        },
      }),
    queryObj,
  )
    .search(ProductSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const data = await productModelQuery.modelQuery;

  const meta = await productModelQuery.countTotal();

  return { data, meta };
};

// get single product by id
const getSingleProductById = async (id: string): Promise<TProduct> => {
  const result = await Product.findById(id).populate(
    'brand createdBy media collections categories variants tags',
  );

  if (!result) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Product not founded by this ID.',
    );
  }

  return result;
};

// delete product by Id
const deleteProductById = async (
  productId: string,
): Promise<{ deletedProductId: Types.ObjectId }> => {
  // check is product exist
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }

  const result = await Product.findByIdAndDelete(productId);

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete product.');
  }
  return {
    deletedProductId: result?._id,
  };
};

//update single product by Id
const updateProductById = async (
  id: string,
  payload: Partial<TProduct>,
): Promise<TProduct> => {
  // check if product is exist
  const isProductExist = await Product.findById(id);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not founded.');
  }

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update product.');
  }

  return result;
};

// get highest product price
const getHighestProductPrice = async (): Promise<{ highRange: number }> => {
  const mostValuableProduct = await Product.findOne({}).sort('-price');

  if (!mostValuableProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No product founded.');
  }

  return { highRange: mostValuableProduct.price };
};

// bulk product delete
const deleteBulkProduct = async (
  ids: string[],
): Promise<{ deletedProductCount: number }> => {
  const result = await Product.deleteMany({ _id: { $in: ids } });

  if (result.deletedCount < 1) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Failed to delete any product.',
    );
  }

  return { deletedProductCount: result.deletedCount };
};

const ProductService = {
  createProduct,
  getAllProduct,
  getSingleProductById,
  deleteProductById,
  updateProductById,
  getHighestProductPrice,
  deleteBulkProduct,
};

export default ProductService;
