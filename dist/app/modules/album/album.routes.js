"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../../utils/multer");
const album_service_1 = require("../album/album.service");
const album_controller_1 = require("./album.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/upload', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), multer_1.upload, album_service_1.AlbumService.uploadMultiple);
router.get('/all-album', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), album_controller_1.AlbumController.myAllAlbum);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), album_controller_1.AlbumController.singleAlbum);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), album_controller_1.AlbumController.updateSingleAlbum);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), album_controller_1.AlbumController.deleteSingleAlbum);
exports.AlbumRoutes = router;
