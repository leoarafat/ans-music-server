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
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
//!
const registrationUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = payload;
    const user = {
        name,
        email,
        password,
    };
    const isEmailExist = yield user_model_1.default.findOne({ email });
    if (isEmailExist) {
        throw new ApiError_1.default(400, 'Email already exist');
    }
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;
    const data = { user: { name: user.name }, activationCode };
    yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../mails/activation-mail.ejs'), data);
    try {
        yield (0, sendEmail_1.default)({
            email: user.email,
            subject: 'Activate Your Account',
            template: 'activation-mail.ejs',
            data,
        });
    }
    catch (error) {
        throw new ApiError_1.default(500, `${error.message}`);
    }
    return {
        activationToken: activationToken.token,
        user,
    };
});
//!
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jsonwebtoken_1.default.sign({
        user,
        activationCode,
    }, config_1.default.activation_secret, {
        expiresIn: '5m',
    });
    return { token, activationCode };
};
//!
const activateUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { activation_code, activation_token } = payload;
    const newUser = jsonwebtoken_1.default.verify(activation_token, config_1.default.activation_secret);
    if (newUser.activationCode !== activation_code) {
        throw new ApiError_1.default(400, 'Activation code is not valid');
    }
    const { name, email, password } = newUser.user;
    const existUser = yield user_model_1.default.findOne({ email });
    if (existUser) {
        throw new ApiError_1.default(400, 'Email is already exist');
    }
    const user = yield user_model_1.default.create({
        name,
        email,
        password,
    });
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user._id, role: user.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //Create refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user._id, role: user.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
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
const updateUser = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: id });
    const { files } = req;
    const data = JSON.parse(req.body.data);
    //@ts-ignore
    const nidFrontImage = files.nidFront[0];
    //@ts-ignore
    const nidBackImage = files.nidBack[0];
    //@ts-ignore
    const imageFile = files.image[0];
    if (!isExist) {
        throw new ApiError_1.default(404, 'User not found!');
    }
    const userData = __rest(data, []);
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, userData), { image: `${config_1.default.base_url}/${imageFile.path}`, nidFront: `${config_1.default.base_url}/${nidFrontImage.path}`, nidBack: `${config_1.default.base_url}/${nidBackImage.path}` }), {
        new: true,
    });
    if (result) {
        const isComplete = Boolean(result.name) &&
            Boolean(result.email) &&
            Boolean(result.phoneNumber) &&
            Boolean(result.password) &&
            Boolean(result.address) &&
            Boolean(result.role) &&
            Boolean(result.image) &&
            Boolean(result.nidFront) &&
            Boolean(result.nidBack) &&
            Boolean(result.country) &&
            Boolean(result.state) &&
            Boolean(result.city) &&
            Boolean(result.postCode) &&
            Boolean(result.channelName) &&
            Boolean(result.channelUrl) &&
            Boolean(result.subscribeCount) &&
            Boolean(result.videosCount) &&
            Boolean(result.copyrightNotice) &&
            Boolean(result.dashboardScreenShot) &&
            Boolean(result.balance);
        //@ts-ignore
        result.isVerified = isComplete;
        yield result.save();
    }
    return result;
});
//!
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndDelete(id);
    return result;
});
//!
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.default.isUserExist(email);
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
        _id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_model_1.default.findOne({ _id: user === null || user === void 0 ? void 0 : user.userId }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.default.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiError_1.default(402, 'Old password is incorrect');
    }
    isUserExist.password = newPassword;
    yield isUserExist.save();
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    registrationUser,
    activateUser,
    loginUser,
    refreshToken,
    changePassword,
};
