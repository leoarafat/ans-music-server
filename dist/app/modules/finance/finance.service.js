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
exports.financeService = void 0;
const album_model_1 = require("../album/album.model");
const single_model_1 = require("../single-track/single.model");
const allReports = () => __awaiter(void 0, void 0, void 0, function* () {
    const approvedSingleTracks = yield single_model_1.SingleTrack.find({
        isApproved: 'approved',
    });
    const approvedAlbums = yield album_model_1.Album.find({ isApproved: 'approved' });
    const totalApprovedSingleTracks = approvedSingleTracks.length;
    const totalApprovedAlbums = approvedAlbums.length;
    const pendingSingleTracks = yield single_model_1.SingleTrack.find({ isApproved: 'pending' });
    const pendingAlbums = yield album_model_1.Album.find({ isApproved: 'pending' });
    const totalPendingSingleTracks = pendingSingleTracks.length;
    const totalPendingAlbums = pendingAlbums.length;
    return {
        totalApproved: totalApprovedSingleTracks + totalApprovedAlbums,
        totalPending: totalPendingSingleTracks + totalPendingAlbums,
    };
});
const approved = () => __awaiter(void 0, void 0, void 0, function* () {
    const approvedSong = yield single_model_1.SingleTrack.find({ isApproved: 'approved' });
    const totalApprovedSong = single_model_1.SingleTrack.countDocuments(approvedSong);
    return {
        totalApproved: totalApprovedSong,
    };
});
exports.financeService = {
    allReports,
    approved,
};
