import { Types } from 'mongoose';

type IAudio = {
  path: string;
  title: string;
  artist: string;
};

type IAlbumMusic = {
  audio: IAudio[];
  image: string;
  status: boolean;
  user: Types.ObjectId;
  trackType: 'music' | 'classic-music' | 'jazz-music';
  isRelease: 'yes' | 'no';
  instrumental: 'yes' | 'no';
  secondaryTrackType:
    | 'original'
    | 'karaoke'
    | 'melody'
    | 'cover'
    | 'cover-by-band';
  primaryArtist: string[];
  primaryArtistSpotifyId: string;
  tiktokStartInSecond: string;
  trackLanguage: string;
  releaseDate: string;
  isAdvancePurchase: boolean;
  advancePurchaseDate?: string;
  isApproved: 'approved' | 'rejected' | 'pending';
  correctionNote?: string[];
  tackDown?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default IAlbumMusic;
