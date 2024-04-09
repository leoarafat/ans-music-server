"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.Withdraw = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['payment', 'withdrawal'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        enum: ['bank', 'bkash', 'cash', 'check', 'web-service'],
        required: true,
    },
    enterDate: {
        type: String,
        required: true,
    },
    externalId: {
        type: String,
        required: true,
    },
    vendorId: {
        type: String,
        required: true,
    },
    associatedContact: {
        type: String,
        required: true,
    },
    memo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const withdrawSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Withdraw = (0, mongoose_1.model)('Withdraw', withdrawSchema);
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
