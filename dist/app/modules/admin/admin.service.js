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
exports.AdminService = void 0;
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const user_model_1 = __importDefault(require("../user/user.model"));
const admin_model_1 = __importDefault(require("./admin.model"));
const single_model_1 = require("../single-track/single.model");
const youtube_request_model_1 = require("../youtube-request/youtube-request.model");
const http_status_1 = __importDefault(require("http-status"));
const album_model_1 = require("../album/album.model");
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
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
const updateAdmin = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.default.findOne({ _id: id });
    //@ts-ignore
    const { files } = req;
    //@ts-ignore
    const data = JSON.parse(req.body.data);
    //@ts-ignore
    const imageFile = files.image[0];
    if (!isExist) {
        throw new ApiError_1.default(404, 'Admin not found!');
    }
    const userData = __rest(data, []);
    const result = yield admin_model_1.default.findOneAndUpdate({ _id: id }, Object.assign(Object.assign({}, userData), { image: imageFile.path }), {
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
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield yield admin_model_1.default.isAdminExist(email);
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
        //@ts-ignore
        adminInfo: isUserExist,
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
const changePassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword } = payload;
    const isAdminExist = yield admin_model_1.default.findOne({ _id: id }).select('+password');
    if (!isAdminExist) {
        throw new ApiError_1.default(404, 'Admin does not exist');
    }
    if (isAdminExist.password &&
        !(yield admin_model_1.default.isPasswordMatched(oldPassword, isAdminExist.password))) {
        throw new ApiError_1.default(402, 'Old password is incorrect');
    }
    isAdminExist.save();
});
//!
const approveSingleMusic = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findSingleSong = yield single_model_1.SingleTrack.findById(id);
    const findAlbumSong = yield album_model_1.Album.findById(id);
    if (findSingleSong) {
        const result = yield single_model_1.SingleTrack.findOneAndUpdate({ _id: id }, { isApproved: 'approved' }, {
            new: true,
            runValidators: true,
        })
            .populate('label')
            .populate('primaryArtist');
        return result;
    }
    if (findAlbumSong) {
        const result = yield album_model_1.Album.findOneAndUpdate({ _id: id }, { isApproved: 'approved' }, {
            new: true,
            runValidators: true,
        })
            .populate('label')
            .populate('primaryArtist');
        return result;
    }
});
const rejectMusic = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { note } = payload;
    const singleSong = yield single_model_1.SingleTrack.findById(id)
        .populate('label')
        .populate('primaryArtist');
    const albumSong = yield album_model_1.Album.findById(id)
        .populate('label')
        .populate('primaryArtist');
    try {
        let updatedAlbum;
        let updatedSingleTrack;
        if (singleSong) {
            updatedSingleTrack = (yield single_model_1.SingleTrack.findOneAndUpdate({ _id: id }, { isApproved: 'rejected' }, {
                new: true,
                runValidators: true,
            }));
        }
        if (albumSong) {
            updatedAlbum = (yield album_model_1.Album.findOneAndUpdate({ _id: id }, { isApproved: 'rejected' }, {
                new: true,
                runValidators: true,
            }));
        }
        if (updatedSingleTrack) {
            updatedSingleTrack.correctionNote.push({
                text: note,
                isRead: false,
            });
            yield updatedSingleTrack.save();
        }
        if (updatedAlbum) {
            updatedAlbum.correctionNote.push({
                text: note,
                isRead: false,
            });
            yield updatedAlbum.save();
        }
        return { updatedSingleTrack, updatedAlbum };
    }
    catch (error) {
        console.log(error);
        //@ts-ignore
        throw new Error(error.message);
    }
});
//! Youtube request
const getClaimRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.ClaimRequest.find({});
    return result;
});
const getArtistChannelRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.ArtistChannelRequest.find({});
    return result;
});
const getWhitelistRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.WhitelistRequest.find({});
    return result;
});
const getClaimRequestsPending = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.ClaimRequest.find({ approvedStatus: 'pending' });
    return result;
});
const getArtistChannelRequestPending = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.ArtistChannelRequest.find({ approvedStatus: 'pending' });
    return result;
});
const getWhitelistRequestPending = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield youtube_request_model_1.WhitelistRequest.find({ approvedStatus: 'pending' });
    return result;
});
const updateClaimRequests = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield youtube_request_model_1.ClaimRequest.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(404, 'Data not found');
    }
    const result = yield youtube_request_model_1.ClaimRequest.findOneAndUpdate({ _id: id }, { approvedStatus: payload.approvedStatus }, { new: true, runValidators: true });
    return result;
});
const updateArtistChannelRequest = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield youtube_request_model_1.ArtistChannelRequest.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(404, 'Data not found');
    }
    const result = yield youtube_request_model_1.ArtistChannelRequest.findOneAndUpdate({ _id: id }, { approvedStatus: payload.approvedStatus }, { new: true, runValidators: true });
    return result;
});
const updateWhitelistRequest = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield youtube_request_model_1.WhitelistRequest.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(404, 'Data not found');
    }
    const result = yield youtube_request_model_1.WhitelistRequest.findOneAndUpdate({ _id: id }, { approvedStatus: payload.approvedStatus }, { new: true, runValidators: true });
    return result;
});
//! Add note, make terminate and lock User
const addNoteInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, userId } = payload;
    const isExistUser = yield user_model_1.default.findById(userId);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    //@ts-ignore
    isExistUser.note.push({
        note: text,
        isRead: false,
    });
    yield isExistUser.save();
    return isExistUser;
});
const terminateUserAccount = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = payload;
    const isExistUser = yield user_model_1.default.findById(userId);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
        accountStatus: 'terminate',
    }, {
        new: true,
        runValidators: true,
    });
});
const lockUserAccount = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = payload;
    const isExistUser = yield user_model_1.default.findById(userId);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
        accountStatus: 'lock',
    }, {
        new: true,
        runValidators: true,
    });
});
const UnlockUserAccount = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = payload;
    const isExistUser = yield user_model_1.default.findById(userId);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    return yield user_model_1.default.findOneAndUpdate({ _id: userId }, {
        accountStatus: 'un-lock',
    }, {
        new: true,
        runValidators: true,
    });
});
const myProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield admin_model_1.default.findById(id);
});
const latestRelease = () => __awaiter(void 0, void 0, void 0, function* () {
    const singleSongs = yield single_model_1.SingleTrack.find({
        isApproved: 'success',
    })
        .lean()
        .populate('label')
        .populate('primaryArtist');
    const albumSongs = yield album_model_1.Album.find({ isApproved: 'success' })
        .lean()
        .populate('label')
        .populate('primaryArtist');
    const singleSongData = singleSongs.map(song => (Object.assign(Object.assign({}, song), { audio: song.audio.path })));
    const albumSongData = albumSongs.flatMap(album => album.audio.map(audioItem => (Object.assign(Object.assign({}, album), { audio: audioItem.path }))));
    const combinedData = [...singleSongData, ...albumSongData];
    return combinedData;
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
    UnlockUserAccount,
    latestRelease,
};
