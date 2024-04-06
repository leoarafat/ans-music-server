import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { SingleTrack } from '../single-track/single.model';
import { Album } from '../album/album.model';
//!
// const userInspection = async (id: string) => {
//   const user = await User.findById(id);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   const releaseSongs = await SingleTrack.find({ user: id });
//   const latest = await SingleTrack.find({ user: id })
//     .limit(5)
//     .sort({ createdAt: -1 });
//   const allSong = await SingleTrack.find({ user: id });

//   const totalRelease = await SingleTrack.countDocuments(releaseSongs);

//   return {
//     userInfo: user,
//     totalRelease,
//     latestRelease: latest,
//     allSong,
//   };
// };
//!
const userInspection = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Find both single tracks and albums for the user
  const singleTracks = await SingleTrack.find({ user: id })
    .populate('label')
    .populate('primaryArtist')
    .lean();
  const albums = await Album.find({ user: id })
    .populate('label')
    .populate('primaryArtist')
    .lean();

  // Fetch latest single tracks and albums for the user
  const latestSingleTrack = await SingleTrack.find({ user: id })
    .limit(5)
    .sort({ createdAt: -1 })
    .lean();
  const latestAlbum = await Album.find({ user: id })
    .limit(5)
    .sort({ createdAt: -1 })
    .lean();

  // Combine single tracks and albums for total releases and all songs
  const totalReleases = singleTracks.length + albums.length;
  const allSongs = [...singleTracks, ...albums];

  return {
    userInfo: user,
    totalReleases,
    latestRelease: [...latestSingleTrack, ...latestAlbum],
    allSong: allSongs,
  };
};

const songInspection = async (id: string) => {
  const song = await SingleTrack.findById(id)
    .populate('label')
    .populate('primaryArtist');
  if (song) {
    return song;
  }
  const album = await Album.findById(id)
    .populate('label')
    .populate('primaryArtist');
  if (album) {
    return album;
  }
};
//!
// const userTotalSong = async (id: string) => {
//   const user = await User.findById(id);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   const releaseSongs = await SingleTrack.find({ user: id });

//   return releaseSongs;
// };
//!
const userTotalSong = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Find both single tracks and albums for the user
  const singleTracks = await SingleTrack.find({ user: id })
    .populate('label')
    .populate('primaryArtist')
    .lean();
  const albums = await Album.find({ user: id })
    .populate('label')
    .populate('primaryArtist')
    .lean();

  // Combine single tracks and albums
  const totalSongs = [...singleTracks, ...albums];

  return totalSongs;
};

export const inspectionService = {
  userInspection,
  songInspection,
  userTotalSong,
};
