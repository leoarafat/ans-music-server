/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import { Album } from './album.model';
import { asyncForEach } from '../../../utils/asyncForEach';

const uploadMultiple = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const audioFiles = req.files['audio'];
    const titles = req.body['title'];
    const artists = req.body['artist'];

    // Validate if required fields are present
    if (
      !audioFiles ||
      !titles ||
      !artists ||
      audioFiles.length !== titles.length ||
      titles.length !== artists.length
    ) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Create an array to store audio objects
    const audioArray: any[] = [];

    // Iterate through each file and create an object with path, title, and artist
    await asyncForEach(audioFiles, async (file: any, index: number) => {
      const audioObject = {
        path: file.path,
        title: titles[index],
        artist: artists[index],
      };
      audioArray.push(audioObject);
    });

    // Create a new album with the audio array
    const newAlbum = new Album({
      audio: audioArray,
    });

    // Save the new album to the database
    await newAlbum.save();

    res.status(201).json({ message: 'Upload successful', album: newAlbum });
  } catch (error) {
    //@ts-ignore
    console.error('Error during upload:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const MultipleMusicService = {
  uploadMultiple,
};
