/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ISingleTrack } from '../single-track/single.interface';
import { SingleTrack } from '../single-track/single.model';

const releaseSongs = async (): Promise<ISingleTrack[]> => {
  return await SingleTrack.find({ isApproved: 'approved' });
};
const tracks = async (): Promise<ISingleTrack[]> => {
  return await SingleTrack.find({});
};
const artists = async () => {
  const songs = await SingleTrack.find({});
  const artistsData = songs?.flatMap(song =>
    song.primaryArtist.map(artist => ({
      //@ts-ignore
      name: artist.primaryArtistName,
      //@ts-ignore
      id: artist.primaryArtistId,
    })),
  );
  return artistsData;
};

export const catalogMusicService = { releaseSongs, tracks, artists };
