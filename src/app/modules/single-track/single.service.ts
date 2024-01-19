/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { SingleTrack } from './single.model';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { formatDuration, getAudioDuration } from '../../../utils/utils';

const uploadSingle = async (req: Request) => {
  const { files } = req;
  const data = JSON.parse(req.body.data);
  //@ts-ignore
  if (!files?.audio || !files.image) {
    throw new ApiError(400, 'Both audio and image files are required');
  }
  //@ts-ignore
  const audioFile = files.audio[0];
  //@ts-ignore
  const imageFile = files.image[0];

  // Get audio duration
  const audioDuration = await getAudioDuration(audioFile.path);
  const formattedAudioDuration = formatDuration(audioDuration);

  const result = await SingleTrack.create({
    ...data,
    audio: {
      path: `${config.base_url}/${audioFile.path}`,
      duration: formattedAudioDuration,
    },
    image: `${config.base_url}/${imageFile.path}`,
  });

  return result;
};

export const SingleMusicService = {
  uploadSingle,
};
