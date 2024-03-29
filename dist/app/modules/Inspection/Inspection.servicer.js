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
const userInspection = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const releaseSongs = yield single_model_1.SingleTrack.find({ user: id });
    const latest = yield single_model_1.SingleTrack.find({ user: id })
        .limit(5)
        .sort({ createdAt: -1 });
    const totalRelease = yield single_model_1.SingleTrack.countDocuments(releaseSongs);
    return {
        userInfo: user,
        totalRelease,
        latestRelease: latest,
    };
});
const songInspection = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield single_model_1.SingleTrack.findById(id);
    if (!song) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return song;
});
exports.inspectionService = { userInspection, songInspection };
