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
export const paymentController = {
  makePayment,
  withdrawAmount,
};
