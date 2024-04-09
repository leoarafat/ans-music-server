import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { SingleTrack } from '../single-track/single.model';
import { Album } from '../album/album.model';
import { updateImageUrl } from '../../../utils/url-modifier';
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
  const singleSongData = singleTracks.map(song => ({
    ...song,
    audio: updateImageUrl(song.audio.path).replace(/\\/g, '/'),
    image: updateImageUrl(song.image).replace(/\\/g, '/'),
  }));
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
  const albumSongData = latestAlbum.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: updateImageUrl(audioItem.path).replace(/\\/g, '/'),
      image: updateImageUrl(album.image).replace(/\\/g, '/'),
    })),
  );
  // Combine single tracks and albums for total releases and all songs
  const totalReleases = singleTracks.length + albums.length;
  const allSongs = [...singleSongData, ...albums];

  return {
    userInfo: user,
    totalReleases,
    latestRelease: [...latestSingleTrack, ...albumSongData],
    allSong: allSongs,
  };
};

const songInspection = async (id: string) => {
  const song = await SingleTrack.findById(id)
    .populate('label')
    .populate('primaryArtist');
  if (song) {
    const updatedResult = {
      ...song.toObject(),
      audio: updateImageUrl(song.audio.path).replace(/\\/g, '/'),
      image: updateImageUrl(song.image).replace(/\\/g, '/'),
    };
    return updatedResult;
  }
  const album = await Album.findById(id)
    .populate('label')
    .populate('primaryArtist');
  if (album) {
    const data = album.audio.map(audioItem => ({
      ...album,
      audio: updateImageUrl(audioItem.path).replace(/\\/g, '/'),
      image: updateImageUrl(album.image).replace(/\\/g, '/'),
    }));
    return data;
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
  const singleSongData = singleTracks.map(song => ({
    ...song,
    audio: updateImageUrl(song.audio.path).replace(/\\/g, '/'),
    image: updateImageUrl(song.image).replace(/\\/g, '/'),
  }));

  const albumSongData = albums.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: updateImageUrl(audioItem.path).replace(/\\/g, '/'),
      image: updateImageUrl(album.image).replace(/\\/g, '/'),
    })),
  );
  // Combine single tracks and albums
  const totalSongs = [...singleSongData, ...albumSongData];

  return totalSongs;
};

export const inspectionService = {
  userInspection,
  songInspection,
  userTotalSong,
};
