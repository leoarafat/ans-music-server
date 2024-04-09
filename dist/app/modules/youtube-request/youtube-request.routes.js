"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const youtube_request_controller_1 = require("./youtube-request.controller");
const router = express_1.default.Router();
router.post('/add-claims', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.addClaimRequest);
router.post('/add-artist-channel', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.addArtistChannelRequest);
router.post('/add-whitelist', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.addWhitelistRequest);
router.post('/claims/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.getClaimRequest);
router.post('/artist-channel/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.getArtistChannelRequest);
router.post('/whitelist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.getWhitelistRequest);
exports.YoutubeRequestRoutes = router;
