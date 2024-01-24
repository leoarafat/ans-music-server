"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import { upload } from '../../../utils/multer';
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.post('/add-user', admin_controller_1.AdminController.createUser);
router.post('/register', admin_controller_1.AdminController.registrationUser);
router.post('/login', admin_controller_1.AdminController.login);
router.post('/refresh-token', admin_controller_1.AdminController.refreshToken);
router.patch('/change-password', admin_controller_1.AdminController.changePassword);
router.post('/approved/:id', admin_controller_1.AdminController.approveSingleMusic);
router.post('/reject/:id', admin_controller_1.AdminController.rejectMusic);
exports.AdminRoutes = router;
