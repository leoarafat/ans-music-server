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
const myAllMusic = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SingleMusicService.myAllMusic(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Music Retrieved Successful',
    data: result,
  });
});
const singleMusic = catchAsync(async (req: Request, res: Response) => {
  const result = await SingleMusicService.singleMusic(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Music Retrieved Successful',
    data: result,
  });
});
const updateSingleMusic = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await SingleMusicService.updateSingleMusic(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Music Update Successful',
    data: result,
  });
});
const deleteSingleMusic = catchAsync(async (req: Request, res: Response) => {
  const result = await SingleMusicService.deleteSingleMusic(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Music Delete Successful',
    data: result,
  });
});
export const SingleMusicController = {
  uploadSingle,
  myAllMusic,
  singleMusic,
  updateSingleMusic,
  deleteSingleMusic,
};
