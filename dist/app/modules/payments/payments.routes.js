"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const payments_controller_1 = require("./payments.controller");
const router = express_1.default.Router();
router.post('/add-payment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.makePayment);
router.post('/withdraw-payment', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), payments_controller_1.paymentController.withdrawAmount);
exports.paymentRoutes = router;
