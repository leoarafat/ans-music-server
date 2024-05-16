import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { bulkController } from './bulk.controller';
// import { uploadBulk } from '../../../utils/multer';
import { uploadFile } from '../../middlewares/fileUpload';

const router = express.Router();
router.get('/', auth(ENUM_USER_ROLE.ADMIN), bulkController.getBulkData);
router.post(
  '/upload-bulk',
  auth(ENUM_USER_ROLE.ADMIN),
  // uploadBulk,
  uploadFile(),
  bulkController.createBulk,
);

export const bulkRoutes = router;
