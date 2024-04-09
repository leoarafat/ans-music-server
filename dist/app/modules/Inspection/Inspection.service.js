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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspectionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const single_model_1 = require("../single-track/single.model");
const album_model_1 = require("../album/album.model");
const url_modifier_1 = require("../../../utils/url-modifier");
//!
// const userInspection = async (id: string) => {
//   const user = await User.findById(id);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   const releaseSongs = await SingleTrack.find({ user: id });
//   const latest = await SingleTrack.find({ user: id })
//     .limit(5)
//     .sort({ createdAt: -1 });
//   const allSong = await SingleTrack.find({ user: id });
//   const totalRelease = await SingleTrack.countDocuments(releaseSongs);
//   return {
//     userInfo: user,
//     totalRelease,
//     latestRelease: latest,
//     allSong,
//   };
// };
//!
const userInspection = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Find both single tracks and albums for the user
    const singleTracks = yield single_model_1.SingleTrack.find({ user: id })
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const singleSongData = singleTracks.map(song => (Object.assign(Object.assign({}, song), { audio: (0, url_modifier_1.updateImageUrl)(song.audio.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(song.image).replace(/\\/g, '/') })));
    const albums = yield album_model_1.Album.find({ user: id })
        .populate('label')
        .populate('primaryArtist')
        .lean();
    // Fetch latest single tracks and albums for the user
    const latestSingleTrack = yield single_model_1.SingleTrack.find({ user: id })
        .limit(5)
        .sort({ createdAt: -1 })
        .lean();
    const latestAlbum = yield album_model_1.Album.find({ user: id })
        .limit(5)
        .sort({ createdAt: -1 })
        .lean();
    const albumSongData = latestAlbum.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: (0, url_modifier_1.updateImageUrl)(audioItem.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(album.image).replace(/\\/g, '/') }))));
    // Combine single tracks and albums for total releases and all songs
    const totalReleases = singleTracks.length + albums.length;
    const allSongs = [...singleSongData, ...albums];
    return {
        userInfo: user,
        totalReleases,
        latestRelease: [...latestSingleTrack, ...albumSongData],
        allSong: allSongs,
    };
});
const songInspection = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield single_model_1.SingleTrack.findById(id)
        .populate('label')
        .populate('primaryArtist');
    if (song) {
        const updatedResult = Object.assign(Object.assign({}, song.toObject()), { audio: (0, url_modifier_1.updateImageUrl)(song.audio.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(song.image).replace(/\\/g, '/') });
        return updatedResult;
    }
    const album = yield album_model_1.Album.findById(id)
        .populate('label')
        .populate('primaryArtist');
    if (album) {
        const data = album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: (0, url_modifier_1.updateImageUrl)(audioItem.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(album.image).replace(/\\/g, '/') })));
        return data;
    }
});
//!
// const userTotalSong = async (id: string) => {
//   const user = await User.findById(id);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   const releaseSongs = await SingleTrack.find({ user: id });
//   return releaseSongs;
// };
//!
const userTotalSong = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Find both single tracks and albums for the user
    const singleTracks = yield single_model_1.SingleTrack.find({ user: id })
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const albums = yield album_model_1.Album.find({ user: id })
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const singleSongData = singleTracks.map(song => (Object.assign(Object.assign({}, song), { audio: (0, url_modifier_1.updateImageUrl)(song.audio.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(song.image).replace(/\\/g, '/') })));
    const albumSongData = albums.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: (0, url_modifier_1.updateImageUrl)(audioItem.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(album.image).replace(/\\/g, '/') }))));
    // Combine single tracks and albums
    const totalSongs = [...singleSongData, ...albumSongData];
    return totalSongs;
});
exports.inspectionService = {
    userInspection,
    songInspection,
    userTotalSong,
};
