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
exports.catalogMusicController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catalog_music_service_1 = require("./catalog-music.service");
const releaseSongs = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield catalog_music_service_1.catalogMusicService.releaseSongs();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const tracks = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield catalog_music_service_1.catalogMusicService.tracks();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const artists = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield catalog_music_service_1.catalogMusicService.artists();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const labels = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield catalog_music_service_1.catalogMusicService.labels();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
exports.catalogMusicController = {
    releaseSongs,
    tracks,
    artists,
    labels,
};
