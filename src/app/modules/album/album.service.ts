/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { Album } from './album.model';
import { asyncForEach } from '../../../utils/asyncForEach';
import ApiError from '../../../errors/ApiError';
import { generateArtistId } from '../../../utils/uniqueId';
import { updateImageUrl } from '../../../utils/url-modifier';

const uploadMultiple = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const audioFiles = req.files['audio'];
    const titles = req.body['title'];
    const artists = req.body['artist'];
    //@ts-ignore
    const albumImage = req.files.image[0];
    const albumData = JSON.parse(req.body.data);
    albumData.releaseId = generateArtistId();

    await Promise.all(
      albumData.writer.map(async (writers: any) => {
        writers.writerId = generateArtistId();
      }),
    );
    await Promise.all(
      albumData.composer.map(async (composers: any) => {
        composers.composerId = generateArtistId();
      }),
    );
    await Promise.all(
      albumData.musicDirector.map(async (Director: any) => {
        Director.musicDirectorId = generateArtistId();
      }),
    );
    await Promise.all(
      albumData.producer.map(async (producers: any) => {
        producers.producerId = generateArtistId();
      }),
    );

    if (
      !audioFiles ||
      !titles ||
      !artists ||
      audioFiles.length !== titles.length ||
      titles.length !== artists.length
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const audioArray: any[] = [];

    await asyncForEach(audioFiles, async (file: any, index: number) => {
      const audioObject = {
        path: file.path,
        title: titles[index],
        artist: artists[index],
      };
      audioArray.push(audioObject);
    });

    const newAlbum = new Album({
      ...albumData,
      image: albumImage.path,
      audio: audioArray,
    });

    await newAlbum.save();

    res.status(201).json({ message: 'Upload successful', album: newAlbum });
  } catch (error) {
    //@ts-ignore
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const myAllAlbum = async (id: string) => {
  const result = await Album.find({ user: id })
    .populate('Label')
    .populate('PrimaryArtist');
  const albumSongData = result.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: updateImageUrl(audioItem.path).replace(/\\/g, '/'),
      image: updateImageUrl(album.image).replace(/\\/g, '/'),
    })),
  );
  return albumSongData;
};
const SingleAlbum = async (id: string) => {
  const result = await Album.findById(id)
    .populate('Label')
    .populate('PrimaryArtist');
  return result;
};
const updateAlbum = async (id: string, payload: any) => {
  const { ...musicData } = payload;
  const isExists = await Album.findById(id)
    .populate('Label')
    .populate('PrimaryArtist');
  if (!isExists) {
    throw new ApiError(404, 'Song not found');
  }
  const result = await Album.findOneAndUpdate({ _id: id }, musicData, {
    new: true,
    runValidators: true,
  })
    .populate('Label')
    .populate('PrimaryArtist');
  return result;
};
const deleteAlbum = async (id: string) => {
  const isExists = await Album.findById(id);
  if (!isExists) {
    throw new ApiError(404, 'Song not found');
  }
  return await Album.findByIdAndDelete(id);
};

export const AlbumService = {
  uploadMultiple,
  myAllAlbum,
  SingleAlbum,
  updateAlbum,
  deleteAlbum,
};
