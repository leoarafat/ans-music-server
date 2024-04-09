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
exports.paymentService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const payments_model_1 = require("./payments.model");
const uniqueId_1 = require("../../../utils/uniqueId");
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const single_model_1 = require("../single-track/single.model");
const album_model_1 = require("../album/album.model");
const payment_mail_1 = require("./payment.mail");
//!
const makePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, amount, externalId } = payload;
    // console.log(payload);
    // Generate transactionId and externalId
    const transactionId = (0, uniqueId_1.generateTransactionId)();
    // const externalId = generateExternalId();
    const findUser = yield user_model_1.default.findOne({ _id: user });
    if (!findUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    // Update user's balance
    findUser.balance += amount;
    yield findUser.save();
    // Create payment record
    const paymentPayload = Object.assign(Object.assign({}, payload), { transactionId,
        externalId });
    const result = yield payments_model_1.Payment.create(paymentPayload);
    const data = {
        name: findUser === null || findUser === void 0 ? void 0 : findUser.name,
        transactionId: result.transactionId,
        amount: result.amount,
        enterDate: result.enterDate,
    };
    try {
        yield (0, sendEmail_1.default)({
            email: findUser === null || findUser === void 0 ? void 0 : findUser.email,
            subject: 'New Payment Received',
            html: (0, payment_mail_1.paymentReceivedEmailBody)(data),
        });
    }
    catch (error) {
        throw new ApiError_1.default(500, `${error.message}`);
    }
    return result;
});
//!
const withdrawAmount = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, amount } = payload;
        const currentUser = yield user_model_1.default.findOne({ _id: user });
        if (!currentUser) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Payment record not found');
        }
        if (currentUser.balance < amount) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient balance');
        }
        currentUser.balance -= amount;
        yield currentUser.save();
        return yield payments_model_1.Withdraw.create(payload);
    }
    catch (error) {
        throw new ApiError_1.default(
        //@ts-ignore
        error.status || http_status_1.default.INTERNAL_SERVER_ERROR, 
        //@ts-ignore
        error.message || 'Withdrawal failed');
    }
});
const totalPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield payments_model_1.Payment.find({});
    let totalAmount = 0;
    for (const payment of payments) {
        totalAmount += payment.amount;
    }
    return {
        totalPayments: payments.length,
        paymentUser: payments,
        totalAmount: totalAmount,
    };
});
const totalTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield payments_model_1.Payment.find({});
    const totalPayment = payments.reduce((acc, price) => {
        return acc + price.amount;
    }, 0);
    return {
        totalPayments: totalPayment,
        paymentUser: payments,
    };
});
const deleteTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield payments_model_1.Payment.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Transaction not found');
    }
    return yield payments_model_1.Payment.findByIdAndDelete(id);
});
const userForPayment = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const approvedSingleSongs = yield single_model_1.SingleTrack.find({
            isApproved: 'approved',
        }).populate('user');
        const approvedAlbumSongs = yield album_model_1.Album.find({
            isApproved: 'approved',
        }).populate('user');
        // Extract users from single tracks and albums
        const singleTrackUsers = approvedSingleSongs.map(song => song.user);
        const albumUsers = approvedAlbumSongs.map(album => album.user);
        // Merge all users into one array
        const allUsers = [...singleTrackUsers, ...albumUsers];
        return {
            allUsers,
            approvedSingleSongs,
            approvedAlbumSongs,
        };
    }
    catch (error) {
        console.error('Error fetching approved songs for payment:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
});
exports.paymentService = {
    makePayment,
    withdrawAmount,
    totalPayments,
    totalTransaction,
    deleteTransaction,
    userForPayment,
};
