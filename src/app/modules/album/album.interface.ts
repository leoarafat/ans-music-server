import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';

type IAudio = {
  path: string;
  title: string;
  artist: string;
};

type IAlbumMusic = {
  audio: IAudio[];
  image: string;
  trackType: 'music' | 'classic-music' | 'jazz-music';
  isRelease: 'yes' | 'no';
  instrumental: 'yes' | 'no';
  secondaryTrackType:
    | 'original'
    | 'karaoke'
    | 'melody'
    | 'cover'
    | 'cover-by-band';
  parentalAdvisory: 'explicit' | 'no-explicit' | 'edited';
  releaseTitle: string;
  subtitle: string;
  line: string;
  primaryArtist: string[];
  primaryArtistSpotifyId: string;
  primaryArtistAppleId: string;
  primaryArtistFacebookId: string;
  primaryArtistYoutubeId: string;
  writer: string[];
  composer: string[];
  musicDirector: string[];
  producer: string[];
  actor: string;
  filmDirector: string;
  genre: string;
  upcEan: string;
  subGenre: string;
  producerCatalogNumber: string;
  productionYear: string;
  labelName: string;
  publisher: string;
  youtubeUrl: string;
  isrc: string;
  catalogNumber: string;
  tiktokStartInSecond: string;
  trackLanguage: string;
  releaseDate: string;
  isAdvancePurchase: boolean;
  advancePurchaseDate: string;
  status: boolean;
  isApproved: 'approved' | 'rejected';
  songStatus: 'take-down' | 'distribute';
  tackDown: string;
  correctionNote: string[];
  user: Types.ObjectId | IUser;
};
// type IAlbumMusic = {
//   audio: IAudio[];
//   image: string;
//   status: boolean;
//   user: Types.ObjectId;
//   trackType: 'music' | 'classic-music' | 'jazz-music';
//   isRelease: 'yes' | 'no';
//   instrumental: 'yes' | 'no';
//   secondaryTrackType:
//     | 'original'
//     | 'karaoke'
//     | 'melody'
//     | 'cover'
//     | 'cover-by-band';
//   primaryArtist: string[];
//   primaryArtistSpotifyId: string;
//   tiktokStartInSecond: string;
//   trackLanguage: string;
//   releaseDate: string;
//   isAdvancePurchase: boolean;
//   advancePurchaseDate?: string;
//   isApproved: 'approved' | 'rejected' | 'pending';
//   correctionNote?: string[];
//   tackDown?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// };

export default IAlbumMusic;
