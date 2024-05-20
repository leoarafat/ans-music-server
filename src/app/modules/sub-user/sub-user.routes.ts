import express from 'express';
// import { upload } from '../../../utils/multer';
import { SubUserController } from './sub-user.controller';
import { uploadFile } from '../../middlewares/fileUpload';

const router = express.Router();
router.post('/login', SubUserController.login);
router.post('/refresh-token', SubUserController.refreshToken);
router.patch('/change-password', SubUserController.changePassword);
// router.post('/register', SubUserController.registrationUser);
// router.post('/activate-user', SubUserController.activateUser);
router.patch('/verify-profile/:id', uploadFile(), SubUserController.updateUser);
router.patch('/profile/:id', uploadFile(), SubUserController.getSingleUser);
router.patch('/sub-users/:id', uploadFile(), SubUserController.getAllUsers);
router.patch(
  '/delete-sub-user/:id',
  uploadFile(),
  SubUserController.deleteUser,
);

export const SubUserRoutes = router;
