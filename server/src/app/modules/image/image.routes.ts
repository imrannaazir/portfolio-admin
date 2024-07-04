import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  createManyImageValidationSchema,
  createSingleImageValidationSchema,
  deleteManyValidationSchema,
} from './image.validations';
import ImageControllers from './image.controllers';

const router = Router();

// create single image : POST
router.post(
  '/single',
  auth(),
  validateRequest(createSingleImageValidationSchema),
  ImageControllers.createSingleImage,
);

// create many images : POST
router.post(
  '/many',
  auth(),
  validateRequest(createManyImageValidationSchema),
  ImageControllers.createManyImage,
);

// get all images : GET
router.get('/', ImageControllers.getAllImages);

// delete many images : DELETE
router.delete(
  '/',
  auth('ADMIN'),
  validateRequest(deleteManyValidationSchema),
  ImageControllers.deleteManyImages,
);
const ImageRoutes = router;
export default ImageRoutes;
