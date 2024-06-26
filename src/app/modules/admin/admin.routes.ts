import express from 'express';
// import { upload } from '../../../utils/multer';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

import { StaticsController } from '../statics/statics.controller';
import { catalogMusicController } from '../catalog-music/catalog-music.controller';
import { activityController } from '../activity/activity.controller';
import { financeController } from '../finance/finance.controller';
import { inspectionController } from '../Inspection/Inspection.controller';
import { paymentController } from '../payments/payments.controller';
import { NewsController } from '../news/news.controller';
import { UserController } from '../user/user.controller';
import { SingleMusicController } from '../single-track/single.controller';
import { uploadFile } from '../../middlewares/fileUpload';

const router = express.Router();
router.get(
  '/users',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUsers,
);
router.get(
  '/admins',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER, ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdmin,
);
router.post(
  '/add-user',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createUser,
);
router.post('/register', AdminController.registrationUser);
router.post('/login', AdminController.login);
router.post('/refresh-token', AdminController.refreshToken);
router.patch('/change-password/:id', AdminController.changePassword);
//!Analytics management
router.post('/statics', uploadFile(), StaticsController.insertIntoDB);
router.get('/latest-release', AdminController.latestRelease);
//!Youtube requests
router.get(
  '/claims',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getClaimRequests,
);
router.get(
  '/artist-channels',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getArtistChannelRequest,
);
router.get(
  '/whitelists',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getWhitelistRequest,
);
router.get(
  '/claims/pending',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getWhitelistRequestPending,
);

//! Add note, make terminate and lock User
router.post(
  '/add-user-note',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.addNoteInUser,
);
router.patch(
  '/terminate-user',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.terminateUserAccount,
);
router.patch(
  '/lock-user',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.lockUserAccount,
);
router.patch(
  '/un-lock-user',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.UnlockUserAccount,
);
//! Catalog Music
router.get(
  '/released-songs',
  auth(ENUM_USER_ROLE.ADMIN),
  catalogMusicController.releaseSongs,
);
router.get(
  '/tracks',
  auth(ENUM_USER_ROLE.ADMIN),
  catalogMusicController.tracks,
);
router.get(
  '/artists',
  auth(ENUM_USER_ROLE.ADMIN),
  catalogMusicController.artists,
);
router.get(
  '/labels',
  auth(ENUM_USER_ROLE.ADMIN),
  catalogMusicController.labels,
);
//! Inspection
router.get(
  '/inspections',
  auth(ENUM_USER_ROLE.ADMIN),
  activityController.inspection,
);
router.get(
  '/failed-inspection',
  auth(ENUM_USER_ROLE.ADMIN),
  activityController.failedInspection,
);
router.get(
  '/processing',
  auth(ENUM_USER_ROLE.ADMIN),
  activityController.processing,
);
router.get(
  '/take-down',
  auth(ENUM_USER_ROLE.ADMIN),
  activityController.takeDown,
);
router.get(
  '/distributed',
  auth(ENUM_USER_ROLE.ADMIN),
  activityController.distributed,
);
router.patch(
  '/make-distribute',
  auth(ENUM_USER_ROLE.ADMIN),
  activityController.makeDistribute,
);
router.patch(
  '/make-takedown',
  auth(ENUM_USER_ROLE.ADMIN),
  activityController.makeTakeDown,
);
//!Finance
router.get(
  '/all-reports',
  auth(ENUM_USER_ROLE.ADMIN),
  financeController.allReports,
);
router.get('/approved', auth(ENUM_USER_ROLE.ADMIN), financeController.approved);

//!Payment
router.get(
  '/users-payment',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.userForPayment,
);
router.post(
  '/add-payment',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.makePayment,
);
router.post(
  '/withdraw-payment',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.withdrawAmount,
);
router.get(
  '/total-payments',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.totalPayments,
);
router.get(
  '/total-transaction',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.totalTransaction,
);
//!NEWS
router.post('/add-news', auth(ENUM_USER_ROLE.ADMIN), NewsController.createNews);
//*  Id work here *//

//!Youtube requests
router.get(
  '/artist-channels/pending',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getWhitelistRequestPending,
);
router.get(
  '/whitelists/pending',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getWhitelistRequestPending,
);
router.patch(
  '/update/claims/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateClaimRequests,
);
router.patch(
  '/update/artist-channel/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateArtistChannelRequest,
);
router.patch(
  '/update/whitelist/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.updateWhitelistRequest,
);
//! Song approval
router.patch(
  '/approved/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.approveSingleMusic,
);
router.patch(
  '/reject/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.rejectMusic,
);

//! Inspection
router.get(
  '/user-inspection/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  inspectionController.userInspection,
);
router.get(
  '/song-inspection/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  inspectionController.songInspection,
);
router.get(
  '/total-song/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  inspectionController.userTotalSong,
);
router.get(
  '/single-music/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  SingleMusicController.singleMusic,
);
router.patch(
  '/update-music/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  SingleMusicController.updateSingleMusic,
);
//!Payment
router.delete(
  '/delete-transaction/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  paymentController.deleteTransaction,
);
//! Statics Analytics
router.get('/analytics/:id', StaticsController.generateAnalytics);
//! Admin Update
router.patch('/edit-profile/:id', uploadFile(), AdminController.updateAdmin);
router.get('/me/:id', auth(ENUM_USER_ROLE.ADMIN), AdminController.myProfile);
export const AdminRoutes = router;
