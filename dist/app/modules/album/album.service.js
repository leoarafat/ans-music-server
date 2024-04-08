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
exports.AlbumService = void 0;
const album_model_1 = require("./album.model");
const asyncForEach_1 = require("../../../utils/asyncForEach");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const uniqueId_1 = require("../../../utils/uniqueId");
const uploadMultiple = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const audioFiles = req.files['audio'];
        const titles = req.body['title'];
        const artists = req.body['artist'];
        //@ts-ignore
        const albumImage = req.files.image[0];
        const albumData = JSON.parse(req.body.data);
        albumData.releaseId = (0, uniqueId_1.generateArtistId)();
        yield Promise.all(albumData.writer.map((writers) => __awaiter(void 0, void 0, void 0, function* () {
            writers.writerId = (0, uniqueId_1.generateArtistId)();
        })));
        yield Promise.all(albumData.composer.map((composers) => __awaiter(void 0, void 0, void 0, function* () {
            composers.composerId = (0, uniqueId_1.generateArtistId)();
        })));
        yield Promise.all(albumData.musicDirector.map((Director) => __awaiter(void 0, void 0, void 0, function* () {
            Director.musicDirectorId = (0, uniqueId_1.generateArtistId)();
        })));
        yield Promise.all(albumData.producer.map((producers) => __awaiter(void 0, void 0, void 0, function* () {
            producers.producerId = (0, uniqueId_1.generateArtistId)();
        })));
        if (!audioFiles ||
            !titles ||
            !artists ||
            audioFiles.length !== titles.length ||
            titles.length !== artists.length) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
        const audioArray = [];
        yield (0, asyncForEach_1.asyncForEach)(audioFiles, (file, index) => __awaiter(void 0, void 0, void 0, function* () {
            const audioObject = {
                path: file.path,
                title: titles[index],
                artist: artists[index],
            };
            audioArray.push(audioObject);
        }));
        const newAlbum = new album_model_1.Album(Object.assign(Object.assign({}, albumData), { image: albumImage.path, audio: audioArray }));
        yield newAlbum.save();
        res.status(201).json({ message: 'Upload successful', album: newAlbum });
    }
    catch (error) {
        //@ts-ignore
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const myAllAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield album_model_1.Album.find({ user: id })
        .populate('Label')
        .populate('PrimaryArtist');
    return result;
});
const SingleAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield album_model_1.Album.findById(id)
        .populate('Label')
        .populate('PrimaryArtist');
    return result;
});
const updateAlbum = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const musicData = __rest(payload, []);
    const isExists = yield album_model_1.Album.findById(id)
        .populate('Label')
        .populate('PrimaryArtist');
    if (!isExists) {
        throw new ApiError_1.default(404, 'Song not found');
    }
    const result = yield album_model_1.Album.findOneAndUpdate({ _id: id }, musicData, {
        new: true,
        runValidators: true,
    })
        .populate('Label')
        .populate('PrimaryArtist');
    return result;
});
const deleteAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield album_model_1.Album.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(404, 'Song not found');
    }
    return yield album_model_1.Album.findByIdAndDelete(id);
});
exports.AlbumService = {
    uploadMultiple,
    myAllAlbum,
    SingleAlbum,
    updateAlbum,
    deleteAlbum,
};
