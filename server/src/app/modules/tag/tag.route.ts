import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import TagController from './tag.controller';
import { createTagValidationSchema } from './tag.validation';
import auth from '../../middlewares/auth';

const router = Router();

// create Tag : POST
router.post(
  '/',
  auth('SUPER_ADMIN', 'ADMIN'),
  validateRequest(createTagValidationSchema),
  TagController.createTag,
);

// get all Tags : GET
router.get('/', TagController.getAllTags);
const TagRoutes = router;
export default TagRoutes;
