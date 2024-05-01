import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { StaticsService } from './statics.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StaticsService.insertIntoDB(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Statics Uploaded Successful',
    data: result,
  });
});
const generateAnalytics = catchAsync(async (req: Request, res: Response) => {
  const result = await StaticsService.generateAnalytics(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Statics Retrieved Successful',
    data: result,
  });
});
const getCorrectionRequestAlbum = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StaticsService.getCorrectionRequestAlbum(
      req.params.id,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' Successful',
      data: result,
    });
  },
);
const getCorrectionRequestSingle = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StaticsService.getCorrectionRequestSingle(
      req.params.id,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' Successful',
      data: result,
    });
  },
);
const getNews = catchAsync(async (req: Request, res: Response) => {
  const result = await StaticsService.getNews();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Successful',
    data: result,
  });
});
const lastSixApprovedTracks = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StaticsService.lastSixApprovedTracks(req.params.id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: ' Successful',
      data: result,
    });
  },
);
export const StaticsController = {
  insertIntoDB,
  generateAnalytics,
  getCorrectionRequestAlbum,
  getCorrectionRequestSingle,
  getNews,
  lastSixApprovedTracks,
};
