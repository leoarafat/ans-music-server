import express from 'express';
// import { upload } from '../../../utils/multer';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post('/add-user', AdminController.createUser);
router.post('/register', AdminController.registrationUser);
router.post('/login', AdminController.login);
router.post('/refresh-token', AdminController.refreshToken);
router.patch('/change-password', AdminController.changePassword);
router.post('/approved/:id', AdminController.approveSingleMusic);
router.post('/reject/:id', AdminController.rejectMusic);

export const AdminRoutes = router;
