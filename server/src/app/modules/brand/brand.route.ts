import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createBrandValidationSchema } from './brand.validation';
import BrandController from './brand.controller';
import auth from '../../middlewares/auth';
import { deleteManyValidationSchema } from '../image/image.validations';

const router = Router();

// create brand : POST
router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(createBrandValidationSchema),
  BrandController.createBrand,
);

// get all brand : GET
router.get('/', BrandController.getAllBrands);

// delete single brand : DELETE
router.delete('/:id', auth(), BrandController.deleteSingleBrand);

//delete many brand : DELETE
router.delete(
  '/',
  auth(),
  validateRequest(deleteManyValidationSchema),
  BrandController.deleteManyBrand,
);
const BrandRoutes = router;
export default BrandRoutes;
