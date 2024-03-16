import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { YoutubeRequestService } from './youtube-request.service';

const addClaimRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await YoutubeRequestService.addClaimRequest(req, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Request send Successful',
    data: result,
  });
});
const addArtistChannelRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await YoutubeRequestService.addArtistChannelRequest(
      req,
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Request send Successful',
      data: result,
    });
  },
);
const addWhitelistRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await YoutubeRequestService.addWhitelistRequest(req, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Request send Successful',
    data: result,
  });
});
const getClaimRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await YoutubeRequestService.getClaimRequest(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data retrieved Successful',
    data: result,
  });
});
const getArtistChannelRequest = catchAsync(
  async (req: Request, res: Response) => {
    const result = await YoutubeRequestService.getArtistChannelRequest(
      req.params.id,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Data retrieved Successful',
      data: result,
    });
  },
);
const getWhitelistRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await YoutubeRequestService.getWhitelistRequest(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Data retrieved Successful',
    data: result,
  });
});

export const YoutubeRequestController = {
  addClaimRequest,
  addArtistChannelRequest,
  addWhitelistRequest,
  getClaimRequest,
  getArtistChannelRequest,
  getWhitelistRequest,
};
