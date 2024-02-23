import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { AlbumService } from './album.service';

const myAllAlbum = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AlbumService.myAllAlbum(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Album Retrieved Successful',
    data: result,
  });
});
const singleAlbum = catchAsync(async (req: Request, res: Response) => {
  const result = await AlbumService.SingleAlbum(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Album Retrieved Successful',
    data: result,
  });
});
const updateSingleAlbum = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await AlbumService.updateAlbum(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Album Update Successful',
    data: result,
  });
});
const deleteSingleAlbum = catchAsync(async (req: Request, res: Response) => {
  const result = await AlbumService.deleteAlbum(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Album Delete Successful',
    data: result,
  });
});

export const AlbumController = {
  myAllAlbum,
  singleAlbum,
  updateSingleAlbum,
  deleteSingleAlbum,
};
