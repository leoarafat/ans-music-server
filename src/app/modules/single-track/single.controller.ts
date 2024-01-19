import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { SingleMusicService } from './single.service';
import sendResponse from '../../../shared/sendResponse';

const uploadSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await SingleMusicService.uploadSingle(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Music Uploaded Successful',
    data: result,
  });
});
export const SingleMusicController = {
  uploadSingle,
};
