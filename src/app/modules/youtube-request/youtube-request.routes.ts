import express from 'express';

import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { YoutubeRequestController } from './youtube-request.controller';

const router = express.Router();

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
router.post(
  '/claims/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.getClaimRequest,
);
router.post(
  '/artist-channel/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.getArtistChannelRequest,
);
router.post(
  '/whitelist/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  YoutubeRequestController.getWhitelistRequest,
);

export const YoutubeRequestRoutes = router;
