import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import { TOrder, TOrderedProduct } from './order.interface';
import { Types, startSession } from 'mongoose';
import Order from './order.model';
import moment from 'moment';
import QueryBuilder from '../../builder/QueryBuilder';
import User from '../user/user.model';

// create order
const createOrder = async (payload: TOrder, userId: Types.ObjectId) => {
  const { products, ...restPayload } = payload;

  // Start a session
  const session = await startSession();
  session.startTransaction();

  try {
    const productToOrder = await Product.find()
      .where('_id')
      .in(products.map((product) => product.product))
      .session(session)
      .exec();

    const orderedProduct: TOrderedProduct[] = [];

    products.forEach((item) => {
      const product = productToOrder.find((p) => p._id.equals(item.product));

      if (!product) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          `Product not found by Id : ${item.product}`,
        );
      }

      if ((product.quantity as number) < item.quantity) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `Not enough quantity available for ${product.title}`,
        );
      }

      (product.quantity as number) -= item.quantity;

      if (product.quantity === 0) {
        product.status = 'ARCHIVED';
      }

      orderedProduct.push({
        product: product._id,
        quantity: item.quantity,
      });
    });

    await Promise.all(
      productToOrder.map((updatedProduct) => updatedProduct.save({ session })),
    );

    const order = new Order({
      createdBy: userId,
      products: orderedProduct,
      ...restPayload,
    });

    await order.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return order;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();

    throw new AppError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message,
    );
  }
};

// getAllOrder
const getAllOrder = async (
  query: Record<string, unknown>,
  userEmail: string,
) => {
  //check is user exist
  const isUserExist = await User.findOne({ email: userEmail });

  if (!isUserExist) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Account not founded.');
  }

  if (isUserExist.role === 'USER') {
    query.createdBy = `${isUserExist._id}`;
  }

  let startTime;
  const date = query?.date;
  if (date && date === 'day') {
    startTime = moment().subtract(24, 'hours').toDate();
  } else if (date === 'week') {
    startTime = moment().subtract(7, 'days').toDate();
  } else if (date === 'month') {
    startTime = moment().subtract(30, 'days').toDate();
  } else if (date === 'year') {
    startTime = moment().subtract(365, 'days').toDate();
  } else {
    startTime = undefined;
  }
  const endOTime = moment().toDate();

  const orderModelQuery = new QueryBuilder(
    Order.find(
      startTime
        ? {
            $and: [
              { soldAt: { $gte: startTime } },
              { soldAt: { $lt: endOTime } },
            ],
          }
        : {},
    ).populate('products.product'),
    query,
  )
    .search(['buyer_name'])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await orderModelQuery.modelQuery;
  const meta = await orderModelQuery.countTotal();
  return { result, meta };
};

const OrderService = {
  createOrder,
  getAllOrder,
};

export default OrderService;
