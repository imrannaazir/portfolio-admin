import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import ProductService from './product.service';
import { Types } from 'mongoose';

// create product
const createProduct = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await ProductService.createProduct(
    req.body,
    userId as Types.ObjectId,
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Product created successfully.',
    data: result,
  });
});

// get all product
const getAllProduct = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await ProductService.getAllProduct(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All product retrieved successfully.',
    data: result.data,
    meta: result.meta,
  });
});

// get single product by id
const getSingleProductById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProductService.getSingleProductById(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product retrieved successfully.',
    data: result,
  });
});

// delete product by Id
const deleteProductById = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const result = await ProductService.deleteProductById(productId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product deleted successfully',
    data: result,
  });
});

// update product by id
const updateProductById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const result = await ProductService.updateProductById(id, payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Product updated successfully.',
    data: result,
  });
});

// get highest product price
const getHighestProductPrice = catchAsync(async (req, res) => {
  const result = await ProductService.getHighestProductPrice();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Highest product price retrieved successfully.',
    data: result,
  });
});

// bulk delete
const deleteBulkProduct = catchAsync(async (req, res) => {
  const ids = req.body.ids;
  const result = await ProductService.deleteBulkProduct(ids);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Products deleted successfully.',
    data: result,
  });
});
const ProductController = {
  createProduct,
  getAllProduct,
  deleteProductById,
  getSingleProductById,
  updateProductById,
  getHighestProductPrice,
  deleteBulkProduct,
};

export default ProductController;
