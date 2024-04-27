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
exports.catalogMusicService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const url_modifier_1 = require("../../../utils/url-modifier");
const album_model_1 = require("../album/album.model");
const bulk_model_1 = require("../builk/bulk.model");
const single_model_1 = require("../single-track/single.model");
const releaseSongs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = new QueryBuilder_1.default(single_model_1.SingleTrack.find({ isApproved: 'approved' })
        .lean()
        .populate('user')
        .populate('label')
        .populate('primaryArtist'), query)
        .search(['releaseTitle'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const singleTracks = yield singleSongs.modelQuery;
    const albumSong = new QueryBuilder_1.default(album_model_1.Album.find({ isApproved: 'approved' })
        .lean()
        .populate('user')
        .populate('label')
        .populate('primaryArtist'), query)
        .search(['releaseTitle'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const albums = yield albumSong.modelQuery;
    // const bulkSongs = await Bulk.find({});
    const singleSongData = singleTracks === null || singleTracks === void 0 ? void 0 : singleTracks.map(song => (Object.assign(Object.assign({}, song), { audio: (0, url_modifier_1.updateImageUrl)(song.audio.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(song.image).replace(/\\/g, '/') })));
    const albumSongData = albums === null || albums === void 0 ? void 0 : albums.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: (0, url_modifier_1.updateImageUrl)(audioItem.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(album.image).replace(/\\/g, '/') }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
const tracks = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = new QueryBuilder_1.default(single_model_1.SingleTrack.find({})
        .lean()
        .populate('user')
        .populate('label')
        .populate('primaryArtist'), query)
        .search(['releaseTitle'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const singleTracks = yield singleSongs.modelQuery;
    const albumSong = new QueryBuilder_1.default(album_model_1.Album.find({})
        .lean()
        .populate('user')
        .populate('label')
        .populate('primaryArtist'), query)
        .search(['releaseTitle'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const albums = yield albumSong.modelQuery;
    const bulkSongs = yield bulk_model_1.Bulk.find({});
    const singleSongData = singleTracks === null || singleTracks === void 0 ? void 0 : singleTracks.map(song => (Object.assign(Object.assign({}, song), { audio: (0, url_modifier_1.updateImageUrl)(song.audio.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(song.image).replace(/\\/g, '/') })));
    const albumSongData = albums === null || albums === void 0 ? void 0 : albums.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: (0, url_modifier_1.updateImageUrl)(audioItem.path).replace(/\\/g, '/'), image: (0, url_modifier_1.updateImageUrl)(album.image).replace(/\\/g, '/') }))));
    const combinedData = [...singleSongData, ...albumSongData, ...bulkSongs];
    return combinedData;
});
const artists = () => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield single_model_1.SingleTrack.find({})
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const albums = yield album_model_1.Album.find({})
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const artistsData = songs === null || songs === void 0 ? void 0 : songs.flatMap(song => 
    //@ts-ignore
    song.primaryArtist.map(artist => ({
        //@ts-ignore
        name: artist.primaryArtistName,
        //@ts-ignore
        id: artist.primaryArtistId,
    })));
    const albumArtistsData = albums === null || albums === void 0 ? void 0 : albums.flatMap(album => 
    //@ts-ignore
    album.primaryArtist.map(artist => ({
        //@ts-ignore
        name: artist.primaryArtistName,
        //@ts-ignore
        id: artist.primaryArtistId,
    })));
    const combinedData = [...artistsData, ...albumArtistsData];
    return combinedData;
});
const labels = () => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield single_model_1.SingleTrack.find({})
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const albums = yield album_model_1.Album.find({})
        .populate('label')
        .populate('primaryArtist')
        .lean();
    // console.log(songs[0].label);
    const labelData = songs === null || songs === void 0 ? void 0 : songs.map(labels => ({
        //@ts-ignore
        labelName: labels.label.labelName,
        //@ts-ignore
        labelId: labels.label.labelId,
    }));
    //@ts-ignore
    const albumLabelData = albums === null || albums === void 0 ? void 0 : albums.map(labels => ({
        //@ts-ignore
        labelName: labels.label.labelName,
        //@ts-ignore
        labelId: labels.label.labelId,
    }));
    const combinedData = [...labelData, ...albumLabelData];
    return combinedData;
});
exports.catalogMusicService = { releaseSongs, tracks, artists, labels };
