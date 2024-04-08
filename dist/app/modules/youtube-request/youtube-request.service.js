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
exports.YoutubeRequestService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const youtube_request_model_1 = require("./youtube-request.model");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const http_status_1 = __importDefault(require("http-status"));
const addClaimRequest = (req, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.url == '') {
        throw new ApiError_1.default(400, 'Payload cannot be empty');
    }
    const user = payload.user;
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield youtube_request_model_1.ClaimRequest.create(payload);
    const paddedId = result._id.toString().padStart(4, '0');
    const data = { url: result.url, id: paddedId, type: 'Claim' };
    yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../mails/youtube-request.ejs'), data);
    try {
        yield (0, sendEmail_1.default)({
            email: 'support@ansmusiclimited.com',
            subject: 'New claim request',
            html: 'Test',
        });
    }
    catch (error) {
        throw new ApiError_1.default(500, `${error.message}`);
    }
    return result;
});
const getClaimRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.ClaimRequest.findOne({ user: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Claim not found');
    }
});
const addArtistChannelRequest = (req, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.topic_link == '' ||
        payload.topic_link == '' ||
        payload.upc_1 == '' ||
        payload.upc_2 == '' ||
        payload.upc_3 == '') {
        throw new ApiError_1.default(400, 'Payload cannot be empty');
    }
    const result = yield youtube_request_model_1.ArtistChannelRequest.create(payload);
    const paddedId = result._id.toString().padStart(4, '0');
    const data = {
        url: result.topic_link,
        id: paddedId,
        type: 'Artist Channel Request',
    };
    yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../mails/youtube-request.ejs'), data);
    try {
        yield (0, sendEmail_1.default)({
            email: 'support@ansmusiclimited.com',
            subject: 'New Artist Channel Request',
            html: 'Test',
        });
    }
    catch (error) {
        throw new ApiError_1.default(500, `${error.message}`);
    }
    return result;
});
const getArtistChannelRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.ArtistChannelRequest.findOne({ user: id });
    if (!result) {
        throw new ApiError_1.default(404, 'Artist channel not found');
    }
});
const addWhitelistRequest = (req, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.url == '') {
        throw new ApiError_1.default(400, 'Payload cannot be empty');
    }
    const result = yield youtube_request_model_1.WhitelistRequest.create(payload);
    const paddedId = result._id.toString().padStart(4, '0');
    const data = { url: result.url, id: paddedId, type: 'Whitelist Request' };
    yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../mails/youtube-request.ejs'), data);
    try {
        yield (0, sendEmail_1.default)({
            email: 'support@ansmusiclimited.com',
            subject: 'New Whitelist Request',
            html: 'Test',
        });
    }
    catch (error) {
        throw new ApiError_1.default(500, `${error.message}`);
    }
    return result;
});
const getWhitelistRequest = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.WhitelistRequest.findOne({ user: id });
    if (!result) {
        throw new ApiError_1.default(404, 'Whitelist not found');
    }
});
exports.YoutubeRequestService = {
    addClaimRequest,
    addArtistChannelRequest,
    addWhitelistRequest,
    getClaimRequest,
    getArtistChannelRequest,
    getWhitelistRequest,
};
