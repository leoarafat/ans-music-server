import ApiError from '../../../errors/ApiError';
import {
  IArtistChannelRequest,
  IClaimRequest,
  IWhitelistRequest,
} from './youtube-request.interface';
import {
  ArtistChannelRequest,
  ClaimRequest,
  WhitelistRequest,
} from './youtube-request.model';

import { Request } from 'express';
import sendEmail from '../../../utils/sendEmail';
import httpStatus from 'http-status';
import { youtubeRequestEmailBody } from './youtube.mail';
const addClaimRequest = async (req: Request, payload: IClaimRequest) => {
  if (payload.url == '') {
    throw new ApiError(400, 'Payload cannot be empty');
  }
  const user = payload.user;

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await ClaimRequest.create(payload);
  const paddedId = result._id.toString().padStart(4, '0');
  const data = { url: result.url, id: paddedId, type: 'Claim' };

  try {
    sendEmail({
      email: 'support@ansmusiclimited.com',
      subject: 'New claim request',
      html: youtubeRequestEmailBody(data),
    });
  } catch (error: any) {
    throw new ApiError(500, `${error.message}`);
  }
  return result;
};
const getClaimRequest = async (id: string) => {
  const result = await ClaimRequest.findOne({ user: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Claim not found');
  }
};
const addArtistChannelRequest = async (
  req: Request,
  payload: IArtistChannelRequest,
) => {
  if (
    payload.topic_link == '' ||
    payload.topic_link == '' ||
    payload.upc_1 == '' ||
    payload.upc_2 == '' ||
    payload.upc_3 == ''
  ) {
    throw new ApiError(400, 'Payload cannot be empty');
  }
  const result = await ArtistChannelRequest.create(payload);
  const paddedId = result._id.toString().padStart(4, '0');
  const data = {
    url: result.topic_link,
    id: paddedId,
    type: 'Artist Channel Request',
  };

  try {
    sendEmail({
      email: 'support@ansmusiclimited.com',
      subject: 'New Artist Channel Request',
      html: youtubeRequestEmailBody(data),
    });
  } catch (error: any) {
    throw new ApiError(500, `${error.message}`);
  }
  return result;
};
const getArtistChannelRequest = async (id: string) => {
  const result = await ArtistChannelRequest.findOne({ user: id });
  if (!result) {
    throw new ApiError(404, 'Artist channel not found');
  }
};
const addWhitelistRequest = async (
  req: Request,
  payload: IWhitelistRequest,
) => {
  if (payload.url == '') {
    throw new ApiError(400, 'Payload cannot be empty');
  }
  const result = await WhitelistRequest.create(payload);
  const paddedId = result._id.toString().padStart(4, '0');
  const data = { url: result.url, id: paddedId, type: 'Whitelist Request' };

  try {
    sendEmail({
      email: 'support@ansmusiclimited.com',
      subject: 'New Whitelist Request',
      html: youtubeRequestEmailBody(data),
    });
  } catch (error: any) {
    throw new ApiError(500, `${error.message}`);
  }
  return result;
};
const getWhitelistRequest = async (id: string) => {
  const result = await WhitelistRequest.findOne({ user: id });
  if (!result) {
    throw new ApiError(404, 'Whitelist not found');
  }
};

export const YoutubeRequestService = {
  addClaimRequest,
  addArtistChannelRequest,
  addWhitelistRequest,
  getClaimRequest,
  getArtistChannelRequest,
  getWhitelistRequest,
};
