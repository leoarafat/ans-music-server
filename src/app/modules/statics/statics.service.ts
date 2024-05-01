/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import csv from 'csvtojson';
import { Statics } from './statics-model';
import { SingleTrack } from '../single-track/single.model';
import { Album } from '../album/album.model';
import { News } from '../news/news.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (req: Request) => {
  //@ts-ignore
  const statics = req.files['statics'];
  if (!statics[0].originalname.endsWith('.csv')) {
    throw new ApiError(
      400,
      'Invalid file format. Only .xlsx files are allowed.',
    );
  }
  try {
    const response = await csv().fromFile(statics[0].path);

    let loopData = [];
    for (let i = 0; i < response.length; i++) {
      const newData = {
        upc: response[i].UPC,
        isrc: response[i].ISRC,
        label: response[i]['Label Name'],
        artist: response[i]['Artist Name'],
        album: response[i]['Release title'],
        tracks: response[i]['Track title'],
        stream_quantity: response[i].Quantity,
        revenue: response[i]['Net Revenue'],
        country: response[i]['Country / Region'],
      };
      loopData.push(newData);
    }
    await Statics.insertMany(loopData);
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error as string);
  }
};
//!

// const generateAnalytics = async (id: string) => {
//   const findSingleMySong = await SingleTrack.find({ user: id });
//   const findMyAlbumSong = await Album.find({ user: id });

//   const statistics = await Statics.aggregate([
//     {
//       $group: {
//         _id: '$isrc',
//         count: { $sum: 1 },
//         totalRevenue: { $sum: { $toDouble: '$revenue' } },
//         totalStreams: { $sum: { $toInt: '$stream_quantity' } },
//       },
//     },
//   ]);
//   return statistics;
// };
const generateAnalytics = async (id: string) => {
  try {
    const singleTrackISRCs = await SingleTrack.find({ user: id }).distinct(
      'isrc',
    );

    const albumISRCs = await Album.find({ user: id }).distinct('isrc');

    const userISRCs = [...singleTrackISRCs, ...albumISRCs];

    const statistics = await Statics.aggregate([
      {
        $match: {
          isrc: { $in: userISRCs },
        },
      },
      {
        $group: {
          _id: '$isrc',
          count: { $sum: 1 },
          totalRevenue: { $sum: { $toDouble: '$revenue' } },
          totalStreams: { $sum: { $toInt: '$stream_quantity' } },
        },
      },
    ]);

    return statistics;
  } catch (error) {
    console.error('Error generating analytics:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

const getCorrectionRequestAlbum = async (id: string) => {
  const albums = await Album.find({ user: id }).lean();
  if (!albums) {
    throw new ApiError(404, 'Album not found');
  }
  const albumsWithIsFalse = albums.filter(album => {
    //@ts-ignore
    return album.correctionNote.some(note => !note.isRead);
  });
  return albumsWithIsFalse;
};

const getCorrectionRequestSingle = async (id: string) => {
  const singleSongs = await SingleTrack.find({ user: id }).lean();
  if (!singleSongs) {
    throw new ApiError(404, 'Song not found');
  }
  const singleSongsWithIsFalse = singleSongs.filter(singleSong => {
    //@ts-ignore
    return singleSong.correctionNote.some(note => !note.isRead);
  });
  return singleSongsWithIsFalse;
};
const lastSixApprovedTracks = async (id: string) => {
  const latestSix = await SingleTrack.find({ user: id, isApproved: 'approved' })
    .sort({ createdAt: 'desc' })
    .limit(6);
  return latestSix;
};
const getNews = async () => {
  return await News.find({}).sort({ createdAt: 'desc' }).limit(2);
};
export const StaticsService = {
  insertIntoDB,
  generateAnalytics,
  getCorrectionRequestAlbum,
  getCorrectionRequestSingle,
  lastSixApprovedTracks,
  getNews,
};
