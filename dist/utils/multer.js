"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStatics = exports.uploadBulk = exports.uploadSingle = exports.upload = exports.singleUpload = exports.storageSingle = exports.storageStatics = exports.storageBulk = exports.storage = void 0;
const fs = __importStar(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uploadsDirectory = 'uploads/';
if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory, { recursive: true });
}
exports.storage = multer_1.default.diskStorage({
    //@ts-ignore
    destination: function (req, file, cb) {
        cb(null, uploadsDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
//!
const uploadsBulkDirectory = 'uploads/';
if (!fs.existsSync(uploadsBulkDirectory)) {
    fs.mkdirSync(uploadsBulkDirectory, { recursive: true });
}
exports.storageBulk = multer_1.default.diskStorage({
    //@ts-ignore
    destination: function (req, file, cb) {
        cb(null, uploadsBulkDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
        cb(null, 'ANS-MUSIC' + '-' + uniqueSuffix + file.originalname);
    },
});
//!
const uploadsStaticsDirectory = 'uploads/';
if (!fs.existsSync(uploadsStaticsDirectory)) {
    fs.mkdirSync(uploadsStaticsDirectory, { recursive: true });
}
exports.storageStatics = multer_1.default.diskStorage({
    //@ts-ignore
    destination: function (req, file, cb) {
        cb(null, uploadsStaticsDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, 'ANS-MUSIC' + '-' + uniqueSuffix + file.originalname);
    },
});
//!
const uploadsSingleDirectory = 'uploads/';
if (!fs.existsSync(uploadsSingleDirectory)) {
    fs.mkdirSync(uploadsSingleDirectory, { recursive: true });
}
exports.storageSingle = multer_1.default.diskStorage({
    //@ts-ignore
    destination: function (req, file, cb) {
        cb(null, uploadsSingleDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
//!
exports.singleUpload = (0, multer_1.default)({ storage: exports.storage }).single('image');
exports.upload = (0, multer_1.default)({ storage: exports.storage }).fields([
    { name: 'image', maxCount: 20 },
    { name: 'nidFront', maxCount: 20 },
    { name: 'nidBack', maxCount: 20 },
    { name: 'dashboardScreenShot', maxCount: 20 },
    { name: 'copyrightNoticeImage', maxCount: 20 },
    { name: 'audio', maxCount: 30 },
    { name: 'title' },
    { name: 'artist' },
    { name: 'data' },
]);
exports.uploadSingle = (0, multer_1.default)({ storage: exports.storageSingle }).fields([
    { name: 'image', maxCount: 20 },
    { name: 'nidFront', maxCount: 20 },
    { name: 'nidBack', maxCount: 20 },
    { name: 'dashboardScreenShot', maxCount: 20 },
    { name: 'copyrightNoticeImage', maxCount: 20 },
    { name: 'audio', maxCount: 30 },
    { name: 'statics' },
    { name: 'title' },
    { name: 'artist' },
    { name: 'data' },
    { name: 'actor' },
    { name: 'composer' },
    { name: 'director' },
    { name: 'bulk' },
]);
exports.uploadBulk = (0, multer_1.default)({ storage: exports.storageBulk }).fields([
    { name: 'bulk' },
]);
exports.uploadStatics = (0, multer_1.default)({ storage: exports.storageStatics }).fields([
    { name: 'statics' },
]);
