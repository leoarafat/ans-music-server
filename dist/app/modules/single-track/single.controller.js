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
exports.SingleMusicController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const single_service_1 = require("./single.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const uploadSingle = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield single_service_1.SingleMusicService.uploadSingle(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Music Uploaded Successful',
        data: result,
    });
}));
const myAllMusic = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield single_service_1.SingleMusicService.myAllMusic(id, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Music Retrieved Successful',
        data: result,
    });
}));
const singleMusic = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield single_service_1.SingleMusicService.singleMusic(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Music Retrieved Successful',
        data: result,
    });
}));
const updateSingleMusic = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield single_service_1.SingleMusicService.updateSingleMusic(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Music Update Successful',
        data: result,
    });
}));
const deleteSingleMusic = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield single_service_1.SingleMusicService.deleteSingleMusic(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Music Delete Successful',
        data: result,
    });
}));
exports.SingleMusicController = {
    uploadSingle,
    myAllMusic,
    singleMusic,
    updateSingleMusic,
    deleteSingleMusic,
};
