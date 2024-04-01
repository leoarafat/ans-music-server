import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { SingleTrack } from '../single-track/single.model';

const userInspection = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const releaseSongs = await SingleTrack.find({ user: id });
  const latest = await SingleTrack.find({ user: id })
    .limit(5)
    .sort({ createdAt: -1 });

  const totalRelease = await SingleTrack.countDocuments(releaseSongs);

  return {
    userInfo: user,
    totalRelease,
    latestRelease: latest,
  };
};
const songInspection = async (id: string) => {
  const song = await SingleTrack.findById(id);
  if (!song) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return song;
};

const userTotalSong = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const releaseSongs = await SingleTrack.find({ user: id });

  return releaseSongs;
};

export const inspectionService = {
  userInspection,
  songInspection,
  userTotalSong,
};
