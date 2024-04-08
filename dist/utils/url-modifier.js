"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageUrl = void 0;
const config_1 = __importDefault(require("../config"));
const updateImageUrl = (url) => {
    const newUrl = `${config_1.default.base_url}/${url}`;
    return newUrl;
};
exports.updateImageUrl = updateImageUrl;
