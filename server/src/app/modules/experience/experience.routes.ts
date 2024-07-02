import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { addExperienceValidationSchema } from './experience.validation';
import ExperienceControllers from './experience.controllers';

const router = Router();

// add experience : POST
router.post(
  '/add',
  auth(),
  validateRequest(addExperienceValidationSchema),
  ExperienceControllers.addNewExperience,
);

// get all experiences : GET
router.get('/all', ExperienceControllers.getAllExperiences);
const ExperienceRoutes = router;
export default ExperienceRoutes;
