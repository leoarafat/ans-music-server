import express from 'express';
import { UserController } from './user.controller';
import { upload } from '../../../utils/multer';
import { SubUserController } from '../sub-user/sub-user.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { YoutubeRequestController } from '../youtube-request/youtube-request.controller';
import auth from '../../middlewares/auth';

const router = express.Router();
//!User
router.post('/register', UserController.registrationUser);
router.post('/activate-user', UserController.activateUser);
router.get('/profile/:id', UserController.getSingleUser);
router.patch('/verify-user/:id', upload, UserController.updateUser);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);
router.patch('/change-password', UserController.changePassword);
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
//!Youtube
router.patch('/verify-sub-user/:id', upload, SubUserController.updateUser);
router.get('/profile/sub-user/:id', upload, SubUserController.getSingleUser);
router.get('/sub-users/:id', upload, SubUserController.getAllUsers);
router.delete('/delete-sub-user/:id', upload, SubUserController.deleteUser);

export const UserRoutes = router;
