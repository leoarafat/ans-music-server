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
exports.AdminController = void 0;
const catchasync_1 = __importDefault(require("../../../shared/catchasync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const admin_service_1 = require("./admin.service");
const config_1 = __importDefault(require("../../../config"));
const registrationUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.registrationUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Admin Created`,
        data: result,
    });
}));
const createUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = __rest(req.body, []);
    const result = yield admin_service_1.AdminService.createUser(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User created successfully',
        data: result,
    });
}));
const getAllUsers = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getAllUsers(req.query);
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
    const result = yield admin_service_1.AdminService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    });
}));
const updateAdmin = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admin_service_1.AdminService.updateAdmin(id, req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin updated successfully',
        data: result,
    });
}));
const deleteUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admin_service_1.AdminService.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
}));
const login = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = __rest(req.body, []);
    const result = yield admin_service_1.AdminService.login(loginData);
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
        message: 'Admin loggedin successfully !',
        data: result,
    });
}));
const refreshToken = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield admin_service_1.AdminService.refreshToken(refreshToken);
    // set refresh token into cookie
    const cookieOptions = {
        secure: config_1.default.env === 'production',
        httpOnly: true,
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Admin lohggedin successfully !',
        data: result,
    });
}));
const changePassword = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordData = __rest(req.body, []);
    yield admin_service_1.AdminService.changePassword(req.params.id, passwordData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Password change successfully !',
    });
}));
const approveSingleMusic = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admin_service_1.AdminService.approveSingleMusic(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Song approved successful!',
        data: result,
    });
}));
const rejectMusic = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield admin_service_1.AdminService.rejectMusic(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Song rejected successful!',
        data: result,
    });
}));
//! Youtube Request
const getClaimRequests = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getClaimRequests();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'data retrieved successful!',
        data: result,
    });
}));
const getClaimRequestsPending = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getClaimRequestsPending();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'data retrieved successful!',
        data: result,
    });
}));
const getArtistChannelRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getArtistChannelRequest();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'data retrieved successful!',
        data: result,
    });
}));
const getArtistChannelRequestPending = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getArtistChannelRequestPending();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'data retrieved successful!',
        data: result,
    });
}));
const getWhitelistRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getWhitelistRequest();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'data retrieved successful!',
        data: result,
    });
}));
const getWhitelistRequestPending = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.getWhitelistRequestPending();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'data retrieved successful!',
        data: result,
    });
}));
const updateClaimRequests = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield admin_service_1.AdminService.updateClaimRequests(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Update successful!',
        data: result,
    });
}));
const updateArtistChannelRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield admin_service_1.AdminService.updateArtistChannelRequest(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Update successful!',
        data: result,
    });
}));
const updateWhitelistRequest = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield admin_service_1.AdminService.updateWhitelistRequest(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Update successful!',
        data: result,
    });
}));
//! Add note, make terminate and lock User
const addNoteInUser = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield admin_service_1.AdminService.addNoteInUser(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successful!',
        data: result,
    });
}));
const terminateUserAccount = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield admin_service_1.AdminService.terminateUserAccount(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successful!',
        data: result,
    });
}));
const lockUserAccount = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield admin_service_1.AdminService.lockUserAccount(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successful!',
        data: result,
    });
}));
const UnlockUserAccount = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = yield admin_service_1.AdminService.UnlockUserAccount(data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successful!',
        data: result,
    });
}));
const myProfile = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admin_service_1.AdminService.myProfile(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successful!',
        data: result,
    });
}));
const latestRelease = (0, catchasync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.AdminService.latestRelease();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'successful!',
        data: result,
    });
}));
exports.AdminController = {
    UnlockUserAccount,
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    registrationUser,
    login,
    changePassword,
    refreshToken,
    approveSingleMusic,
    rejectMusic,
    getClaimRequests,
    getArtistChannelRequest,
    getWhitelistRequest,
    getClaimRequestsPending,
    getWhitelistRequestPending,
    getArtistChannelRequestPending,
    updateArtistChannelRequest,
    updateClaimRequests,
    updateWhitelistRequest,
    addNoteInUser,
    terminateUserAccount,
    lockUserAccount,
    updateAdmin,
    myProfile,
    latestRelease,
};
