import { Schema, model } from 'mongoose';
import { IPayment, IWithdraw } from './payments.interface';

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    transactionType: {
      type: String,
      enum: ['payment', 'withdrawal'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ['bank', 'bkash', 'cash', 'check', 'web-service'],
      required: true,
    },
    enterDate: {
      type: String,
      required: true,
    },
    externalId: {
      type: String,
      required: true,
    },
    vendorId: {
      type: String,
      required: true,
    },
    associatedContact: {
      type: String,
      required: true,
    },
    memo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

const withdrawSchema = new Schema<IWithdraw>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Withdraw = model('Withdraw', withdrawSchema);
export const Payment = model('Payment', paymentSchema);
