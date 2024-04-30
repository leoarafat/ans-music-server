import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { inspectionService } from './Inspection.service';

const userInspection = catchAsync(async (req: Request, res: Response) => {
  const result = await inspectionService.userInspection(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const songInspection = catchAsync(async (req: Request, res: Response) => {
  const result = await inspectionService.songInspection(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const userTotalSong = catchAsync(async (req: Request, res: Response) => {
  const result = await inspectionService.userTotalSong(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
// const singleTracks = catchAsync(async (req: Request, res: Response) => {
//   const result = await inspectionService.singleTracks(req.params.id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Successful',
//     data: result,
//   });
// });

export const inspectionController = {
  userInspection,
  songInspection,
  userTotalSong,
};
