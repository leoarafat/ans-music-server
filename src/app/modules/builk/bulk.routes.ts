import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { bulkController } from './bulk.controller';
import { upload } from '../../../utils/multer';

const router = express.Router();
router.post(
  '/upload-bulk',
  auth(ENUM_USER_ROLE.ADMIN),
  upload,
  bulkController.createBulk,
);
export const bulkRoutes = router;
