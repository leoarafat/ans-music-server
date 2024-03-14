import express from 'express';

import { upload } from '../../../utils/multer';
import { SingleMusicController } from './single.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { StaticsService } from '../statics/statics.service';
const router = express.Router();

router.post(
  '/upload',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  upload,
  SingleMusicController.uploadSingle,
);
router.get(
  '/all-music',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  SingleMusicController.myAllMusic,
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  SingleMusicController.singleMusic,
);
router.patch(
  '/update/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  SingleMusicController.updateSingleMusic,
);
router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  SingleMusicController.deleteSingleMusic,
);

export const SingleMusicRoutes = router;
