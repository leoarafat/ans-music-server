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
exports.StaticsController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const statics_service_1 = require("./statics.service");
const insertIntoDB = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield statics_service_1.StaticsService.insertIntoDB(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Statics Uploaded Successful',
        data: result,
    });
}));
const generateAnalytics = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield statics_service_1.StaticsService.generateAnalytics(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Statics Retrieved Successful',
        data: result,
    });
}));
const getCorrectionRequestAlbum = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield statics_service_1.StaticsService.getCorrectionRequestAlbum(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' Successful',
        data: result,
    });
}));
const getCorrectionRequestSingle = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield statics_service_1.StaticsService.getCorrectionRequestSingle(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' Successful',
        data: result,
    });
}));
const getNews = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield statics_service_1.StaticsService.getNews();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' Successful',
        data: result,
    });
}));
exports.StaticsController = {
    insertIntoDB,
    generateAnalytics,
    getCorrectionRequestAlbum,
    getCorrectionRequestSingle,
    getNews,
};
