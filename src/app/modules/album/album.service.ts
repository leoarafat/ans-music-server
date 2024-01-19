/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { formatDuration, getAudioDuration } from '../../../utils/utils';
import { MultipleTrack } from './album.model';

const uploadMultiple = async (req: Request, res: Response) => {
  const { files } = req;
  const { data } = req.body;

  if (!files || Object.keys(files).length === 0) {
    throw new ApiError(400, 'No audio files provided');
  }

  const audioFiles = Object.entries(files).map(([field, file]) => ({
    field,
    file: file[0],
  }));

  const tracks = await Promise.all(
    audioFiles.map(async ({ field, file }) => {
      const audioDuration = await getAudioDuration(file.path);
      const formattedAudioDuration = formatDuration(audioDuration);

      return {
        title: data[field].title,
        artist: data[field].artist,
        audio: {
          path: `${config.base_url}/${file.path}`,
          duration: formattedAudioDuration,
        },
      };
    }),
  );

  const results = await MultipleTrack.create(tracks);

  res.status(200).json(results);
};

export const MultipleMusicService = {
  uploadMultiple,
};
