import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { SingleTrack } from '../single-track/single.model';

const inspection = async () => {
  return await SingleTrack.find({ inspection: 'saved' });
};
const failedInspection = async () => {
  return await SingleTrack.find({ inspection: 'failed' });
};
const processing = async () => {
  return await SingleTrack.find({ isApproved: 'pending' });
};
const distributed = async () => {
  return await SingleTrack.find({ songStatus: 'distribute' });
};
const takeDown = async () => {
  return await SingleTrack.find({ songStatus: 'take-down ' });
};
const makeTakeDown = async (payload: { songId: string }) => {
  const { songId } = payload;
  const checkSong = await SingleTrack.findById(songId);
  if (!checkSong) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Song not found');
  }
  const result = await SingleTrack.findOneAndUpdate(
    { _id: songId },
    { songStatus: 'take-down' },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
const makeDistribute = async (payload: { songId: string }) => {
  const { songId } = payload;
  const checkSong = await SingleTrack.findById(songId);
  if (!checkSong) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Song not found');
  }
  const result = await SingleTrack.findOneAndUpdate(
    { _id: songId },
    { songStatus: 'distribute' },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const activityService = {
  inspection,
  failedInspection,
  processing,
  distributed,
  takeDown,
  makeTakeDown,
  makeDistribute,
};
