/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from '../auth/auth.interface';
import { IRegistration, IUser } from '../user/user.interface';
import User from '../user/user.model';
import Admin from './admin.model';
import { SingleTrack } from '../single-track/single.model';

import {
  ArtistChannelRequest,
  ClaimRequest,
  WhitelistRequest,
} from '../youtube-request/youtube-request.model';
import httpStatus from 'http-status';
import { SingleTrackDocument } from '../single-track/single.interface';
import { Album } from '../album/album.model';

//!
const registrationUser = async (payload: IRegistration) => {
  const { email } = payload;
  const isEmailExist = await Admin.findOne({ email });
  if (isEmailExist) {
    throw new ApiError(400, 'Email already exist');
  }
  return await Admin.create(payload);
};
//!
const createUser = async (userData: IUser): Promise<IUser | null> => {
  const newUser = await User.create(userData);
  return newUser;
};
//!
const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({});
  return users;
};
//!
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);

  return result;
};
//!
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  return result;
};
//!
const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await await Admin.isAdminExist(email);

  if (!isUserExist) {
    throw new ApiError(404, 'Admin does not exist');
  }

  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(402, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );
  //Create refresh token
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    //@ts-ignore
    adminInfo: isUserExist,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (err) {
    throw new ApiError(402, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await Admin.isAdminExist(userId);
  if (!isUserExist) {
    throw new ApiError(403, 'Admin does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword } = payload;
  const isUserExist = await Admin.findOne({ _id: user?.userId }).select(
    '+password',
  );
  if (!isUserExist) {
    throw new ApiError(404, 'Admin does not exist');
  }
  if (
    isUserExist.password &&
    !(await Admin.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(402, 'Old password is incorrect');
  }

  isUserExist.save();
};
//!
const approveSingleMusic = async (id: string) => {
  const result = await SingleTrack.findOneAndUpdate(
    { _id: id },
    { isApproved: 'approved' },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const rejectMusic = async (id: string, payload: { note: string }) => {
  const { note } = payload;

  const singleSong = await SingleTrack.findById(id);
  const albumSong = await Album.findById(id);

  try {
    let updatedAlbum;
    let updatedSingleTrack;

    if (singleSong) {
      updatedSingleTrack = (await SingleTrack.findOneAndUpdate(
        { _id: id },
        { isApproved: 'rejected' },
        {
          new: true,
          runValidators: true,
        },
      )) as SingleTrackDocument;
    }

    if (albumSong) {
      updatedAlbum = (await Album.findOneAndUpdate(
        { _id: id },
        { isApproved: 'rejected' },
        {
          new: true,
          runValidators: true,
        },
      )) as SingleTrackDocument;
    }

    if (updatedSingleTrack) {
      updatedSingleTrack.correctionNote.push({
        text: note,
        isRead: false,
      });
      await updatedSingleTrack.save();
    }
    if (updatedAlbum) {
      updatedAlbum.correctionNote.push({
        text: note,
        isRead: false,
      });
      await updatedAlbum.save();
    }

    return { updatedSingleTrack, updatedAlbum };
  } catch (error) {
    console.log(error);
    //@ts-ignore
    throw new Error(error.message);
  }
};

//! Youtube request
const getClaimRequests = async () => {
  const result = await ClaimRequest.find({});
  return result;
};
const getArtistChannelRequest = async () => {
  const result = await ArtistChannelRequest.find({});
  return result;
};
const getWhitelistRequest = async () => {
  const result = await WhitelistRequest.find({});
  return result;
};
const getClaimRequestsPending = async () => {
  const result = await ClaimRequest.find({ approvedStatus: 'pending' });
  return result;
};
const getArtistChannelRequestPending = async () => {
  const result = await ArtistChannelRequest.find({ approvedStatus: 'pending' });
  return result;
};
const getWhitelistRequestPending = async () => {
  const result = await WhitelistRequest.find({ approvedStatus: 'pending' });
  return result;
};
const updateClaimRequests = async (
  id: string,
  payload: { approvedStatus: string },
) => {
  const isExists = await ClaimRequest.findById(id);
  if (!isExists) {
    throw new ApiError(404, 'Data not found');
  }
  const result = await ClaimRequest.findOneAndUpdate(
    { _id: id },
    { approvedStatus: payload.approvedStatus },
    { new: true, runValidators: true },
  );
  return result;
};
const updateArtistChannelRequest = async (
  id: string,
  payload: { approvedStatus: string },
) => {
  const isExists = await ArtistChannelRequest.findById(id);
  if (!isExists) {
    throw new ApiError(404, 'Data not found');
  }
  const result = await ArtistChannelRequest.findOneAndUpdate(
    { _id: id },
    { approvedStatus: payload.approvedStatus },
    { new: true, runValidators: true },
  );
  return result;
};
const updateWhitelistRequest = async (
  id: string,
  payload: { approvedStatus: string },
) => {
  const isExists = await WhitelistRequest.findById(id);
  if (!isExists) {
    throw new ApiError(404, 'Data not found');
  }
  const result = await WhitelistRequest.findOneAndUpdate(
    { _id: id },
    { approvedStatus: payload.approvedStatus },
    { new: true, runValidators: true },
  );
  return result;
};
//! Add note, make terminate and lock User
const addNoteInUser = async (payload: { text: string; userId: string }) => {
  const { text, userId } = payload;
  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  //@ts-ignore
  isExistUser.note.push({
    note: text,
    isRead: false,
  });
  await isExistUser.save();
  return isExistUser;
};
const terminateUserAccount = async (payload: { userId: string }) => {
  const { userId } = payload;
  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return await User.findOneAndUpdate(
    { _id: userId },
    {
      accountStatus: 'terminate',
    },
    {
      new: true,
      runValidators: true,
    },
  );
};
const lockUserAccount = async (payload: { userId: string }) => {
  const { userId } = payload;
  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return await User.findOneAndUpdate(
    { _id: userId },
    {
      accountStatus: 'lock',
    },
    {
      new: true,
      runValidators: true,
    },
  );
};
export const AdminService = {
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
};
