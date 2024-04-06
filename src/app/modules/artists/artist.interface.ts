import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IPrimaryArtist = {
  user: Types.ObjectId | IUser;
  primaryArtistName: string;
  primaryArtistId: number;
  primaryArtistSpotifyId: string;
  primaryArtistAppleId: string;
  primaryArtistFacebookId: string;
  primaryArtistYoutubeId: string;
};
