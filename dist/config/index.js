"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), '.env'),
});
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    base_url: process.env.BASE_URL,
    database_url: process.env.MONGO_URL,
    database_password: process.env.DB_PASSWORD,
    activation_secret: process.env.ACTIVATION_SECRET,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
    smtp: {
        smtp_host: process.env.SMTP_HOST,
        smtp_port: process.env.SMTP_PORT,
        smtp_service: process.env.SMTP_SERVICE,
        smtp_mail: process.env.SMTP_MAIL,
        smtp_password: process.env.SMTP_PASSWORD,
    },
    sendgrid: {
        from_email: process.env.FORM_EMAIL,
        api_key: process.env.SEND_GRIDAPI_KEY,
    },
};
