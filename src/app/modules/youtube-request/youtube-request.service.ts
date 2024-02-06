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

const addClaimRequest = async (payload: IClaimRequest) => {
  if (payload.url == '') {
    throw new ApiError(400, 'Payload cannot be empty');
  }
  const result = await ClaimRequest.create(payload);
  return result;
};
const getClaimRequest = async (id: string) => {
  const result = await ClaimRequest.findOne({ user: id });
  if (!result) {
    throw new ApiError(404, 'Claim not found');
  }
};
const addArtistChannelRequest = async (payload: IArtistChannelRequest) => {
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
  return result;
};
const getArtistChannelRequest = async (id: string) => {
  const result = await ArtistChannelRequest.findOne({ user: id });
  if (!result) {
    throw new ApiError(404, 'Artist channel not found');
  }
};
const addWhitelistRequest = async (payload: IWhitelistRequest) => {
  if (payload.url == '') {
    throw new ApiError(400, 'Payload cannot be empty');
  }
  const result = await WhitelistRequest.create(payload);
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
