/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Album } from '../album/album.model';
import { ISingleTrack } from '../single-track/single.interface';
import { SingleTrack } from '../single-track/single.model';

const releaseSongs = async (): Promise<ISingleTrack[]> => {
  const singleSongs = await SingleTrack.find({ isApproved: 'approved' }).lean();
  const albumSongs = await Album.find({ isApproved: 'approved' }).lean();

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
  const singleSongs = await SingleTrack.find({}).lean();
  const albumSongs = await Album.find({}).lean();

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
  // const songs = await SingleTrack.find({});

  // const artistsData = songs?.flatMap(song =>
  //   song.primaryArtist.map(artist => ({
  //     //@ts-ignore
  //     name: artist.primaryArtistName,
  //     //@ts-ignore
  //     id: artist.primaryArtistId,
  //   })),
  // );
  // return artistsData;
  const songs = await SingleTrack.find({}).lean();
  const albums = await Album.find({}).lean();

  const artistsData = songs?.flatMap(song =>
    song.primaryArtist.map(artist => ({
      //@ts-ignore
      name: artist.primaryArtistName,
      //@ts-ignore
      id: artist.primaryArtistId,
    })),
  );
  const albumArtistsData = albums?.flatMap(album =>
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
  // const songs = await SingleTrack.find({});
  // const labelData = songs?.map(label => ({
  //   labelName: label.labelName,
  //   labelId: label.labelId,
  // }));
  // return labelData;
  const songs = await SingleTrack.find({}).lean();
  const albums = await Album.find({}).lean();

  const labelData = songs?.map(label => ({
    labelName: label.labelName,
    labelId: label.labelId,
  }));
  const albumLabelData = albums?.map(label => ({
    labelName: label.labelName,
    labelId: label.labelId,
  }));

  const combinedData = [...labelData, ...albumLabelData];

  return combinedData;
};

export const catalogMusicService = { releaseSongs, tracks, artists, labels };
