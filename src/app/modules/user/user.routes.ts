import express from 'express';
import { UserController } from './user.controller';
import { upload } from '../../../utils/multer';
import { SubUserController } from '../sub-user/sub-user.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { YoutubeRequestController } from '../youtube-request/youtube-request.controller';
import auth from '../../middlewares/auth';
import { StaticsController } from '../statics/statics.controller';

const router = express.Router();
//!User
router.post('/register', UserController.registrationUser);
router.post('/activate-user', UserController.activateUser);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);
router.patch('/change-password', UserController.changePassword);
router.get(
  '/news',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  StaticsController.getNews,
);
//!Sub User
router.post('/register-sub-user', SubUserController.registrationUser);
router.post('/activate-sub-user', SubUserController.activateUser);
//!Youtube
router.post(
  '/add-claims',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.addClaimRequest,
);
router.post(
  '/add-artist-channel',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.addArtistChannelRequest,
);
router.post(
  '/add-whitelist',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.addWhitelistRequest,
);

//!IDS Work
router.get('/profile/:id', UserController.getSingleUser);
router.patch('/verify-profile/:id', upload, UserController.updateUser);

//!Youtube IDS
router.get(
  '/claims/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.getClaimRequest,
);
router.get(
  '/artist-channel/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.getArtistChannelRequest,
);
router.get(
  '/whitelist/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.getWhitelistRequest,
);
router.patch(
  '/verify-sub-user/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  upload,
  SubUserController.updateUser,
);
router.get(
  '/profile/sub-user/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  SubUserController.getSingleUser,
);
router.get(
  '/sub-users/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  SubUserController.getAllUsers,
);
router.delete(
  '/delete-sub-user/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  SubUserController.deleteUser,
);

//! My uploads
router.get(
  '/successful-release/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  UserController.mySuccessRelease,
);
router.get(
  '/pending-release/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  UserController.myPendingRelease,
);
router.get(
  '/correction-release/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  UserController.myCorrectionRelease,
);
//! Analytics
router.get(
  '/correction-album/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  StaticsController.getCorrectionRequestAlbum,
);
router.get(
  '/correction-single-track/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  StaticsController.getCorrectionRequestSingle,
);
router.get(
  '/correction-single-track/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  StaticsController.getCorrectionRequestSingle,
);
router.get(
  '/news',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  StaticsController.getNews,
);
export const UserRoutes = router;
