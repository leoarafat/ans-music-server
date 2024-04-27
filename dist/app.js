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
exports.app = (0, express_1.default)();
//cors
exports.app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
        'http://ansbackstage.com',
        'https://admin.ansbackstage.com',
        'https://beta.ansbackstage.com',
    ],
    credentials: true,
}));
//parser
exports.app.use(express_1.default.json({ limit: '900mb' }));
exports.app.use(express_1.default.urlencoded({ extended: true, limit: '900mb' }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(body_parser_1.default.json());
exports.app.use('/uploads', express_1.default.static('uploads'));
//All Routes
exports.app.use('/', routes_1.default);
// app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
exports.app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Welcome to ANS Music');
}));
//Global Error Handler
exports.app.use(globalErrorHandler_1.default);
exports.app.set('view engine', 'ejs');
//handle not found
exports.app.use(NotFoundHandler_1.NotFoundHandler.handle);
