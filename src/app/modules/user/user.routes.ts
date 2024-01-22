import express from 'express';
import { UserController } from './user.controller';
import { upload } from '../../../utils/multer';
import { SubUserController } from '../sub-user/sub-user.controller';

const router = express.Router();
//!User
router.post('/register', UserController.registrationUser);
router.post('/activate-user', UserController.activateUser);
router.get('/profile', UserController.getSingleUser);
router.patch('/verify-user/:id', upload, UserController.updateUser);
router.post('/login', UserController.login);
router.post('/refresh-token', UserController.refreshToken);
router.patch('/change-password', UserController.changePassword);
//!Sub User
router.post('/register-sub-user', SubUserController.registrationUser);
router.post('/activate-sub-user', SubUserController.activateUser);
router.patch('/verify-sub-user/:id', upload, SubUserController.updateUser);
router.get('/profile/sub-user/:id', upload, SubUserController.getSingleUser);
router.get('/sub-users/:id', upload, SubUserController.getAllUsers);
router.delete('/delete-sub-user/:id', upload, SubUserController.deleteUser);

export const UserRoutes = router;
