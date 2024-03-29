"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleMusicRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../../utils/multer");
const single_controller_1 = require("./single.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
// import { StaticsService } from '../statics/statics.service';
const router = express_1.default.Router();
router.post('/upload', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), multer_1.uploadSingle, single_controller_1.SingleMusicController.uploadSingle);
router.get('/all-music', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), single_controller_1.SingleMusicController.myAllMusic);
router.get('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), single_controller_1.SingleMusicController.singleMusic);
router.patch('/update/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), single_controller_1.SingleMusicController.updateSingleMusic);
router.delete('/delete/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.SUB_USER), single_controller_1.SingleMusicController.deleteSingleMusic);
exports.SingleMusicRoutes = router;
