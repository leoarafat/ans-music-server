import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IPrimaryArtist } from '../artists/artist.interface';
import { ILabel } from '../label/label.interface';

export type ISingleTrack = {
  audio: any;
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
  primaryArtist: Types.ObjectId | IPrimaryArtist;
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
  label: Types.ObjectId | ILabel;
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
  isApproved: 'approved' | 'rejected' | 'pending';
  tackDown: string;
  correctionNote: [];
  user: Types.ObjectId | IUser;
  songStatus: 'take-down' | 'distribute' | 'none';
  inspection: 'failed' | 'saved' | 'none';
  releaseId: string;
};
export type SingleTrackDocument = {
  save(): unknown;
  correctionNote: { text: string; isRead: boolean }[];
};
