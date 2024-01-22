/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path';
import ejs from 'ejs';
import ApiError from '../../../errors/ApiError';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import sendEmail from '../../../utils/sendEmail';
import { Request } from 'express';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IActivationRequest,
  IActivationToken,
  IRegistration,
} from '../user/user.interface';
import SubUser from './sub-user.model';
import { ISubUser } from './sub-user.interface';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';

//!
const registrationSubUser = async (payload: IRegistration) => {
  const { name, email, password } = payload;
  const user = {
    name,
    email,
    password,
  };

  const isEmailExist = await SubUser.findOne({ email });
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
  const newUser: { user: ISubUser; activationCode: string } = jwt.verify(
    activation_token,
    config.activation_secret as string,
  ) as { user: ISubUser; activationCode: string };
  if (newUser.activationCode !== activation_code) {
    throw new ApiError(400, 'Activation code is not valid');
  }
  const { name, email, password } = newUser.user;
  const existUser = await SubUser.findOne({ email });
  if (existUser) {
    throw new ApiError(400, 'Email is already exist');
  }
  const user = await SubUser.create({
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
  };
};
//!
const getAllUsers = async (id: string): Promise<ISubUser[]> => {
  const users = await SubUser.find({ user: id });
  return users;
};
//!
const getSingleUser = async (id: string): Promise<ISubUser | null> => {
  const result = await SubUser.findById(id);

  return result;
};
//!
const updateUser = async (
  id: string,
  req: Request,
): Promise<ISubUser | null> => {
  const isExist = await SubUser.findOne({ _id: id });
  const { files } = req;
  const data = JSON.parse(req.body.data);
  //@ts-ignore
  const nidFrontImage = files.nidFront[0];
  //@ts-ignore
  const nidBackImage = files.nidBack[0];
  //@ts-ignore
  const imageFile = files.image[0];
  if (!isExist) {
    throw new ApiError(404, 'User not found!');
  }

  const { ...userData } = data;

  const result = await SubUser.findOneAndUpdate(
    { _id: id },
    {
      ...userData,
      image: `${config.base_url}/${imageFile.path}`,
      nidFront: `${config.base_url}/${nidFrontImage.path}`,
      nidBack: `${config.base_url}/${nidBackImage.path}`,
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
      Boolean(result.copyrightNotice) &&
      Boolean(result.dashboardScreenShot) &&
      Boolean(result.balance);
    //@ts-ignore
    result.isVerified = isComplete;
    await result.save();
  }
  return result;
};
//!
const deleteUser = async (id: string): Promise<ISubUser | null> => {
  const result = await SubUser.findByIdAndDelete(id);

  return result;
};
//!
const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await SubUser.isSubUserExist(email);

  if (!isUserExist) {
    throw new ApiError(404, 'SUb User does not exist');
  }

  if (
    isUserExist.password &&
    !(await SubUser.isPasswordMatched(password, isUserExist.password))
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

  const isUserExist = await SubUser.isSubUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(403, 'Sub User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
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
  const { oldPassword } = payload;
  const isUserExist = await SubUser.findOne({ _id: user?.userId }).select(
    '+password',
  );
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  if (
    isUserExist.password &&
    !(await SubUser.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(402, 'Old password is incorrect');
  }

  isUserExist.save();
};
export const SubUserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  registrationSubUser,
  activateUser,
  login,
  refreshToken,
  changePassword,
};
