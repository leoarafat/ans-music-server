/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { IPayment } from './payments.interface';
import { Payment, Withdraw } from './payments.model';
import {
  generateExternalId,
  generateTransactionId,
} from '../../../utils/uniqueId';

//!
const makePayment = async (payload: IPayment) => {
  const { user, amount } = payload;

  // Generate transactionId and externalId
  const transactionId = generateTransactionId();
  const externalId = generateExternalId();

  const findUser = await User.findOne({ _id: user });
  if (!findUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update user's balance
  findUser.balance += amount;
  await findUser.save();

  // Create payment record
  const paymentPayload = {
    ...payload,
    transactionId,
    externalId,
  };

  return await Payment.create(paymentPayload);
};

//!
const withdrawAmount = async (payload: IPayment) => {
  try {
    const { user, amount } = payload;
    const currentUser = await User.findOne({ _id: user });
    if (!currentUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Payment record not found');
    }
    if (currentUser.balance < amount) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient balance');
    }
    currentUser.balance -= amount;
    await currentUser.save();
    return await Withdraw.create(payload);
  } catch (error) {
    throw new ApiError(
      //@ts-ignore
      error.status || httpStatus.INTERNAL_SERVER_ERROR,
      //@ts-ignore
      error.message || 'Withdrawal failed',
    );
  }
};
export const paymentService = { makePayment, withdrawAmount };
