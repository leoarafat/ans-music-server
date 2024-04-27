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
exports.LabelController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const label_service_1 = require("./label.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const updateLabel = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield label_service_1.LabelService.updateLabel(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Label update successful!',
        data: result,
    });
}));
const addLabel = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield label_service_1.LabelService.addLabel(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Label added successful!',
        data: result,
    });
}));
const getLabel = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield label_service_1.LabelService.getLabel(id, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Label retrieved successful!',
        data: result.data,
        meta: result.meta,
    });
}));
exports.LabelController = {
    getLabel,
    addLabel,
    updateLabel,
};
