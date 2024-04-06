import { Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { ILabel } from '../label/label.interface';
import { IPrimaryArtist } from '../artists/artist.interface';

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
  isApproved: 'approved' | 'rejected';
  songStatus: 'take-down' | 'distribute' | 'none';
  inspection: 'failed' | 'saved' | 'none';
  tackDown: string;
  correctionNote: [];
  releaseId: string;
  user: Types.ObjectId | IUser;
};

export default IAlbumMusic;
