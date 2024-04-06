import { SingleTrack } from '../single-track/single.model';
import { Album } from '../album/album.model';

const inspection = async () => {
  const singleSongs = await SingleTrack.find({ isApproved: 'pending' })
    .lean()
    .populate('label')
    .populate('primaryArtist');
  const albumSongs = await Album.find({ isApproved: 'pending' })
    .lean()
    .populate('label')
    .populate('primaryArtist');

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
  const singleSongs = await SingleTrack.find({ isApproved: 'rejected' })
    .lean()
    .populate('label')
    .populate('primaryArtist');
  const albumSongs = await Album.find({ isApproved: 'rejected' })
    .lean()
    .populate('label')
    .populate('primaryArtist');

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
  const singleSongs = await SingleTrack.find({ inspection: 'pending' })
    .lean()
    .populate('label')
    .populate('primaryArtist');
  const albumSongs = await Album.find({ inspection: 'pending' })
    .lean()
    .populate('label')
    .populate('primaryArtist');

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
  })
    .lean()
    .populate('label')
    .populate('primaryArtist');
  const albumSongs = await Album.find({ songStatus: 'distribute' })
    .lean()
    .populate('label')
    .populate('primaryArtist');

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
  })
    .lean()
    .populate('label')
    .populate('primaryArtist');
  const albumSongs = await Album.find({ songStatus: 'take-down' })
    .lean()
    .populate('label')
    .populate('primaryArtist');

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
    )
      .populate('label')
      .populate('primaryArtist');
  }

  if (checkAlbumSong) {
    updatedAlbum = await Album.findOneAndUpdate(
      { _id: songId },
      { songStatus: 'take-down' },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate('label')
      .populate('primaryArtist');
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
    )
      .populate('label')
      .populate('PrimaryArtist');
  }

  if (checkAlbumSong) {
    updatedAlbum = await Album.findOneAndUpdate(
      { _id: songId },
      { songStatus: 'distribute' },
      {
        new: true,
        runValidators: true,
      },
    )
      .populate('label')
      .populate('PrimaryArtist');
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
