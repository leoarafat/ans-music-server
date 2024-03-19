import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { bulkService } from './bulk.service';
import sendResponse from '../../../shared/sendResponse';

const createBulk = catchAsync(async (req: Request, res: Response) => {
  const result = await bulkService.createBulk(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});
const getBulkData = catchAsync(async (req: Request, res: Response) => {
  const result = await bulkService.getBulkData();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: result,
  });
});
export const bulkController = { createBulk, getBulkData };
