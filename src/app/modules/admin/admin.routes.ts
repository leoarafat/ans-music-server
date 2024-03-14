import express from 'express';
// import { upload } from '../../../utils/multer';
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { upload } from '../../../utils/multer';
import { StaticsController } from '../statics/statics.controller';
import { catalogMusicController } from '../catalog-music/catalog-music.controller';

const router = express.Router();

router.post(
  '/add-user',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createUser,
);
router.post('/register', AdminController.registrationUser);
router.post('/login', AdminController.login);
router.post('/refresh-token', AdminController.refreshToken);
router.patch('/change-password', AdminController.changePassword);
//!Analytics management
router.post('/statics', upload, StaticsController.insertIntoDB);
router.get('/analytics', StaticsController.generateAnalytics);
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

export const AdminRoutes = router;
