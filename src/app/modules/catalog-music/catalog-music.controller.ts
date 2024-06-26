import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { catalogMusicService } from './catalog-music.service';

const releaseSongs = catchAsync(async (req: Request, res: Response) => {
  const result = await catalogMusicService.releaseSongs(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const tracks = catchAsync(async (req: Request, res: Response) => {
  const result = await catalogMusicService.tracks(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const artists = catchAsync(async (req: Request, res: Response) => {
  const result = await catalogMusicService.artists();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});
const labels = catchAsync(async (req: Request, res: Response) => {
  const result = await catalogMusicService.labels();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successful',
    data: result,
  });
});

export const catalogMusicController = {
  releaseSongs,
  tracks,
  artists,
  labels,
};
