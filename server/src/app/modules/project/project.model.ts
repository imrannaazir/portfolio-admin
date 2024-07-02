import { Schema, model } from 'mongoose';
import { TProject } from './project.interface';

// project schema
const projectSchema = new Schema<TProject>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    technologies: {
      type: [String],
      required: true,
    },
    liveLink: {
      type: String,
      required: true,
    },
    clientGitHub: {
      type: String,
    },
    backendGitHub: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tag',
      },
    ],
    image: {
      type: Schema.Types.ObjectId,
      ref: 'image',
    },
  },
  { timestamps: true },
);

// models
const Project = model<TProject>('project', projectSchema);
export default Project;
