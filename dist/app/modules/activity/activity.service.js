"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityService = void 0;
const single_model_1 = require("../single-track/single.model");
const album_model_1 = require("../album/album.model");
const inspection = () => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({ inspection: 'saved' }).lean();
    const albumSongs = yield album_model_1.Album.find({ inspection: 'saved' }).lean();
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
const failedInspection = () => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({ inspection: 'failed' }).lean();
    const albumSongs = yield album_model_1.Album.find({ inspection: 'failed' }).lean();
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
const processing = () => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({ inspection: 'pending' }).lean();
    const albumSongs = yield album_model_1.Album.find({ inspection: 'pending' }).lean();
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
const distributed = () => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({
        songStatus: 'distribute',
    }).lean();
    const albumSongs = yield album_model_1.Album.find({ songStatus: 'distribute' }).lean();
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
const takeDown = () => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({
        songStatus: 'take-down',
    }).lean();
    const albumSongs = yield album_model_1.Album.find({ songStatus: 'take-down' }).lean();
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
//!
// const makeTakeDown = async (payload: { songId: string }) => {
//   const { songId } = payload;
//   const checkSong = await SingleTrack.findById(songId);
//   if (!checkSong) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Song not found');
//   }
//   const result = await SingleTrack.findOneAndUpdate(
//     { _id: songId },
//     { songStatus: 'take-down' },
//     {
//       new: true,
//       runValidators: true,
//     },
//   );
//   return result;
// };
//!
const makeTakeDown = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { songId } = payload;
    const checkSingleSong = yield single_model_1.SingleTrack.findById(songId);
    const checkAlbumSong = yield album_model_1.Album.findById(songId);
    let updatedSingleTrack;
    let updatedAlbum;
    if (checkSingleSong) {
        updatedSingleTrack = yield single_model_1.SingleTrack.findOneAndUpdate({ _id: songId }, { songStatus: 'take-down' }, {
            new: true,
            runValidators: true,
        });
    }
    if (checkAlbumSong) {
        updatedAlbum = yield album_model_1.Album.findOneAndUpdate({ _id: songId }, { songStatus: 'take-down' }, {
            new: true,
            runValidators: true,
        });
    }
    return { updatedSingleTrack, updatedAlbum };
});
const makeDistribute = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { songId } = payload;
    const checkSingleSong = yield single_model_1.SingleTrack.findById(songId);
    const checkAlbumSong = yield album_model_1.Album.findById(songId);
    let updatedSingleTrack;
    let updatedAlbum;
    if (checkSingleSong) {
        updatedSingleTrack = yield single_model_1.SingleTrack.findOneAndUpdate({ _id: songId }, { songStatus: 'distribute' }, {
            new: true,
            runValidators: true,
        });
    }
    if (checkAlbumSong) {
        updatedAlbum = yield album_model_1.Album.findOneAndUpdate({ _id: songId }, { songStatus: 'distribute' }, {
            new: true,
            runValidators: true,
        });
    }
    return { updatedSingleTrack, updatedAlbum };
});
exports.activityService = {
    inspection,
    failedInspection,
    processing,
    distributed,
    takeDown,
    makeTakeDown,
    makeDistribute,
};
