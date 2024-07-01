import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import {
  createOptionValidationSchema,
  createVariantValidationSchema,
} from './variant.validations';
import VariantControllers from './variant.controllers';

const router = Router();
const optionRouter = Router();

// create variant : POST
router.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(createVariantValidationSchema),
  VariantControllers.createVariant,
);

// get all variants : GET
router.get('/', VariantControllers.getAllVariant);

// create option : POST
optionRouter.post(
  '/',
  auth('ADMIN', 'SUPER_ADMIN'),
  validateRequest(createOptionValidationSchema),
  VariantControllers.createOption,
);

// get option : GET
optionRouter.get('/', VariantControllers.getAllOption);
export const OptionRoutes = optionRouter;
const VariantRoutes = router;
export default VariantRoutes;
