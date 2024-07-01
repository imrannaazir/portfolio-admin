import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthService from './auth.service';
import config from '../../config';

// register
const register = catchAsync(async (req, res) => {
  const { accessToken, refreshToken, user } = await AuthService.register(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'development' ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully.',
    data: { accessToken, user },
  });
});

// login
const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthService.login(req.body);

  // set cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'development' ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully.',
    data: { accessToken },
  });
});

const logout = catchAsync(async (req, res) => {
  res.cookie('refreshToken', null, {
    secure: config.NODE_ENV === 'development' ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged out successfully.',
    data: null,
  });
});

// refresh token
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  const result = await AuthService.refreshToken(token);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'AccessToken retrieved successfully.',
    data: result,
  });
});
const AuthController = {
  register,
  login,
  refreshToken,
  logout,
};

export default AuthController;
