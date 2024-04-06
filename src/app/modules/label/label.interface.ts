import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type ILabel = {
  user: Types.ObjectId | IUser;
  labelName: string;
  labelId: number;
};
