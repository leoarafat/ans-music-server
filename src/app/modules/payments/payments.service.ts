/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { IPayment } from './payments.interface';
import { Payment, Withdraw } from './payments.model';
import { generateTransactionId } from '../../../utils/uniqueId';
import sendEmail from '../../../utils/sendEmail';
import path from 'path';
import ejs from 'ejs';
import { SingleTrack } from '../single-track/single.model';
import { Album } from '../album/album.model';
//!
const makePayment = async (payload: IPayment) => {
  const { user, amount, externalId } = payload;
  // console.log(payload);
  // Generate transactionId and externalId
  const transactionId = generateTransactionId();
  // const externalId = generateExternalId();

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
    name: findUser?.name,
    transactionId: result.transactionId,
    amount: result.amount,
    enterDate: result.enterDate,
  };
  await ejs.renderFile(
    path.join(__dirname, '../../../mails/payment.ejs'),
    data,
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
  let totalAmount = 0;

  for (const payment of payments) {
    totalAmount += payment.amount;
  }

  return {
    totalPayments: payments.length,
    paymentUser: payments,
    totalAmount: totalAmount,
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

const userForPayment = async () => {
  try {
    const approvedSingleSongs = await SingleTrack.find({
      isApproved: 'approved',
    }).populate('user');
    const approvedAlbumSongs = await Album.find({
      isApproved: 'approved',
    }).populate('user');

    // Extract users from single tracks and albums
    const singleTrackUsers = approvedSingleSongs.map(song => song.user);
    const albumUsers = approvedAlbumSongs.map(album => album.user);

    // Merge all users into one array
    const allUsers = [...singleTrackUsers, ...albumUsers];

    return {
      allUsers,
      approvedSingleSongs,
      approvedAlbumSongs,
    };
  } catch (error) {
    console.error('Error fetching approved songs for payment:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const paymentService = {
  makePayment,
  withdrawAmount,
  totalPayments,
  totalTransaction,
  deleteTransaction,
  userForPayment,
};
