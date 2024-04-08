"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const news_model_1 = require("./news.model");
const createNews = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield news_model_1.News.create(payload);
});
const getNews = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield news_model_1.News.find({}).sort({ createdAt: 'desc' }).limit(2);
});
exports.NewsService = {
    createNews,
    getNews,
};
