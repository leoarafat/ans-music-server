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
exports.paymentController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const payments_service_1 = require("./payments.service");
const makePayment = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payments_service_1.paymentService.makePayment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
const withdrawAmount = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payments_service_1.paymentService.withdrawAmount(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
const totalPayments = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payments_service_1.paymentService.totalPayments();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
const totalTransaction = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payments_service_1.paymentService.totalTransaction();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
const deleteTransaction = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payments_service_1.paymentService.deleteTransaction(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
exports.paymentController = {
    makePayment,
    withdrawAmount,
    totalPayments,
    totalTransaction,
    deleteTransaction,
};
