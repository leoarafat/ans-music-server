/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ISubUser = {
  _id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  address: string;
  role: 'sub-user';
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
  copyrightNotice: string;
  dashboardScreenShot: string;
  balance: number;
  isVerified: false;
  user: Types.ObjectId | IUser;
};
export type SubUserModel = {
  isSubUserExist(
    email: string,
  ): Promise<Pick<ISubUser, '_id' | 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<ISubUser>;
