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

const generateAnalytics = async () => {
  try {
    const analyticsData = await Statics.aggregate([
      {
        $group: {
          _id: '$label',
          //   totalRevenue: { $sum: '$revenue' },
          totalRevenue: { $sum: { $toDouble: '$revenue' } },
        },
      },
    ]);

    const pieChartData = analyticsData.map(entry => ({
      label: entry._id,
      value: entry.totalRevenue,
    }));

    return pieChartData;
  } catch (error) {
    console.error('Error generating pie chart data:', error);
    //@ts-ignore
    throw new Error(error);
  }
};
const getCorrectionRequestAlbum = async (id: string) => {
  const albums = await Album.find({ user: id }).lean();

  const albumsWithIsFalse = albums.filter(album => {
    //@ts-ignore
    return album.correctionNote.some(note => !note.isRead);
  });
  return albumsWithIsFalse;
};

const getCorrectionRequestSingle = async (id: string) => {
  const singleSongs = await SingleTrack.find({ user: id }).lean();

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
