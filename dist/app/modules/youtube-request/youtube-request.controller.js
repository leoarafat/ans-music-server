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
exports.YoutubeRequestController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const youtube_request_service_1 = require("./youtube-request.service");
const addClaimRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_service_1.YoutubeRequestService.addClaimRequest(req, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Claims add Successful',
        data: result,
    });
}));
const addArtistChannelRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_service_1.YoutubeRequestService.addArtistChannelRequest(req, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Artist channel request Successful',
        data: result,
    });
}));
const addWhitelistRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_service_1.YoutubeRequestService.addWhitelistRequest(req, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Whitelist Request send Successful',
        data: result,
    });
}));
const getClaimRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_service_1.YoutubeRequestService.getClaimRequest(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Data retrieved Successful',
        data: result,
    });
}));
const getArtistChannelRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_service_1.YoutubeRequestService.getArtistChannelRequest(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Data retrieved Successful',
        data: result,
    });
}));
const getWhitelistRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_service_1.YoutubeRequestService.getWhitelistRequest(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Data retrieved Successful',
        data: result,
    });
}));
exports.YoutubeRequestController = {
    addClaimRequest,
    addArtistChannelRequest,
    addWhitelistRequest,
    getClaimRequest,
    getArtistChannelRequest,
    getWhitelistRequest,
};
