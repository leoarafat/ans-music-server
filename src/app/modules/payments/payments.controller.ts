import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { paymentService } from './payments.service';

const makePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.makePayment(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' successfully',
    data: result,
  });
});
const withdrawAmount = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.withdrawAmount(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' successfully',
    data: result,
  });
});
const totalPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.totalPayments();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' successfully',
    data: result,
  });
});
const totalTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.totalTransaction();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' successfully',
    data: result,
  });
});
const deleteTransaction = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.deleteTransaction(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' successfully',
    data: result,
  });
});
const userForPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.userForPayment();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' successfully',
    data: result,
  });
});
export const paymentController = {
  makePayment,
  withdrawAmount,
  totalPayments,
  totalTransaction,
  deleteTransaction,
  userForPayment,
};
