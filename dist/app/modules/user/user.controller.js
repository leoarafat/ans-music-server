"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const config_1 = __importDefault(require("../../../config"));
const registrationUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_service_1.UserService.registrationUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Please check your email: ${(_a = result === null || result === void 0 ? void 0 : result.user) === null || _a === void 0 ? void 0 : _a.email} to active your account`,
        activationToken: result.activationToken,
    });
}));
const activateUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.activateUser(req.body);
    const { refreshToken } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    // await UserService.activateUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'User activate successful',
        data: result,
    });
}));
const createUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const result = yield user_service_1.UserService.createUser(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User created successfully',
        data: result,
    });
}));
const getAllUsers = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
}));
const getSingleUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
}));
const updateUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.updateUser(id, req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
}));
const deleteUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
}));
const login = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const result = yield user_service_1.UserService.loginUser(loginData);
    const { refreshToken } = result;
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User loggedin successfully !',
        data: result,
    });
}));
const refreshToken = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield user_service_1.UserService.refreshToken(refreshToken);
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User lohggedin successfully !',
        data: result,
    });
}));
const changePassword = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    const id = req.params.id;
    yield user_service_1.UserService.changePassword(id, passwordData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Password change successfully !',
    });
}));
//!Songs
const mySuccessRelease = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.mySuccessRelease(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
const myPendingRelease = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.myPendingRelease(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
const myCorrectionRelease = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.myCorrectionRelease(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: ' successfully',
        data: result,
    });
}));
const updateProfile = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.updateProfile(id, req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Profile update successfully',
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    registrationUser,
    activateUser,
    login,
    changePassword,
    refreshToken,
    mySuccessRelease,
    myPendingRelease,
    myCorrectionRelease,
    updateProfile,
};
