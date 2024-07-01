import { Schema, model } from 'mongoose';
import { TTag } from './tag.interface';

const tagSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// models
const Tag = model<TTag>('tag', tagSchema);
export default Tag;
