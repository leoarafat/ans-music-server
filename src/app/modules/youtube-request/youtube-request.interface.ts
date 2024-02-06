import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IClaimRequest = {
  url: string;
  user: Types.ObjectId | IUser;
  approvedStatus: 'pending' | 'accepted' | 'rejected';
};
export type IArtistChannelRequest = {
  channel_link: string;
  upc_1: string;
  topic_link: string;
  upc_2: string;
  upc_3: string;
  user: Types.ObjectId | IUser;
  approvedStatus: 'pending' | 'accepted' | 'rejected';
};
export type IWhitelistRequest = {
  url: string;
  user: Types.ObjectId | IUser;
  approvedStatus: 'pending' | 'accepted' | 'rejected';
};
