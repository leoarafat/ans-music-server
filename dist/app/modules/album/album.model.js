"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleTrack = void 0;
const mongoose_1 = require("mongoose");
const multipleMusicSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        // required: true,
    },
    audio: {
        path: {
            type: String,
            required: true,
        },
        duration: {
            type: String, // Assuming you want to store duration as a formatted string
            required: true,
        },
    },
    status: {
        type: Boolean,
        default: true,
    },
});
exports.MultipleTrack = (0, mongoose_1.model)('MultipleTrack', multipleMusicSchema);
