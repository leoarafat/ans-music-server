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
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const single_model_1 = require("../single-track/single.model");
const url_modifier_1 = require("../../../utils/url-modifier");
const uniqueId_1 = require("../../../utils/uniqueId");
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const album_model_1 = require("../album/album.model");
const user_mail_1 = require("./user.mail");
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
    try {
        yield (0, sendEmail_1.default)({
            email: user.email,
            subject: 'Activate Your Account',
            html: (0, user_mail_1.registrationSuccessEmailBody)(data),
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
    const clientId = (0, uniqueId_1.generateArtistId)();
    const user = yield user_model_1.default.create({
        name,
        email,
        password,
        clientId,
    });
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user._id, role: user.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //Create refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId: user._id, role: user.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
//!
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield user_model_1.default.create(userData);
    return newUser;
});
//!
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.default.find(), query)
        .search(['name', 'email'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return {
        meta,
        data: result,
    };
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
    //@ts-ignore
    const copyrightNoticeImageFile = files.copyrightNoticeImage[0];
    //@ts-ignore
    const dashboardScreenShotFile = files.dashboardScreenShot[0];
    if (!isExist) {
        throw new ApiError_1.default(404, 'User not found!');
    }
    const userData = __rest(data, []);
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, userData), { image: imageFile.path, nidFront: nidFrontImage.path, nidBack: nidBackImage.path, copyrightNoticeImage: copyrightNoticeImageFile.path, dashboardScreenShot: dashboardScreenShotFile.path }), {
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
            Boolean(result.videosCount);
        //@ts-ignore
        result.isVerified = isComplete;
        yield result.save();
    }
    return result;
});
//!
const updateProfile = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const { files } = req;
    const data = JSON.parse(req.body.data);
    const isExist = yield user_model_1.default.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(404, 'User not found !');
    }
    const UserData = __rest(data, []);
    const updatedUserData = Object.assign({}, UserData);
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, updatedUserData), { image: files[0].path }), {
        new: true,
        runValidators: true,
    });
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
const changePassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_model_1.default.findOne({ _id: id }).select('+password');
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
//!
// const mySuccessRelease = async (id: string) => {
//   const result = await SingleTrack.find({
//     user: id,
//     isApproved: 'approved',
//   }).populate('user');
//   const updatedResult = result.map(music => {
//     music.image = updateImageUrl(music.image)?.replace(/\\/g, '/');
//     music.audio.path = updateImageUrl(music.audio.path)?.replace(/\\/g, '/');
//     return music;
//   });
//   return updatedResult;
// };
//!
const mySuccessRelease = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleTracks = yield single_model_1.SingleTrack.find({
        user: id,
        isApproved: 'approved',
    })
        .populate('user')
        .populate('label')
        .populate('primaryArtist');
    const albums = yield album_model_1.Album.find({
        user: id,
        isApproved: 'approved',
    })
        .populate('user')
        .populate('label')
        .populate('primaryArtist');
    const updatedSingleTracks = singleTracks.map(music => {
        var _a, _b;
        music.image = (_a = (0, url_modifier_1.updateImageUrl)(music.image)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/');
        music.audio.path = (_b = (0, url_modifier_1.updateImageUrl)(music.audio.path)) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '/');
        return music;
    });
    const updatedAlbums = albums.map(album => {
        var _a;
        album.image = (_a = (0, url_modifier_1.updateImageUrl)(album.image)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/');
        album.audio.forEach(audioItem => {
            var _a;
            audioItem.path = (_a = (0, url_modifier_1.updateImageUrl)(audioItem.path)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/');
        });
        return album;
    });
    const updatedResult = [...updatedSingleTracks, ...updatedAlbums];
    return updatedResult;
});
//!
const myPendingRelease = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleTracks = yield single_model_1.SingleTrack.find({
        user: id,
        isApproved: 'pending',
    })
        .populate('user')
        .populate('label')
        .populate('primaryArtist');
    const albums = yield album_model_1.Album.find({
        user: id,
        isApproved: 'pending',
    })
        .populate('user')
        .populate('label')
        .populate('primaryArtist');
    const updatedSingleTracks = singleTracks.map(music => {
        var _a, _b;
        music.image = (_a = (0, url_modifier_1.updateImageUrl)(music.image)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/');
        music.audio.path = (_b = (0, url_modifier_1.updateImageUrl)(music.audio.path)) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, '/');
        return music;
    });
    const updatedAlbums = albums.map(album => {
        var _a;
        album.image = (_a = (0, url_modifier_1.updateImageUrl)(album.image)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/');
        album.audio.forEach(audioItem => {
            var _a;
            audioItem.path = (_a = (0, url_modifier_1.updateImageUrl)(audioItem.path)) === null || _a === void 0 ? void 0 : _a.replace(/\\/g, '/');
        });
        return album;
    });
    const updatedResult = [...updatedSingleTracks, ...updatedAlbums];
    return updatedResult;
});
//!
//!
// const myCorrectionRelease = async (id: string) => {
//   const songs = await SingleTrack.find({ user: id }).populate('user');
//   const filteredSongs = songs.filter(song => song.correctionNote.length > 0);
//   return filteredSongs;
// };
//!
const myCorrectionRelease = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const singleTracks = yield single_model_1.SingleTrack.find({ user: id })
        .populate('user')
        .populate('label')
        .populate('primaryArtist');
    const albums = yield album_model_1.Album.find({ user: id })
        .populate('user')
        .populate('label')
        .populate('primaryArtist');
    const filteredSingleTracks = singleTracks.filter(song => song.correctionNote.length > 0);
    const filteredAlbums = albums.filter(album => album.correctionNote.length > 0);
    const filteredResult = [...filteredSingleTracks, ...filteredAlbums];
    return filteredResult;
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
    mySuccessRelease,
    myPendingRelease,
    myCorrectionRelease,
    updateProfile,
};
