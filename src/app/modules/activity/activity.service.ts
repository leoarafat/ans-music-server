import { SingleTrack } from '../single-track/single.model';
import { Album } from '../album/album.model';

const inspection = async () => {
  const singleSongs = await SingleTrack.find({ inspection: 'saved' }).lean();
  const albumSongs = await Album.find({ inspection: 'saved' }).lean();

  const singleSongData = singleSongs.map(song => ({
    ...song,
    audio: song.audio.path,
  }));

  const albumSongData = albumSongs.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: audioItem.path,
    })),
  );

  const combinedData = [...singleSongData, ...albumSongData];

  return combinedData;
};

const failedInspection = async () => {
  const singleSongs = await SingleTrack.find({ inspection: 'failed' }).lean();
  const albumSongs = await Album.find({ inspection: 'failed' }).lean();

  const singleSongData = singleSongs.map(song => ({
    ...song,
    audio: song.audio.path,
  }));

  const albumSongData = albumSongs.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: audioItem.path,
    })),
  );

  const combinedData = [...singleSongData, ...albumSongData];

  return combinedData;
};
const processing = async () => {
  const singleSongs = await SingleTrack.find({ inspection: 'pending' }).lean();
  const albumSongs = await Album.find({ inspection: 'pending' }).lean();

  const singleSongData = singleSongs.map(song => ({
    ...song,
    audio: song.audio.path,
  }));

  const albumSongData = albumSongs.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: audioItem.path,
    })),
  );

  const combinedData = [...singleSongData, ...albumSongData];

  return combinedData;
};
const distributed = async () => {
  const singleSongs = await SingleTrack.find({
    songStatus: 'distribute',
  }).lean();
  const albumSongs = await Album.find({ songStatus: 'distribute' }).lean();

  const singleSongData = singleSongs.map(song => ({
    ...song,
    audio: song.audio.path,
  }));

  const albumSongData = albumSongs.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: audioItem.path,
    })),
  );

  const combinedData = [...singleSongData, ...albumSongData];

  return combinedData;
};
const takeDown = async () => {
  const singleSongs = await SingleTrack.find({
    songStatus: 'take-down',
  }).lean();
  const albumSongs = await Album.find({ songStatus: 'take-down' }).lean();

  const singleSongData = singleSongs.map(song => ({
    ...song,
    audio: song.audio.path,
  }));

  const albumSongData = albumSongs.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: audioItem.path,
    })),
  );

  const combinedData = [...singleSongData, ...albumSongData];

  return combinedData;
};
//!
// const makeTakeDown = async (payload: { songId: string }) => {
//   const { songId } = payload;
//   const checkSong = await SingleTrack.findById(songId);
//   if (!checkSong) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Song not found');
//   }
//   const result = await SingleTrack.findOneAndUpdate(
//     { _id: songId },
//     { songStatus: 'take-down' },
//     {
//       new: true,
//       runValidators: true,
//     },
//   );
//   return result;
// };
//!
const makeTakeDown = async (payload: { songId: string }) => {
  const { songId } = payload;

  const checkSingleSong = await SingleTrack.findById(songId);

  const checkAlbumSong = await Album.findById(songId);

  let updatedSingleTrack;
  let updatedAlbum;

  if (checkSingleSong) {
    updatedSingleTrack = await SingleTrack.findOneAndUpdate(
      { _id: songId },
      { songStatus: 'take-down' },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  if (checkAlbumSong) {
    updatedAlbum = await Album.findOneAndUpdate(
      { _id: songId },
      { songStatus: 'take-down' },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  return { updatedSingleTrack, updatedAlbum };
};

const makeDistribute = async (payload: { songId: string }) => {
  const { songId } = payload;

  const checkSingleSong = await SingleTrack.findById(songId);

  const checkAlbumSong = await Album.findById(songId);

  let updatedSingleTrack;
  let updatedAlbum;

  if (checkSingleSong) {
    updatedSingleTrack = await SingleTrack.findOneAndUpdate(
      { _id: songId },
      { songStatus: 'distribute' },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  if (checkAlbumSong) {
    updatedAlbum = await Album.findOneAndUpdate(
      { _id: songId },
      { songStatus: 'distribute' },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  return { updatedSingleTrack, updatedAlbum };
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
