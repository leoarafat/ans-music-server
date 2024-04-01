/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Album } from '../album/album.model';
import { SingleTrack } from '../single-track/single.model';

const updatePrimaryArtist = async (id: string, payload: any) => {
  const singleArtists = await SingleTrack.findOne({
    primaryArtist: {
      $elemMatch: {
        _id: id,
      },
    },
  });
  const albumArtists = await Album.findOne({
    primaryArtist: {
      $elemMatch: {
        _id: id,
      },
    },
  });

  if (albumArtists) {
    albumArtists.primaryArtist.forEach(async (artist, index) => {
      //@ts-ignore
      if (artist?._id.toString() === id) {
        Object.keys(payload).forEach(key => {
          //@ts-ignore
          albumArtists.primaryArtist[index][key] = payload[key];
        });
        await albumArtists.save();
      }
    });

    return albumArtists;
  }
  if (singleArtists) {
    singleArtists.primaryArtist.forEach(async (artist, index) => {
      //@ts-ignore
      if (artist?._id.toString() === id) {
        Object.keys(payload).forEach(key => {
          //@ts-ignore
          singleArtists.primaryArtist[index][key] = payload[key];
        });
        await singleArtists.save();
      }
    });

    return singleArtists;
  }
};
const updateWriter = async (id: string, payload: any) => {
  const singleWriter = await SingleTrack.findOne({
    writer: {
      $elemMatch: {
        _id: id,
      },
    },
  });
  const albumWriter = await Album.findOne({
    writer: {
      $elemMatch: {
        _id: id,
      },
    },
  });
  if (albumWriter) {
    albumWriter.writer.forEach(async (writer, index) => {
      //@ts-ignore
      if (writer?._id.toString() === id) {
        Object.keys(payload).forEach(key => {
          //@ts-ignore
          albumWriter.writer[index][key] = payload[key];
        });
        await albumWriter.save();
      }
    });

    return albumWriter;
  }
  if (singleWriter) {
    singleWriter.writer.forEach(async (writer, index) => {
      //@ts-ignore
      if (writer?._id.toString() === id) {
        Object.keys(payload).forEach(key => {
          //@ts-ignore
          singleWriter.writer[index][key] = payload[key];
        });
        await singleWriter.save();
      }
    });

    return singleWriter;
  }
};
export const ArtistsService = {
  updatePrimaryArtist,
  updateWriter,
};
