"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhitelistRequest = exports.ArtistChannelRequest = exports.ClaimRequest = void 0;
const mongoose_1 = require("mongoose");
const claimRequestSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approvedStatus: {
        type: String,
        enum: ['pending', 'rejected', 'accepted'],
        default: 'pending',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const artistChannelRequestSchema = new mongoose_1.Schema({
    channel_link: {
        type: String,
        required: true,
    },
    topic_link: {
        type: String,
        required: true,
    },
    upc_1: {
        type: String,
        required: true,
    },
    upc_2: {
        type: String,
        required: true,
    },
    upc_3: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approvedStatus: {
        type: String,
        enum: ['pending', 'rejected', 'accepted'],
        default: 'pending',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const whitelistRequestSchema = new mongoose_1.Schema({
    url: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approvedStatus: {
        type: String,
        enum: ['pending', 'rejected', 'accepted'],
        default: 'pending',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ClaimRequest = (0, mongoose_1.model)('ClaimRequest', claimRequestSchema);
exports.ArtistChannelRequest = (0, mongoose_1.model)('ArtistChannelRequest', artistChannelRequestSchema);
exports.WhitelistRequest = (0, mongoose_1.model)('WhitelistRequest', whitelistRequestSchema);
