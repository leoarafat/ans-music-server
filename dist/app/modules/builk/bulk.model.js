"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bulk = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bulkSchema = new mongoose_1.default.Schema({
    upc: String,
    isrc: String,
    releaseTitle: String,
    releaseSubtitle: String,
    trackTitle: String,
    trackSubtitle: String,
    cLine: String,
    pLine: String,
    genre: String,
    subGenre: String,
    primaryArtist: String,
    anotherPrimaryArtist: [String],
    featuringArtist: String,
    writer: String,
    composer: String,
    arranger: String,
    producer: String,
    publisher: String,
    labelName: String,
    instrumental: String,
    trackLanguage: String,
    titleLanguage: String,
    clipPreviewStartInSeconds: String,
    primaryTrackType: String,
    parentalAdvisory: String,
    releaseDate: String,
});
exports.Bulk = mongoose_1.default.model('Bulk', bulkSchema);
