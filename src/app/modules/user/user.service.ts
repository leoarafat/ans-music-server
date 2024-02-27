/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import ejs from 'ejs';
import ApiError from '../../../errors/ApiError';
import {
  IActivationRequest,
  IActivationToken,
  IRegistration,
  IUser,
} from './user.interface';
import User from './user.model';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import sendEmail from '../../../utils/sendEmail';
import { Request } from 'express';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';

//!
const registrationUser = async (payload: IRegistration) => {
  const { name, email, password } = payload;
  const user = {
    name,
    email,
    password,
  };

  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }

  const activationToken = createActivationToken(user);
  const activationCode = activationToken.activationCode;
  const data = { user: { name: user.name }, activationCode };
  await ejs.renderFile(
    path.join(__dirname, '../../../mails/activation-mail.ejs'),
    data,
  );
  try {
    await sendEmail({
      email: user.email,
      subject: 'Activate Your Account',
      template: 'activation-mail.ejs',
      data,
    });
  } catch (error: any) {
    throw new ApiError(500, `${error.message}`);
  }
  return {
    activationToken: activationToken.token,
    user,
  };
};
//!
const createActivationToken = (user: IRegistration): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    config.activation_secret as Secret,
    {
      expiresIn: '5m',
    },
  );
  return { token, activationCode };
};
//!
const activateUser = async (payload: IActivationRequest) => {
  const { activation_code, activation_token } = payload;
  const newUser: { user: IUser; activationCode: string } = jwt.verify(
    activation_token,
    config.activation_secret as string,
  ) as { user: IUser; activationCode: string };
  if (newUser.activationCode !== activation_code) {
    throw new ApiError(400, 'Activation code is not valid');
  }
  const { name, email, password } = newUser.user;
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw new ApiError(400, 'Email is already exist');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const accessToken = jwtHelpers.createToken(
    { userId: user._id, role: user.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId: user._id, role: user.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );
  return {
    accessToken,
    refreshToken,
    user,
  };
};
//!
const createUser = async (userData: IUser): Promise<IUser | null> => {
  const newUser = await User.create(userData);

  return newUser;
};
//!
const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};
//!
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};
//!
const updateUser = async (id: string, req: Request): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  const { files } = req;
  const data = JSON.parse(req.body.data);
  //@ts-ignore
  const nidFrontImage = files.nidFront[0];
  //@ts-ignore
  const nidBackImage = files.nidBack[0];
  //@ts-ignore
  const imageFile = files.image[0];
  //@ts-ignore
  const copyrightNoticeImageFile = files.copyrightNoticeImage[0];
  //@ts-ignore
  const dashboardScreenShotFile = files.dashboardScreenShot[0];
  if (!isExist) {
    throw new ApiError(404, 'User not found!');
  }

  const { ...userData } = data;

  const result = await User.findOneAndUpdate(
    { _id: id },
    {
      ...userData,
      image: imageFile.path,
      nidFront: nidFrontImage.path,
      nidBack: nidBackImage.path,
      copyrightNoticeImage: copyrightNoticeImageFile.path,
      dashboardScreenShot: dashboardScreenShotFile.path,
    },
    {
      new: true,
    },
  );
  if (result) {
    const isComplete =
      Boolean(result.name) &&
      Boolean(result.email) &&
      Boolean(result.phoneNumber) &&
      Boolean(result.password) &&
      Boolean(result.address) &&
      Boolean(result.role) &&
      Boolean(result.image) &&
      Boolean(result.nidFront) &&
      Boolean(result.nidBack) &&
      Boolean(result.country) &&
      Boolean(result.state) &&
      Boolean(result.city) &&
      Boolean(result.postCode) &&
      Boolean(result.channelName) &&
      Boolean(result.channelUrl) &&
      Boolean(result.subscribeCount) &&
      Boolean(result.videosCount) &&
      Boolean(result.copyrightNoticeImage) &&
      Boolean(result.dashboardScreenShot) &&
      Boolean(result.balance);
    //@ts-ignore
    result.isVerified = isComplete;
    await result.save();
  }
  return result;
};
//!
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};
//!
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(402, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(402, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(403, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.findOne({ _id: user?.userId }).select(
    '+password',
  );

  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(402, 'Old password is incorrect');
  }
  isUserExist.password = newPassword;
  await isUserExist.save();
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  registrationUser,
  activateUser,
  loginUser,
  refreshToken,
  changePassword,
};
