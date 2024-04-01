import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { ArtistsService } from './artists.service';
import sendResponse from '../../../shared/sendResponse';

const updatePrimaryArtist = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await ArtistsService.updatePrimaryArtist(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Artist update successful!',
    data: result,
  });
});
const updateWriter = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;
  const result = await ArtistsService.updateWriter(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Writer update successful!',
    data: result,
  });
});
export const PrimaryArtistController = {
  updatePrimaryArtist,
  updateWriter,
};
