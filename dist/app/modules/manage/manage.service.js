"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtistsService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const uniqueId_1 = require("../../../utils/uniqueId");
const album_model_1 = require("../album/album.model");
const single_model_1 = require("../single-track/single.model");
const manage_model_1 = require("./manage.model");
// const updatePrimaryArtist = async (id: string, payload: any) => {
//   const singleArtists = await SingleTrack.findOne({
//     primaryArtist: {
//       $elemMatch: {
//         _id: id,
//       },
//     },
//   });
//   const albumArtists = await Album.findOne({
//     primaryArtist: {
//       $elemMatch: {
//         _id: id,
//       },
//     },
//   });
//   if (albumArtists) {
//     albumArtists.primaryArtist.forEach(async (artist, index) => {
//       //@ts-ignore
//       if (artist?._id.toString() === id) {
//         Object.keys(payload).forEach(key => {
//           //@ts-ignore
//           albumArtists.primaryArtist[index][key] = payload[key];
//         });
//         await albumArtists.save();
//       }
//     });
//     return albumArtists;
//   }
//   if (singleArtists) {
//     singleArtists.primaryArtist.forEach(async (artist, index) => {
//       //@ts-ignore
//       if (artist?._id.toString() === id) {
//         Object.keys(payload).forEach(key => {
//           //@ts-ignore
//           singleArtists.primaryArtist[index][key] = payload[key];
//         });
//         await singleArtists.save();
//       }
//     });
//     return singleArtists;
//   }
// };
const updateWriter = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const singleWriter = yield single_model_1.SingleTrack.findOne({
        writer: {
            $elemMatch: {
                _id: id,
            },
        },
    });
    const albumWriter = yield album_model_1.Album.findOne({
        writer: {
            $elemMatch: {
                _id: id,
            },
        },
    });
    if (albumWriter) {
        albumWriter.writer.forEach((writer, index) => __awaiter(void 0, void 0, void 0, function* () {
            //@ts-ignore
            if ((writer === null || writer === void 0 ? void 0 : writer._id.toString()) === id) {
                Object.keys(payload).forEach(key => {
                    //@ts-ignore
                    albumWriter.writer[index][key] = payload[key];
                });
                yield albumWriter.save();
            }
        }));
        return albumWriter;
    }
    if (singleWriter) {
        singleWriter.writer.forEach((writer, index) => __awaiter(void 0, void 0, void 0, function* () {
            //@ts-ignore
            if ((writer === null || writer === void 0 ? void 0 : writer._id.toString()) === id) {
                Object.keys(payload).forEach(key => {
                    //@ts-ignore
                    singleWriter.writer[index][key] = payload[key];
                });
                yield singleWriter.save();
            }
        }));
        return singleWriter;
    }
});
// const addPrimaryArtist = async (trackId: string, newArtist: any) => {
//   try {
//     const track = await SingleTrack.findById(trackId);
//     const album = await Album.findById(trackId);
//     if (album) {
//       album.primaryArtist.push(newArtist);
//       const updatedAlbum = await album.save();
//       return updatedAlbum;
//     }
//     if (track) {
//       track.primaryArtist.push(newArtist);
//       const updatedTrack = await track.save();
//       return updatedTrack;
//     }
//   } catch (error) {
//     console.error('Error adding primary artist:', error);
//     throw error;
//   }
// };
const updateLabel = (trackId, newArtist) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const track = yield single_model_1.SingleTrack.findById(trackId);
        const album = yield album_model_1.Album.findById(trackId);
        if (album) {
            const updatedAlbum = yield album_model_1.Album.findOneAndUpdate({ _id: trackId }, newArtist, {
                new: true,
                runValidators: true,
            });
            return updatedAlbum;
        }
        if (track) {
            const updatedSingle = yield single_model_1.SingleTrack.findOneAndUpdate({ _id: trackId }, newArtist, {
                new: true,
                runValidators: true,
            });
            return updatedSingle;
        }
    }
    catch (error) {
        console.error('Error adding primary artist:', error);
        throw error;
    }
});
const addPrimaryArtist = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.primaryArtistId = (0, uniqueId_1.generateArtistId)();
    return yield manage_model_1.PrimaryArtist.create(payload);
});
const updatePrimaryArtist = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkIsExist = yield manage_model_1.PrimaryArtist.findById(id);
    if (!checkIsExist) {
        throw new ApiError_1.default(404, 'Artist not found');
    }
    const artistData = __rest(payload, []);
    return yield manage_model_1.PrimaryArtist.findOneAndUpdate({ _id: id }, artistData, {
        new: true,
        runValidators: true,
    });
});
const getPrimaryArtist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield manage_model_1.PrimaryArtist.find({ user: id });
});
exports.ArtistsService = {
    updatePrimaryArtist,
    updateWriter,
    addPrimaryArtist,
    updateLabel,
    getPrimaryArtist,
};
