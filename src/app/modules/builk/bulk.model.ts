import mongoose from 'mongoose';
import { IBulk } from './bulk.interface';

const bulkSchema = new mongoose.Schema<IBulk>({
  upc: String,
  isrc: String,
  releaseTitle: String,
  releaseSubtitle: String,
  trackTitle: String,
  trackSubtitle: String,
  cLine: String,
  pLine: String,
  genre: String,
  subGenre: String,
  primaryArtist: String,
  anotherPrimaryArtist: [String],
  featuringArtist: String,
  writer: String,
  composer: String,
  arranger: String,
  producer: String,
  publisher: String,
  labelName: String,
  instrumental: String,
  trackLanguage: String,
  titleLanguage: String,
  clipPreviewStartInSeconds: String,
  primaryTrackType: String,
  parentalAdvisory: String,
  releaseDate: String,
});
export const Bulk = mongoose.model('Bulk', bulkSchema);
