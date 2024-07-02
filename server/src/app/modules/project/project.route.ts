import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createProjectValidationSchema } from './project.validation';
import auth from '../../middlewares/auth';
import ProjectController from './project.controller';

const router = Router();

// create project
router.post(
  '/',
  auth('ADMIN'),
  validateRequest(createProjectValidationSchema),
  ProjectController.createProject,
);

// get all projects
router.get('/', ProjectController.getAllProject);

// get single projects
router.get('/:id', ProjectController.getSingleProjectById);

// delete single project : DELETE
router.delete('/:id', auth('ADMIN'), ProjectController.deleteSingleProject);

const ProjectRoutes = router;
export default ProjectRoutes;
