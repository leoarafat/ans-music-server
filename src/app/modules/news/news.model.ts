import { Schema, model } from 'mongoose';
import { INews } from './news.interface';
const newsSchema = new Schema<INews>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const News = model('News', newsSchema);
