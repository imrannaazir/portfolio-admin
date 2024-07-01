import { Schema, model } from 'mongoose';
import { TTag } from '../tag/tag.interface';

const iconSchema = new Schema<TTag>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Icon = model<TTag>('icon', iconSchema);
export default Icon;
