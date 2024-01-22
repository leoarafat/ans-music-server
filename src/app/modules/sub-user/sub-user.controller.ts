import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import config from '../../../config';
import sendResponse from '../../../shared/sendResponse';
import { SubUserService } from './sub-user.service';
import { ISubUser } from './sub-user.interface';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';

const registrationUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubUserService.registrationSubUser(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Please check your email: ${result?.user?.email} to active your account`,
      activationToken: result.activationToken,
    });
  },
);
const activateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubUserService.activateUser(req.body);
    const { refreshToken } = result;
    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    // await SubUserService.activateUser(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Sub User activate successful',
      data: result,
    });
  },
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SubUserService.getAllUsers(id);
  sendResponse<ISubUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'SUb User retrieved successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SubUserService.getSingleUser(id);
  sendResponse<ISubUser>(res, {
    statusCode: 200,
    success: true,
    message: 'Sub User retrieved successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SubUserService.updateUser(id, req);
  sendResponse<ISubUser>(res, {
    statusCode: 200,
    success: true,
    message: 'SUb User updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SubUserService.deleteUser(id);
  sendResponse<ISubUser>(res, {
    statusCode: 200,
    success: true,
    message: 'SUb User deleted successfully',
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await SubUserService.login(loginData);
  const { refreshToken } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'SUb User loggedin successfully !',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await SubUserService.refreshToken(refreshToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Sub User lohggedin successfully !',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  const user = req.user;
  await SubUserService.changePassword(user, passwordData);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Password change successfully !',
  });
});
export const SubUserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  registrationUser,
  activateUser,
  login,
  changePassword,
  refreshToken,
};
