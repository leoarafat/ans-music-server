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
exports.upload = exports.singleUpload = exports.storage = void 0;
const fs = __importStar(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uploadsDirectory = './src/uploads/';
if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
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
// export const upload = multer({ storage: storage }).array('images', 20);
exports.singleUpload = (0, multer_1.default)({ storage: exports.storage }).single('image');
exports.upload = (0, multer_1.default)({ storage: exports.storage }).fields([
    { name: 'image', maxCount: 20 },
    { name: 'nidFront', maxCount: 20 },
    { name: 'nidBack', maxCount: 20 },
    { name: 'audio', maxCount: 30 },
    { name: 'statics', maxCount: 5 },
]);
