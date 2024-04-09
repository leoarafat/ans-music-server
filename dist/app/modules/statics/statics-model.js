"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statics = void 0;
const mongoose_1 = require("mongoose");
const singleMusicSchema = new mongoose_1.Schema({
    upc: {
        type: String,
        required: true,
    },
    isrc: {
        type: String,
        required: true,
    },
    album: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    revenue: {
        type: String,
        required: true,
    },
    stream_quantity: {
        type: String,
        required: true,
    },
    tracks: {
        type: String,
        // required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Statics = (0, mongoose_1.model)('Static', singleMusicSchema);
