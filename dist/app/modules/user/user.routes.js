"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const multer_1 = require("../../../utils/multer");
const sub_user_controller_1 = require("../sub-user/sub-user.controller");
const user_1 = require("../../../enums/user");
const youtube_request_controller_1 = require("../youtube-request/youtube-request.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const statics_controller_1 = require("../statics/statics.controller");
const router = express_1.default.Router();
//!User
router.post('/register', user_controller_1.UserController.registrationUser);
router.post('/activate-user', user_controller_1.UserController.activateUser);
router.post('/login', user_controller_1.UserController.login);
router.post('/refresh-token', user_controller_1.UserController.refreshToken);
router.get('/users', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), user_controller_1.UserController.getAllUsers);
router.patch('/change-password/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), user_controller_1.UserController.changePassword);
//!Sub User
router.post('/register-sub-user', sub_user_controller_1.SubUserController.registrationUser);
router.post('/activate-sub-user', sub_user_controller_1.SubUserController.activateUser);
//!Youtube
router.post('/add-claims', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.addClaimRequest);
router.post('/add-artist-channel', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.addArtistChannelRequest);
router.post('/add-whitelist', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.addWhitelistRequest);
//!IDS Work
router.get('/profile/:id', user_controller_1.UserController.getSingleUser);
router.patch('/verify-profile/:id', multer_1.upload, user_controller_1.UserController.updateUser);
router.patch('/edit-profile/:id', multer_1.upload, user_controller_1.UserController.updateProfile);
//!NEWS
router.get('/news', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), statics_controller_1.StaticsController.getNews);
//!Youtube IDS
router.get('/claims/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.getClaimRequest);
router.get('/artist-channel/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.getArtistChannelRequest);
router.get('/whitelist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), youtube_request_controller_1.YoutubeRequestController.getWhitelistRequest);
router.patch('/verify-sub-user/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), multer_1.upload, sub_user_controller_1.SubUserController.updateUser);
router.get('/profile/sub-user/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), sub_user_controller_1.SubUserController.getSingleUser);
router.get('/sub-users', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), sub_user_controller_1.SubUserController.getAllUsers);
router.delete('/delete-sub-user/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), sub_user_controller_1.SubUserController.deleteUser);
//! My uploads
router.get('/successful-release/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), user_controller_1.UserController.mySuccessRelease);
router.get('/pending-release/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), user_controller_1.UserController.myPendingRelease);
router.get('/correction-release/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), user_controller_1.UserController.myCorrectionRelease);
//! Analytics
router.get('/correction-album/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), statics_controller_1.StaticsController.getCorrectionRequestAlbum);
router.get('/correction-single-track/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), statics_controller_1.StaticsController.getCorrectionRequestSingle);
exports.UserRoutes = router;
