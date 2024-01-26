/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { formatDuration, getAudioDuration } from '../../../utils/utils';
import { MultipleTrack } from './album.model';

const uploadMultiple = async (req: Request, res: Response) => {
  const { files } = req;
  const audioFiles = req.files['audio']; // Array of audio files
  const titles = req.body['title']; // Array of titles
  const artists = req.body['artist'];
  console.log(titles);
};

export const MultipleMusicService = {
  uploadMultiple,
};
