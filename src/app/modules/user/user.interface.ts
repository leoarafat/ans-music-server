/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
export type IEmailOptions = {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
};
export type IRegistration = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};
export type IActivationToken = {
  token: string;
  activationCode: string;
};
export type IActivationRequest = {
  activation_token: string;
  activation_code: string;
};

export type IUser = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  role: 'admin' | 'super-admin' | 'user' | 'sub-user';
  image: string;
  nidFront: string;
  nidBack: string;
  country: string;
  state: string;
  city: string;
  postCode: string;
  channelName: string;
  channelUrl: string;
  subscribeCount: number;
  videosCount: number;
  copyrightNoticeImage: string;
  dashboardScreenShot: string;
  balance: number;
  isVerified: false;
  isBlock: boolean;
  subUsers: [];
  note: [];
  accountStatus: 'lock' | 'terminate';
};
export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
