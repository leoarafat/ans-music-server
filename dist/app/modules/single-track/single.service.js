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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleMusicService = void 0;
const single_model_1 = require("./single.model");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const utils_1 = require("../../../utils/utils");
const uniqueId_1 = require("../../../utils/uniqueId");
const user_model_1 = __importDefault(require("../user/user.model"));
const url_modifier_1 = require("../../../utils/url-modifier");
const album_model_1 = require("../album/album.model");
const uploadSingle = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const data = JSON.parse(req.body.data);
    const user = data === null || data === void 0 ? void 0 : data.user;
    const checkUser = yield user_model_1.default.findById(user);
    if (!checkUser) {
        throw new ApiError_1.default(404, 'User not found');
    }
    yield Promise.all(data.writer.map((writers) => __awaiter(void 0, void 0, void 0, function* () {
        writers.writerId = (0, uniqueId_1.generateArtistId)();
    })));
    yield Promise.all(data.composer.map((composers) => __awaiter(void 0, void 0, void 0, function* () {
        composers.composerId = (0, uniqueId_1.generateArtistId)();
    })));
    yield Promise.all(data.musicDirector.map((Director) => __awaiter(void 0, void 0, void 0, function* () {
        Director.musicDirectorId = (0, uniqueId_1.generateArtistId)();
    })));
    yield Promise.all(data.producer.map((producers) => __awaiter(void 0, void 0, void 0, function* () {
        producers.producerId = (0, uniqueId_1.generateArtistId)();
    })));
    data.releaseId = (0, uniqueId_1.generateArtistId)();
    //@ts-ignore
    if (!(files === null || files === void 0 ? void 0 : files.audio) || !files.image) {
        throw new ApiError_1.default(400, 'Both audio and image files are required');
    }
    //@ts-ignore
    const audioFile = files.audio[0];
    //@ts-ignore
    const imageFile = files.image[0];
    // Get audio duration
    const audioDuration = yield (0, utils_1.getAudioDuration)(audioFile.path);
    const formattedAudioDuration = (0, utils_1.formatDuration)(audioDuration);
    const result = yield single_model_1.SingleTrack.create(Object.assign(Object.assign({}, data), { audio: {
            path: audioFile.path,
            duration: formattedAudioDuration,
        }, image: imageFile.path }));
    return result;
});
const myAllMusic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({ user: id })
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const albumSongs = yield album_model_1.Album.find({ user: id })
        .populate('label')
        .populate('primaryArtist')
        .lean();
    const singleSongData = singleSongs.map(song => {
        var _a;
        return (Object.assign(Object.assign({}, song), { audio: (_a = (0, url_modifier_1.updateImageUrl)(song.audio.path)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/') }));
    });
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => {
        var _a;
        return (Object.assign(Object.assign({}, album), { 
            // audio: audioItem.path,
            audio: (_a = (0, url_modifier_1.updateImageUrl)(audioItem.path)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/') }));
    }));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
});
const singleMusic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield single_model_1.SingleTrack.findById(id)
        .populate('label')
        .populate('primaryArtist');
    if (!result) {
        throw new ApiError_1.default(404, 'Song not found');
    }
    const updatedResult = Object.assign(Object.assign({}, result.toObject()), { image: (0, url_modifier_1.updateImageUrl)(result.image).replace(/\\/g, '/'), audio: (0, url_modifier_1.updateImageUrl)(result.audio.path).replace(/\\/g, '/') });
    return updatedResult;
});
const updateSingleMusic = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const musicData = __rest(payload, []);
    const isExists = yield single_model_1.SingleTrack.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(404, 'Song not found');
    }
    const result = yield single_model_1.SingleTrack.findOneAndUpdate({ _id: id }, musicData, {
        new: true,
        runValidators: true,
    })
        .populate('label')
        .populate('primaryArtist');
    return result;
});
const deleteSingleMusic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield single_model_1.SingleTrack.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(404, 'Song not found');
    }
    return yield single_model_1.SingleTrack.findByIdAndDelete(id);
});
exports.SingleMusicService = {
    uploadSingle,
    myAllMusic,
    singleMusic,
    updateSingleMusic,
    deleteSingleMusic,
};
