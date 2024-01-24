"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const multer_1 = require("../../../utils/multer");
const sub_user_controller_1 = require("../sub-user/sub-user.controller");
const router = express_1.default.Router();
//!User
router.post('/register', user_controller_1.UserController.registrationUser);
router.post('/activate-user', user_controller_1.UserController.activateUser);
router.get('/profile', user_controller_1.UserController.getSingleUser);
router.patch('/verify-user/:id', multer_1.upload, user_controller_1.UserController.updateUser);
router.post('/login', user_controller_1.UserController.login);
router.post('/refresh-token', user_controller_1.UserController.refreshToken);
router.patch('/change-password', user_controller_1.UserController.changePassword);
//!Sub User
router.post('/register-sub-user', sub_user_controller_1.SubUserController.registrationUser);
router.post('/activate-sub-user', sub_user_controller_1.SubUserController.activateUser);
router.patch('/verify-sub-user/:id', multer_1.upload, sub_user_controller_1.SubUserController.updateUser);
router.get('/profile/sub-user/:id', multer_1.upload, sub_user_controller_1.SubUserController.getSingleUser);
router.get('/sub-users/:id', multer_1.upload, sub_user_controller_1.SubUserController.getAllUsers);
router.delete('/delete-sub-user/:id', multer_1.upload, sub_user_controller_1.SubUserController.deleteUser);
exports.UserRoutes = router;
