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
exports.StaticsService = void 0;
const csvtojson_1 = __importDefault(require("csvtojson"));
const statics_model_1 = require("./statics-model");
const single_model_1 = require("../single-track/single.model");
const album_model_1 = require("../album/album.model");
const news_model_1 = require("../news/news.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const insertIntoDB = (req) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const statics = req.files['statics'];
    if (!statics[0].originalname.endsWith('.csv')) {
        throw new ApiError_1.default(400, 'Invalid file format. Only .xlsx files are allowed.');
    }
    try {
        const response = yield (0, csvtojson_1.default)().fromFile(statics[0].path);
        let loopData = [];
        for (let i = 0; i < response.length; i++) {
            const newData = {
                upc: response[i].UPC,
                isrc: response[i].ISRC,
                label: response[i]['Label Name'],
                artist: response[i]['Artist Name'],
                album: response[i]['Release title'],
                tracks: response[i]['Track title'],
                stream_quantity: response[i].Quantity,
                revenue: response[i]['Net Revenue'],
                country: response[i]['Country / Region'],
            };
            loopData.push(newData);
        }
        yield statics_model_1.Statics.insertMany(loopData);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, error);
    }
});
//!
const generateAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    const statistics = yield statics_model_1.Statics.aggregate([
        {
            $group: {
                _id: '$isrc',
                count: { $sum: 1 },
                totalRevenue: { $sum: { $toDouble: '$revenue' } },
                totalStreams: { $sum: { $toInt: '$stream_quantity' } },
            },
        },
    ]);
    return statistics;
});
const getCorrectionRequestAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const albums = yield album_model_1.Album.find({ user: id }).lean();
    const albumsWithIsFalse = albums.filter(album => {
        //@ts-ignore
        return album.correctionNote.some(note => !note.isRead);
    });
    return albumsWithIsFalse;
});
const getCorrectionRequestSingle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({ user: id }).lean();
    const singleSongsWithIsFalse = singleSongs.filter(singleSong => {
        //@ts-ignore
        return singleSong.correctionNote.some(note => !note.isRead);
    });
    return singleSongsWithIsFalse;
});
const lastSixApprovedTracks = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const latestSix = yield single_model_1.SingleTrack.find({ user: id, isApproved: 'approved' })
        .sort({ createdAt: 'desc' })
        .limit(6);
    return latestSix;
});
const getNews = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield news_model_1.News.find({}).sort({ createdAt: 'desc' }).limit(2);
});
exports.StaticsService = {
    insertIntoDB,
    generateAnalytics,
    getCorrectionRequestAlbum,
    getCorrectionRequestSingle,
    lastSixApprovedTracks,
    getNews,
};
