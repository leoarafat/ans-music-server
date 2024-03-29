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
const single_model_1 = require("../single-track/single.model");
const releaseSongs = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield single_model_1.SingleTrack.find({ isApproved: 'approved' });
});
const tracks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield single_model_1.SingleTrack.find({});
});
const artists = () => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield single_model_1.SingleTrack.find({});
    const artistsData = songs === null || songs === void 0 ? void 0 : songs.flatMap(song => song.primaryArtist.map(artist => ({
        //@ts-ignore
        name: artist.primaryArtistName,
        //@ts-ignore
        id: artist.primaryArtistId,
    })));
    return artistsData;
});
const labels = () => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield single_model_1.SingleTrack.find({});
    const labelData = songs === null || songs === void 0 ? void 0 : songs.map(label => ({
        labelName: label.labelName,
        labelId: label.labelId,
    }));
    return labelData;
});
exports.catalogMusicService = { releaseSongs, tracks, artists, labels };
