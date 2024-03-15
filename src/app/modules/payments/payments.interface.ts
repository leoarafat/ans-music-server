import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IPayment = {
  transactionType: 'payment' | 'withdrawal';
  amount: number;
  method: 'bank' | 'bkash' | 'cash' | 'check' | 'web-service';
  enterDate: string;
  externalId: string;
  vendorId: string;
  associatedContact: string;
  memo: string;
  user: Types.ObjectId | IUser;
  transactionId: string;
};
export type IWithdraw = {
  user: Types.ObjectId | IUser;
  amount: number;
};
