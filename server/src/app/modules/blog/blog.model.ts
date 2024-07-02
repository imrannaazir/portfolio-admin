import { Schema, model, Types } from 'mongoose';
import { TBlog } from './blog.interfaces';

// blog schema
const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Types.ObjectId,
      ref: 'Image', // Reference to the Image model if you have one
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// model
const Blog = model<TBlog>('Blog', blogSchema);
export default Blog;
