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
exports.activityController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const activity_service_1 = require("./activity.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const inspection = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_service_1.activityService.inspection();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const failedInspection = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_service_1.activityService.failedInspection();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const processing = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_service_1.activityService.processing();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const distributed = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_service_1.activityService.distributed();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const takeDown = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_service_1.activityService.takeDown();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const makeTakeDown = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_service_1.activityService.makeTakeDown(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
const makeDistribute = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield activity_service_1.activityService.makeDistribute(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Successful',
        data: result,
    });
}));
exports.activityController = {
    inspection,
    failedInspection,
    processing,
    distributed,
    takeDown,
    makeTakeDown,
    makeDistribute,
};
