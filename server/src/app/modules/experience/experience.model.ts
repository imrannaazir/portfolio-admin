import { Schema, model } from 'mongoose';
import { TExperience } from './experience.interface';

// experience schema
const experienceSchema = new Schema<TExperience>(
  {
    title: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
    },
    isWorking: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// model
const Experience = model<TExperience>('Experience', experienceSchema);
export default Experience;
