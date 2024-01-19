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
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import sendEmail from '../../../utils/sendEmail';
import { Request } from 'express';

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
  return user;
};

//!
// const registrationUser = async (payload: IRegistration) => {
//   const { name, email, password } = payload;

//   const isEmailExist = await User.findOne({ email });
//   if (isEmailExist) {
//     throw new ApiError(400, 'Email already exists');
//   }

//   const activationToken = createActivationToken({ name, email, password });
//   const activationCode = activationToken.activationCode;

//   // const data = { user: { name }, activationCode };

//   try {
//     await sendActivationEmail(email, name, activationCode); // Send activation email
//   } catch (error: any) {
//     throw new ApiError(500, `${error.message}`);
//   }

//   return {
//     activationToken: activationToken.token,
//     user: { name, email, password }, // Return user details
//   };
// };

// const createActivationToken = (user: {
//   name: string;
//   email: string;
//   password: string;
// }): IActivationToken => {
//   const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

//   const token = jwt.sign(
//     {
//       user,
//       activationCode,
//     },
//     config.activation_secret as Secret,
//     {
//       expiresIn: '5m',
//     },
//   );
//   return { token, activationCode };
// };

// const sendActivationEmail = async (
//   email: string,
//   name: string,
//   activationCode: string,
// ) => {
//   try {
//     const data = { user: { name }, activationCode }; // Prepare data for the email template
//     await sendEmail({
//       email: email,
//       subject: 'Activate Your Account',
//       template: 'activation-mail.ejs', // Assuming this is the correct template filename
//       data,
//     });
//   } catch (error: any) {
//     throw new Error(`Error sending activation email: ${error.message}`);
//   }
// };

// const activateUser = async (payload: IActivationRequest) => {
//   const { activation_code, activation_token } = payload;
//   const newUser: { user: IUser; activationCode: string } = jwt.verify(
//     activation_token,
//     config.activation_secret as string,
//   ) as { user: IUser; activationCode: string };
//   if (newUser.activationCode !== activation_code) {
//     throw new ApiError(400, 'Activation code is not valid');
//   }
//   const { name, email, password } = newUser.user;
//   const existUser = await User.findOne({ email });
//   if (existUser) {
//     throw new ApiError(400, 'Email is already exist');
//   }
//   const user = await User.create({
//     name,
//     email,
//     password,
//   });
//   return user;
// };
//!

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const newUser = await User.create(userData);

  return newUser;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};
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
  if (!isExist) {
    throw new ApiError(404, 'User not found!');
  }

  const { ...userData } = data;

  const result = await User.findOneAndUpdate(
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
// const updateUser = async (id: string, payload: Partial<IUser>) => {
//   try {
//     const user = await User.findById(id);

//     if (!user) {
//       throw new ApiError(404, 'user not found');
//     }
//     payload.name = payload.name || user.name;
//     payload.phoneNumber = payload.phoneNumber || user.phoneNumber;
//     payload.address = payload.address || user.address;
//     payload.image = payload.image || user.image;
//     payload.nidFront = payload.nidFront || user.nidFront;
//     payload.nidBack = payload.nidBack || user.nidBack;
//     payload.country = payload.country || user.country;
//     payload.state = payload.state || user.state;
//     payload.city = payload.city || user.city;
//     payload.postCode = payload.postCode || user.postCode;
//     payload.channelName = payload.channelName || user.channelName;
//     payload.channelUrl = payload.channelUrl || user.channelUrl;
//     payload.subscribeCount = payload.subscribeCount || user.subscribeCount;
//     payload.videosCount = payload.videosCount || user.videosCount;
//     payload.copyrightNotice = payload.copyrightNotice || user.copyrightNotice;
//     payload.dashboardScreenShot =
//       payload.dashboardScreenShot || user.dashboardScreenShot;
//     payload.balance = payload.balance || user.balance;

//     const isComplete =
//       Boolean(payload.name) &&
//       Boolean(payload.email) &&
//       Boolean(payload.phoneNumber) &&
//       Boolean(payload.password) &&
//       Boolean(payload.address) &&
//       Boolean(payload.role) &&
//       Boolean(payload.image) &&
//       Boolean(payload.nidFront) &&
//       Boolean(payload.nidBack) &&
//       Boolean(payload.country) &&
//       Boolean(payload.state) &&
//       Boolean(payload.city) &&
//       Boolean(payload.postCode) &&
//       Boolean(payload.channelName) &&
//       Boolean(payload.channelUrl) &&
//       Boolean(payload.subscribeCount) &&
//       Boolean(payload.videosCount) &&
//       Boolean(payload.copyrightNotice) &&
//       Boolean(payload.dashboardScreenShot) &&
//       Boolean(payload.balance);

//     // Now, use the payload with default values and check if it's complete
//     if (isComplete) {
//       //@ts-ignore
//       user.isVerified = isComplete;
//       await user.save();
//       return user;
//     }
//     return user;
//   } catch (error) {
//     throw new ApiError(500, 'Internal Server Error');
//   }
// };

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  registrationUser,
  activateUser,
};
