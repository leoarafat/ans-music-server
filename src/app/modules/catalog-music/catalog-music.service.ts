/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Album } from '../album/album.model';
import { ISingleTrack } from '../single-track/single.interface';
import { SingleTrack } from '../single-track/single.model';

const releaseSongs = async (): Promise<ISingleTrack[]> => {
  const singleSongs = await SingleTrack.find({ isApproved: 'approved' })
    .lean()
    .populate('label')
    .populate('primaryArtist');
  const albumSongs = await Album.find({ isApproved: 'approved' })
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
const tracks = async (): Promise<ISingleTrack[]> => {
  // return await SingleTrack.find({});
  const singleSongs = await SingleTrack.find({})
    .lean()
    .populate('label')
    .populate('primaryArtist');
  const albumSongs = await Album.find({})
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
const artists = async () => {
  const songs = await SingleTrack.find({})
    .populate('label')
    .populate('primaryArtist')
    .lean();
  const albums = await Album.find({})
    .populate('label')
    .populate('primaryArtist')
    .lean();

  const artistsData = songs?.flatMap(song =>
    //@ts-ignore
    song.primaryArtist.map(artist => ({
      //@ts-ignore
      name: artist.primaryArtistName,
      //@ts-ignore
      id: artist.primaryArtistId,
    })),
  );
  const albumArtistsData = albums?.flatMap(album =>
    //@ts-ignore
    album.primaryArtist.map(artist => ({
      //@ts-ignore
      name: artist.primaryArtistName,
      //@ts-ignore
      id: artist.primaryArtistId,
    })),
  );

  const combinedData = [...artistsData, ...albumArtistsData];

  return combinedData;
};
const labels = async () => {
  const songs = await SingleTrack.find({})
    .populate('label')
    .populate('primaryArtist')
    .lean();
  const albums = await Album.find({})
    .populate('label')
    .populate('primaryArtist')
    .lean();
  // console.log(songs[0].label);
  const labelData = songs?.map(labels => ({
    //@ts-ignore
    labelName: labels.label.labelName,
    //@ts-ignore
    labelId: labels.label.labelId,
  }));
  //@ts-ignore
  const albumLabelData = albums?.map(labels => ({
    //@ts-ignore
    labelName: labels.label.labelName,
    //@ts-ignore
    labelId: labels.label.labelId,
  }));

  const combinedData = [...labelData, ...albumLabelData];

  return combinedData;
};

export const catalogMusicService = { releaseSongs, tracks, artists, labels };
