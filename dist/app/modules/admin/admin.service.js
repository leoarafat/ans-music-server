"use strict";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = __importDefault(require("../user/user.model"));
const admin_model_1 = __importDefault(require("./admin.model"));
const single_model_1 = require("../single-track/single.model");
const mongoose_1 = __importDefault(require("mongoose"));
//!
const registrationUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    const isEmailExist = yield admin_model_1.default.findOne({ email });
    if (isEmailExist) {
        throw new ApiError_1.default(400, 'Email already exist');
    }
    return yield admin_model_1.default.create(payload);
});
//!
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.default.create(userData);
    return newUser;
});
//!
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({});
    return users;
});
//!
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    return result;
});
//!
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndDelete(id);
    return result;
});
//!
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield admin_model_1.default.isAdminExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'Admin does not exist');
    }
    if (isUserExist.password &&
        !(yield admin_model_1.default.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(402, 'Password is incorrect');
    }
    //create access token & refresh token
    const { _id: userId, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //Create refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(402, 'Invalid Refresh Token');
    }
    const { userId } = verifiedToken;
    // checking deleted user's refresh token
    const isUserExist = yield admin_model_1.default.isAdminExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(403, 'Admin does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword } = payload;
    const isUserExist = yield admin_model_1.default.findOne({ _id: user === null || user === void 0 ? void 0 : user.userId }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'Admin does not exist');
    }
    if (isUserExist.password &&
        !(yield admin_model_1.default.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(402, 'Old password is incorrect');
    }
    isUserExist.save();
});
//!
const approveSingleMusic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield single_model_1.SingleTrack.findOneAndUpdate({ _id: id }, { isApproved: 'approved' }, {
        new: true,
        runValidators: true,
    });
    return result;
});
const rejectMusic = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { note } = payload;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield single_model_1.SingleTrack.findOneAndUpdate({ _id: id }, { isApproved: 'rejected' }, {
            new: true,
            runValidators: true,
            session: session,
        });
        if (result) {
            result.correctionNote.push(note);
            yield result.save();
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.log(error);
        //@ts-ignore
        throw new Error(error.message);
    }
});
exports.AdminService = {
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
};
