"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimaryArtist = void 0;
const mongoose_1 = require("mongoose");
const primaryArtistSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    primaryArtistName: {
        type: String,
        required: true,
    },
    primaryArtistId: {
        type: Number,
        required: true,
    },
    primaryArtistAppleId: {
        type: String,
    },
    primaryArtistFacebookId: {
        type: String,
    },
    primaryArtistSpotifyId: {
        type: String,
    },
    primaryArtistYoutubeId: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.PrimaryArtist = (0, mongoose_1.model)('PrimaryArtist', primaryArtistSchema);
