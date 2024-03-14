import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { financeService } from './finance.service';

const allReports = catchAsync(async (req: Request, res: Response) => {
  const result = await financeService.allReports();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const approved = catchAsync(async (req: Request, res: Response) => {
  const result = await financeService.approved();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const financeController = { allReports, approved };
