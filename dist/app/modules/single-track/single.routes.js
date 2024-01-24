"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleMusicRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../../utils/multer");
const single_controller_1 = require("./single.controller");
const album_service_1 = require("../album/album.service");
// import { StaticsService } from '../statics/statics.service';
const router = express_1.default.Router();
router.post('/upload', multer_1.upload, single_controller_1.SingleMusicController.uploadSingle);
// router.post('/edit-music/:id', upload, SingleMusicController.updateSingleTrack);
router.post('/multiple', multer_1.upload, album_service_1.MultipleMusicService.uploadMultiple);
// router.post('/statics', upload, StaticsService.insertIntoDB);
exports.SingleMusicRoutes = router;
