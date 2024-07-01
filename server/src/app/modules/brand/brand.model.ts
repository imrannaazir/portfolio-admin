import { Schema, model } from 'mongoose';
import { TBrand } from './brand.interface';

const brandSchema = new Schema<TBrand>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    slogan: {
      type: String,
    },
    logo: {
      type: Schema.Types.ObjectId,
      ref: 'image',
    },
    cover_photo: {
      type: Schema.Types.ObjectId,
      ref: 'image',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true },
);

const Brand = model<TBrand>('brand', brandSchema);
export default Brand;
