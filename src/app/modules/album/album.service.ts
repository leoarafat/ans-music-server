/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { Album } from './album.model';
import { asyncForEach } from '../../../utils/asyncForEach';
import ApiError from '../../../errors/ApiError';
import { generateLabelId } from '../../../utils/uniqueId';

const uploadMultiple = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const audioFiles = req.files['audio'];
    const titles = req.body['title'];
    const artists = req.body['artist'];
    const albumData = JSON.parse(req.body.data);
    albumData.labelId = generateLabelId();

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
  const result = await Album.find({ user: id });
  return result;
};
const SingleAlbum = async (id: string) => {
  const result = await Album.findById(id);
  return result;
};
const updateAlbum = async (id: string, payload: any) => {
  const { ...musicData } = payload;
  const isExists = await Album.findById(id);
  if (!isExists) {
    throw new ApiError(404, 'Song not found');
  }
  const result = await Album.findOneAndUpdate({ _id: id }, musicData, {
    new: true,
    runValidators: true,
  });
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
