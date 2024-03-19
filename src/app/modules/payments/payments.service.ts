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
import sendEmail from '../../../utils/sendEmail';
import path from 'path';
import ejs from 'ejs';
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

  const result = await Payment.create(paymentPayload);

  const data = {
    transactionId: result.transactionId,
    amount: result.amount,
    enterDate: result.enterDate,
  };
  await ejs.renderFile(
    path.join(__dirname, '../../../mails/activation-mail.ejs'),
    result,
  );
  try {
    await sendEmail({
      email: findUser?.email,
      subject: 'New Payment Received',
      template: 'payment.ejs',
      data,
    });
  } catch (error: any) {
    throw new ApiError(500, `${error.message}`);
  }
  return result;
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

const totalPayments = async () => {
  const payments = await Payment.find({});
  const total = await Payment.countDocuments(payments);
  return {
    totalPayments: total,
    paymentUser: payments,
  };
};
const totalTransaction = async () => {
  const payments = await Payment.find({});
  const totalPayment = payments.reduce((acc, price) => {
    return acc + price.amount;
  }, 0);

  return {
    totalPayments: totalPayment,
    paymentUser: payments,
  };
};
const deleteTransaction = async (id: string) => {
  const isExist = await Payment.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transaction not found');
  }
  return await Payment.findByIdAndDelete(id);
};
export const paymentService = {
  makePayment,
  withdrawAmount,
  totalPayments,
  totalTransaction,
  deleteTransaction,
};
