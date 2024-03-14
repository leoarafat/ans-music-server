import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';
import { IUser } from '../user/user.interface';
import config from '../../../config';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';

const registrationUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.registrationUser(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Admin Created`,
      data: result,
    });
  },
);

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;

    const result = await AdminService.createUser(userData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'User created successfully',
      data: result,
    });
  },
);
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsers();
  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});
const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AdminService.login(loginData);
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
    message: 'Admin loggedin successfully !',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AdminService.refreshToken(refreshToken);
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin lohggedin successfully !',
    data: result,
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body;
  const user = req.user;
  await AdminService.changePassword(user, passwordData);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Password change successfully !',
  });
});
const approveSingleMusic = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.approveSingleMusic(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Song approved successful!',
    data: result,
  });
});
const rejectMusic = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await AdminService.rejectMusic(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Song rejected successful!',
    data: result,
  });
});
//! Youtube Request
const getClaimRequests = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getClaimRequests();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'data retrieved successful!',
    data: result,
  });
});
const getClaimRequestsPending = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.getClaimRequestsPending();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieved successful!',
      data: result,
    });
  },
);
const getArtistChannelRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.getArtistChannelRequest();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieved successful!',
      data: result,
    });
  },
);
const getArtistChannelRequestPending = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.getArtistChannelRequestPending();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieved successful!',
      data: result,
    });
  },
);
const getWhitelistRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getWhitelistRequest();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'data retrieved successful!',
    data: result,
  });
});
const getWhitelistRequestPending = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminService.getWhitelistRequestPending();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'data retrieved successful!',
      data: result,
    });
  },
);
const updateClaimRequests = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await AdminService.updateClaimRequests(id, data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Update successful!',
    data: result,
  });
});
const updateArtistChannelRequest = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await AdminService.updateArtistChannelRequest(id, data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Update successful!',
      data: result,
    });
  },
);
const updateWhitelistRequest = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const result = await AdminService.updateWhitelistRequest(id, data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Update successful!',
      data: result,
    });
  },
);
//! Add note, make terminate and lock User
const addNoteInUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AdminService.addNoteInUser(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successful!',
    data: result,
  });
});
const terminateUserAccount = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AdminService.terminateUserAccount(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successful!',
    data: result,
  });
});
const lockUserAccount = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AdminService.lockUserAccount(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successful!',
    data: result,
  });
});

export const AdminController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  registrationUser,
  login,
  changePassword,
  refreshToken,
  approveSingleMusic,
  rejectMusic,
  getClaimRequests,
  getArtistChannelRequest,
  getWhitelistRequest,
  getClaimRequestsPending,
  getWhitelistRequestPending,
  getArtistChannelRequestPending,
  updateArtistChannelRequest,
  updateClaimRequests,
  updateWhitelistRequest,
  addNoteInUser,
  terminateUserAccount,
  lockUserAccount,
};
