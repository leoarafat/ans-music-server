import express from 'express';
// import { upload } from '../../../utils/multer';
import { AlbumService } from '../album/album.service';
import { AlbumController } from './album.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { uploadFile } from '../../middlewares/fileUpload';

const router = express.Router();

router.post(
  '/upload',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  uploadFile(),
  // validateRequest(AlbumValidation.albumZodSchema),
  AlbumService.uploadMultiple,
);
router.get(
  '/all-album',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  AlbumController.myAllAlbum,
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  AlbumController.singleAlbum,
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  AlbumController.updateSingleAlbum,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUB_USER),
  AlbumController.deleteSingleAlbum,
);

export const AlbumRoutes = router;
