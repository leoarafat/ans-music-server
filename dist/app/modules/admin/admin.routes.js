"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { upload } from '../../../utils/multer';
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const multer_1 = require("../../../utils/multer");
const statics_controller_1 = require("../statics/statics.controller");
const catalog_music_controller_1 = require("../catalog-music/catalog-music.controller");
const activity_controller_1 = require("../activity/activity.controller");
const finance_controller_1 = require("../finance/finance.controller");
const Inspection_controller_1 = require("../Inspection/Inspection.controller");
const payments_controller_1 = require("../payments/payments.controller");
const news_controller_1 = require("../news/news.controller");
const user_controller_1 = require("../user/user.controller");
const router = express_1.default.Router();
router.get('/users', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER, user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
router.post('/add-user', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.createUser);
router.post('/register', admin_controller_1.AdminController.registrationUser);
router.post('/login', admin_controller_1.AdminController.login);
router.post('/refresh-token', admin_controller_1.AdminController.refreshToken);
router.patch('/change-password/:id', admin_controller_1.AdminController.changePassword);
//!Analytics management
router.post('/statics', multer_1.uploadStatics, statics_controller_1.StaticsController.insertIntoDB);
router.get('/latest-release', admin_controller_1.AdminController.latestRelease);
//!Youtube requests
router.get('/claims', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getClaimRequests);
router.get('/artist-channels', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getArtistChannelRequest);
router.get('/whitelists', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getWhitelistRequest);
router.get('/claims/pending', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getWhitelistRequestPending);
//! Add note, make terminate and lock User
router.post('/add-user-note', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.addNoteInUser);
router.patch('/terminate-user', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.terminateUserAccount);
router.patch('/lock-user', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.lockUserAccount);
router.patch('/un-lock-user', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.UnlockUserAccount);
//! Catalog Music
router.get('/released-songs', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), catalog_music_controller_1.catalogMusicController.releaseSongs);
router.get('/tracks', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), catalog_music_controller_1.catalogMusicController.tracks);
router.get('/artists', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), catalog_music_controller_1.catalogMusicController.artists);
router.get('/labels', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), catalog_music_controller_1.catalogMusicController.labels);
//! Inspection
router.get('/inspections', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.activityController.inspection);
router.get('/failed-inspection', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.activityController.failedInspection);
router.get('/processing', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.activityController.processing);
router.get('/take-down', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.activityController.takeDown);
router.get('/distributed', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.activityController.distributed);
router.patch('/make-distribute', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.activityController.makeDistribute);
router.patch('/make-takedown', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), activity_controller_1.activityController.makeTakeDown);
//!Finance
router.get('/all-reports', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), finance_controller_1.financeController.allReports);
router.get('/approved', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), finance_controller_1.financeController.approved);
//!Payment
router.get('/users-payment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.userForPayment);
router.post('/add-payment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.makePayment);
router.post('/withdraw-payment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.withdrawAmount);
router.get('/total-payments', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.totalPayments);
router.get('/total-transaction', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.totalTransaction);
//!NEWS
router.post('/add-news', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), news_controller_1.NewsController.createNews);
//*  Id work here *//
//!Youtube requests
router.get('/artist-channels/pending', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getWhitelistRequestPending);
router.get('/whitelists/pending', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getWhitelistRequestPending);
router.patch('/update/claims/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.updateClaimRequests);
router.patch('/update/artist-channel/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.updateArtistChannelRequest);
router.patch('/update/whitelist/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.updateWhitelistRequest);
//! Song approval
router.patch('/approved/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.approveSingleMusic);
router.patch('/reject/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.rejectMusic);
//! Inspection
router.get('/user-inspection/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Inspection_controller_1.inspectionController.userInspection);
router.get('/song-inspection/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Inspection_controller_1.inspectionController.songInspection);
router.get('/total-song/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), Inspection_controller_1.inspectionController.userTotalSong);
//!Payment
router.delete('/delete-transaction/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.deleteTransaction);
//! Statics Analytics
router.get('/analytics/:id', statics_controller_1.StaticsController.generateAnalytics);
//! Admin Update
router.patch('/edit-profile/:id', multer_1.upload, admin_controller_1.AdminController.updateAdmin);
router.get('/me/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.myProfile);
exports.AdminRoutes = router;
