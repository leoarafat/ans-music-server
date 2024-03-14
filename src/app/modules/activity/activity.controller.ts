import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { activityService } from './activity.service';
import sendResponse from '../../../shared/sendResponse';

const inspection = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.inspection();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const failedInspection = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.failedInspection();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const processing = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.processing();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const distributed = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.distributed();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const takeDown = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.takeDown();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const makeTakeDown = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.makeTakeDown(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const makeDistribute = catchAsync(async (req: Request, res: Response) => {
  const result = await activityService.makeDistribute(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const activityController = {
  inspection,
  failedInspection,
  processing,
  distributed,
  takeDown,
  makeTakeDown,
  makeDistribute,
};
