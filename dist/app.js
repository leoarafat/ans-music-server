"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const NotFoundHandler_1 = require("./errors/NotFoundHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
//cors
exports.app.use((0, cors_1.default)());
//parser
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(body_parser_1.default.json());
//All Routes
exports.app.use('/api/v1', routes_1.default);
// app.use('/api/v1/src/uploads', express.static('uploads'));
exports.app.use('/uploads', (req, res, next) => {
    console.log('Received request for:', path_1.default.join('../src/uploads', req.url));
    next();
}, express_1.default.static('uploads'));
//Global Error Handler
exports.app.use(globalErrorHandler_1.default);
//handle not found
exports.app.use(NotFoundHandler_1.NotFoundHandler.handle);
