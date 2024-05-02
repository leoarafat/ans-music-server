/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import { SingleTrack } from './single.model';
import ApiError from '../../../errors/ApiError';
import { formatDuration, getAudioDuration } from '../../../utils/utils';
// import { ISingleTrack } from './single.interface';
import { generateArtistId } from '../../../utils/uniqueId';
import User from '../user/user.model';
import { updateImageUrl } from '../../../utils/url-modifier';
import { Album } from '../album/album.model';
import QueryBuilder from '../../../builder/QueryBuilder';

const uploadSingle = async (req: Request) => {
  const { files } = req;

  const data = JSON.parse(req.body.data);
  const user = data?.user;
  const checkUser = await User.findById(user);
  if (!checkUser) {
    throw new ApiError(404, 'User not found');
  }

  await Promise.all(
    data.writer.map(async (writers: any) => {
      writers.writerId = generateArtistId();
    }),
  );
  await Promise.all(
    data.composer.map(async (composers: any) => {
      composers.composerId = generateArtistId();
    }),
  );
  await Promise.all(
    data.musicDirector.map(async (Director: any) => {
      Director.musicDirectorId = generateArtistId();
    }),
  );
  await Promise.all(
    data.producer.map(async (producers: any) => {
      producers.producerId = generateArtistId();
    }),
  );
  data.releaseId = generateArtistId();

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
      path: audioFile.path,
      duration: formattedAudioDuration,
    },
    image: imageFile.path,
  });

  return result;
};
const myAllMusic = async (id: string, query: Record<string, unknown>) => {
  const singleSongs = new QueryBuilder(
    SingleTrack.find({ user: id })
      .lean()
      .populate('user')
      .populate('label')
      .populate('primaryArtist'),
    query,
  )
    .search(['releaseTitle'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const singleTracks = await singleSongs.modelQuery;
  const albumSong = new QueryBuilder(
    Album.find({ user: id })
      .lean()
      .populate('user')
      .populate('label')
      .populate('primaryArtist'),
    query,
  )
    .search(['releaseTitle'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const albums = await albumSong.modelQuery;

  const singleSongData = singleTracks?.map(song => ({
    ...song,
    audio: updateImageUrl(song.audio.path)?.replace(/\\/g, '/'),
  }));

  const albumSongData = albums?.flatMap(album =>
    album.audio.map(audioItem => ({
      ...album,
      audio: updateImageUrl(audioItem.path)?.replace(/\\/g, '/'),
    })),
  );

  const combinedData = [...singleSongData, ...albumSongData];

  return combinedData;
};

const singleMusic = async (id: string) => {
  const result = await SingleTrack.findById(id)
    .populate('label')
    .populate('primaryArtist')
    .lean();

  if (result) {
    const updatedResult = {
      ...result,
      image: updateImageUrl(result.image).replace(/\\/g, '/'),
      audio: updateImageUrl(result.audio.path).replace(/\\/g, '/'),
    };
    return updatedResult;
  }
  const album = await Album.findById(id).lean();
  if (album) {
    const albumSongData = {
      ...album,
      audio: album.audio.map(audioItem => ({
        path: updateImageUrl(audioItem.path).replace(/\\/g, '/'),
        title: audioItem.title,
        artist: audioItem.artist,
      })),
      image: updateImageUrl(album.image).replace(/\\/g, '/'),
    };
    return albumSongData;
  }
};
//!
// const updateSingleMusic = async (
//   id: string,
//   payload: Partial<ISingleTrack>,
// ) => {
//   const { ...musicData } = payload;
//   const isExists = await SingleTrack.findById(id);
//   const album = await Album.findById(id);
//   if (isExists) {
//     const result = await SingleTrack.findOneAndUpdate({ _id: id }, musicData, {
//       new: true,
//       runValidators: true,
//     })
//       .populate('label')
//       .populate('primaryArtist');
//     return result;
//   }
//   if (album) {
//     const result = await Album.findOneAndUpdate({ _id: id }, musicData, {
//       new: true,
//       runValidators: true,
//     })
//       .populate('label')
//       .populate('primaryArtist');
//     return result;
//   }
// };
//!
const updateSingleMusic = async (id: string, payload: any) => {
  const { ...musicData } = payload;
  const isExists = await SingleTrack.findById(id);
  const album = await Album.findById(id);

  if (isExists) {
    if (payload.primaryArtist) {
      musicData.primaryArtist = payload.primaryArtist.map(
        (artistId: { toString: () => any }) => artistId.toString(),
      );
    }
    if (payload.writer) {
      musicData.writer = payload.writer;
    }
    if (payload.composer) {
      musicData.composer = payload.composer;
    }
    if (payload.musicDirector) {
      musicData.musicDirector = payload.musicDirector;
    }
    if (payload.producer) {
      musicData.producer = payload.producer;
    }
    const result = await SingleTrack.findOneAndUpdate({ _id: id }, musicData, {
      new: true,
      runValidators: true,
    })
      .populate('label')
      .populate('primaryArtist');
    return result;
  }

  if (album) {
    if (payload.primaryArtist) {
      musicData.primaryArtist = payload.primaryArtist.map(
        (artistId: { toString: () => any }) => artistId.toString(),
      );
    }
    if (payload.writer) {
      musicData.writer = payload.writer;
    }
    if (payload.composer) {
      musicData.composer = payload.composer;
    }
    if (payload.musicDirector) {
      musicData.musicDirector = payload.musicDirector;
    }
    if (payload.producer) {
      musicData.producer = payload.producer;
    }
    const result = await Album.findOneAndUpdate({ _id: id }, musicData, {
      new: true,
      runValidators: true,
    })
      .populate('label')
      .populate('primaryArtist');
    return result;
  }
};

const deleteSingleMusic = async (id: string) => {
  const isExists = await SingleTrack.findById(id);
  if (!isExists) {
    throw new ApiError(404, 'Song not found');
  }
  return await SingleTrack.findByIdAndDelete(id);
};

export const SingleMusicService = {
  uploadSingle,
  myAllMusic,
  singleMusic,
  updateSingleMusic,
  deleteSingleMusic,
};
