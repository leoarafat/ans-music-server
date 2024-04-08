"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const bulk_controller_1 = require("./bulk.controller");
const multer_1 = require("../../../utils/multer");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), bulk_controller_1.bulkController.getBulkData);
router.post('/upload-bulk', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), multer_1.uploadBulk, bulk_controller_1.bulkController.createBulk);
exports.bulkRoutes = router;
