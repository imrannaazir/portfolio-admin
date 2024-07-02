import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createBlogValidationSchema } from './blog.validations';
import { BlogControllers } from './blog.controllers';

const router = Router();

// create blog : POST
router.post(
  '/create',
  auth('ADMIN'),
  validateRequest(createBlogValidationSchema),
  BlogControllers.createBlog,
);

// get all blogs : GET
router.get('/all', BlogControllers.getAllBlogs);

// get single blog : GET
router.get('/:id', BlogControllers.getSingleBlogById);

const BlogRoutes = router;
export default BlogRoutes;
