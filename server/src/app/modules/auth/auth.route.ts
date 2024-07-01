import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  loginValidationSchema,
  refreshTokenValidationSchema,
  registrationValidationSchema,
} from './auth.validation';
import AuthController from './auth.controller';

const router = Router();

// register : POST
router.post(
  '/register',
  validateRequest(registrationValidationSchema),
  AuthController.register,
);

// login : POST
router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthController.login,
);

// refresh token : POST
router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken,
);

// logout
router.post('/logout', AuthController.logout);
const AuthRoutes = router;
export default AuthRoutes;
