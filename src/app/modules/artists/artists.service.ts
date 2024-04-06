/* eslint-disable @typescript-eslint/ban-ts-comment */

import ApiError from '../../../errors/ApiError';
import { generateArtistId } from '../../../utils/uniqueId';
import { Album } from '../album/album.model';
import { SingleTrack } from '../single-track/single.model';
import { IPrimaryArtist } from './artist.interface';
import { PrimaryArtist } from './artist.model';

// const updatePrimaryArtist = async (id: string, payload: any) => {
//   const singleArtists = await SingleTrack.findOne({
//     primaryArtist: {
//       $elemMatch: {
//         _id: id,
//       },
//     },
//   });
//   const albumArtists = await Album.findOne({
//     primaryArtist: {
//       $elemMatch: {
//         _id: id,
//       },
//     },
//   });

//   if (albumArtists) {
//     albumArtists.primaryArtist.forEach(async (artist, index) => {
//       //@ts-ignore
//       if (artist?._id.toString() === id) {
//         Object.keys(payload).forEach(key => {
//           //@ts-ignore
//           albumArtists.primaryArtist[index][key] = payload[key];
//         });
//         await albumArtists.save();
//       }
//     });

//     return albumArtists;
//   }
//   if (singleArtists) {
//     singleArtists.primaryArtist.forEach(async (artist, index) => {
//       //@ts-ignore
//       if (artist?._id.toString() === id) {
//         Object.keys(payload).forEach(key => {
//           //@ts-ignore
//           singleArtists.primaryArtist[index][key] = payload[key];
//         });
//         await singleArtists.save();
//       }
//     });

//     return singleArtists;
//   }
// };
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
// const addPrimaryArtist = async (trackId: string, newArtist: any) => {
//   try {
//     const track = await SingleTrack.findById(trackId);
//     const album = await Album.findById(trackId);

//     if (album) {
//       album.primaryArtist.push(newArtist);
//       const updatedAlbum = await album.save();

//       return updatedAlbum;
//     }
//     if (track) {
//       track.primaryArtist.push(newArtist);
//       const updatedTrack = await track.save();

//       return updatedTrack;
//     }
//   } catch (error) {
//     console.error('Error adding primary artist:', error);
//     throw error;
//   }
// };
const updateLabel = async (trackId: string, newArtist: any) => {
  try {
    const track = await SingleTrack.findById(trackId);
    const album = await Album.findById(trackId);

    if (album) {
      const updatedAlbum = await Album.findOneAndUpdate(
        { _id: trackId },
        newArtist,
        {
          new: true,
          runValidators: true,
        },
      );

      return updatedAlbum;
    }
    if (track) {
      const updatedSingle = await SingleTrack.findOneAndUpdate(
        { _id: trackId },
        newArtist,
        {
          new: true,
          runValidators: true,
        },
      );

      return updatedSingle;
    }
  } catch (error) {
    console.error('Error adding primary artist:', error);
    throw error;
  }
};
const addPrimaryArtist = async (payload: IPrimaryArtist) => {
  payload.primaryArtistId = generateArtistId();
  return await PrimaryArtist.create(payload);
};
const updatePrimaryArtist = async (id: string, payload: any) => {
  const checkIsExist = await PrimaryArtist.findById(id);
  if (!checkIsExist) {
    throw new ApiError(404, 'Artist not found');
  }
  const { ...artistData } = payload;
  return await PrimaryArtist.findOneAndUpdate({ _id: id }, artistData, {
    new: true,
    runValidators: true,
  });
};
const getPrimaryArtist = async (id: string) => {
  return await PrimaryArtist.find({ user: id });
};

export const ArtistsService = {
  updatePrimaryArtist,
  updateWriter,
  addPrimaryArtist,
  updateLabel,
  getPrimaryArtist,
};
