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
exports.SingleMusicService = void 0;
const single_model_1 = require("./single.model");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const utils_1 = require("../../../utils/utils");
const uploadSingle = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const data = JSON.parse(req.body.data);
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
            path: `${config_1.default.base_url}/${audioFile.path}`,
            duration: formattedAudioDuration,
        }, image: `${config_1.default.base_url}/${imageFile.path}` }));
    return result;
});
exports.SingleMusicService = {
    uploadSingle,
};
