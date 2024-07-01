import { Schema, model } from 'mongoose';
import { TOrder, TOrderedProduct } from './order.interface';
const orderedProductSchema = new Schema<TOrderedProduct>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'product',
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);
const orderSchema = new Schema<TOrder>(
  {
    buyer_name: {
      type: String,
      required: true,
    },
    buyer_contact: {
      type: String,
      required: true,
    },
    products: [orderedProductSchema],

    totalCost: { type: Number, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    soldAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = model<TOrder>('order', orderSchema);
export default Order;
