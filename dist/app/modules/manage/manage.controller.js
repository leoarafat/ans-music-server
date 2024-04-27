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
exports.PrimaryArtistController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const manage_service_1 = require("./manage.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const updatePrimaryArtist = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield manage_service_1.ArtistsService.updatePrimaryArtist(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Artist update successful!',
        data: result,
    });
}));
const updateWriter = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield manage_service_1.ArtistsService.updateWriter(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Writer update successful!',
        data: result,
    });
}));
const updateLabel = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield manage_service_1.ArtistsService.updateLabel(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Label update successful!',
        data: result,
    });
}));
const addPrimaryArtist = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield manage_service_1.ArtistsService.addPrimaryArtist(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Artist added successful!',
        data: result,
    });
}));
const getPrimaryArtist = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield manage_service_1.ArtistsService.getPrimaryArtist(id, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Artist retrieved successful!',
        data: result.data,
        meta: result.meta,
    });
}));
exports.PrimaryArtistController = {
    updatePrimaryArtist,
    updateWriter,
    addPrimaryArtist,
    updateLabel,
    getPrimaryArtist,
};
