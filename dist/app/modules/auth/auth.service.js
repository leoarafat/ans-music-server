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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../user/user.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const sub_user_model_1 = __importDefault(require("../sub-user/sub-user.model"));
const sendResetMails_1 = require("./sendResetMails");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.default.isUserExist(email);
    //@ts-ignore
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.accountStatus) === 'lock') {
        throw new ApiError_1.default(400, 'Your account is locked! Please contact with ANS Music Help Center');
    }
    const newUser = yield user_model_1.default.findOne({ email });
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.default.isPasswordMatched(password, isUserExist.password))) {
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
        //@ts-ignore
        userData: newUser,
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
    const isUserExist = yield user_model_1.default.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.default(403, 'User does not exist');
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
    //@ts-ignore
    const { userId, oldPassword } = payload;
    const isUserExist = yield user_model_1.default.findOne({ _id: userId }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.default.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(402, 'Old password is incorrect');
    }
    isUserExist.save();
});
//!
const forgotPass = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: payload.email }, { _id: 1, role: 1 });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist!');
    }
    let profile = null;
    if (user.role === user_1.ENUM_USER_ROLE.ADMIN) {
        profile = yield admin_model_1.default.findOne({ _id: user.id });
    }
    else if (user.role === user_1.ENUM_USER_ROLE.USER) {
        profile = yield user_model_1.default.findOne({ _id: user.id });
    }
    //@ts-ignore
    else if (user.role === user_1.ENUM_USER_ROLE.SUB_USER) {
        profile = yield sub_user_model_1.default.findOne({ _id: user.id });
    }
    if (!profile) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Pofile not found!');
    }
    if (!profile.email) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Email not found!');
    }
    const passResetToken = yield jwtHelpers_1.jwtHelpers.createResetToken({ _id: user.id }, config_1.default.jwt.secret, '50m');
    // const resetLink: string = config.resetlink + `token=${passResetToken}`;
    const resetLink = `${config_1.default.resetlink}token=${passResetToken}&email=${profile.email}`;
    yield (0, sendResetMails_1.sendEmail)(profile.email, `
      <div>
        <p>Hi, ${profile.name}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `);
});
const resetPassword = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = payload;
    const user = yield user_model_1.default.findOne({ email }, { _id: 1 });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found!');
    }
    yield jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const password = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.default.updateOne({ email }, { password });
});
exports.AuthService = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPass,
    resetPassword,
};
