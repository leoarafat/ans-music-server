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
exports.MultipleMusicService = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const utils_1 = require("../../../utils/utils");
const album_model_1 = require("./album.model");
const uploadMultiple = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const { data } = req.body;
    if (!files || Object.keys(files).length === 0) {
        throw new ApiError_1.default(400, 'No audio files provided');
    }
    const audioFiles = Object.entries(files).map(([field, file]) => ({
        field,
        file: file[0],
    }));
    const tracks = yield Promise.all(audioFiles.map(({ field, file }) => __awaiter(void 0, void 0, void 0, function* () {
        const audioDuration = yield (0, utils_1.getAudioDuration)(file.path);
        const formattedAudioDuration = (0, utils_1.formatDuration)(audioDuration);
        return {
            title: data[field].title,
            artist: data[field].artist,
            audio: {
                path: `${config_1.default.base_url}/${file.path}`,
                duration: formattedAudioDuration,
            },
        };
    })));
    const results = yield album_model_1.MultipleTrack.create(tracks);
    res.status(200).json(results);
});
exports.MultipleMusicService = {
    uploadMultiple,
};
