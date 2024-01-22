import express from 'express';
import { upload } from '../../../utils/multer';
import { SubUserController } from './sub-user.controller';

const router = express.Router();
router.post('/login', SubUserController.login);
router.post('/refresh-token', SubUserController.refreshToken);
router.patch('/change-password', SubUserController.changePassword);
// router.post('/register', SubUserController.registrationUser);
// router.post('/activate-user', SubUserController.activateUser);
router.patch('/verify-profile/:id', upload, SubUserController.updateUser);
router.patch('/profile/:id', upload, SubUserController.getSingleUser);
router.patch('/sub-users/:id', upload, SubUserController.getAllUsers);
router.patch('/delete-sub-user/:id', upload, SubUserController.deleteUser);

export const SubUserRoutes = router;
