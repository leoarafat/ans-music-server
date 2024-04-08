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
exports.catalogMusicService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const album_model_1 = require("../album/album.model");
const single_model_1 = require("../single-track/single.model");
const releaseSongs = () => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({ isApproved: 'approved' })
        .lean()
        .populate('label')
        .populate('primaryArtist');
    const albumSongs = yield album_model_1.Album.find({ isApproved: 'approved' })
        .lean()
        .populate('label')
        .populate('primaryArtist');
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
const tracks = () => __awaiter(void 0, void 0, void 0, function* () {
    // return await SingleTrack.find({});
    const singleSongs = yield single_model_1.SingleTrack.find({})
        .lean()
        .populate('label')
        .populate('primaryArtist');
    const albumSongs = yield album_model_1.Album.find({})
        .lean()
        .populate('label')
        .populate('primaryArtist');
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
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
