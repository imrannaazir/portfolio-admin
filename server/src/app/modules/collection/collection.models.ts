import { Schema, model } from 'mongoose';
import { TCollection } from './collection.interfaces';

//  collection schema
const collectionSchema = new Schema<TCollection>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      text: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: Schema.Types.ObjectId,
      ref: 'icon',
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'image',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// model
export const Collection = model<TCollection>('collection', collectionSchema);
