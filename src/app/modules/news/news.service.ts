import { INews } from './news.interface';
import { News } from './news.model';

const createNews = async (payload: INews) => {
  return await News.create(payload);
};
const getNews = async () => {
  return await News.find({}).sort({ createdAt: 'desc' }).limit(2);
};

export const NewsService = {
  createNews,
  getNews,
};
