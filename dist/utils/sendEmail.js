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
/* eslint-disable @typescript-eslint/ban-ts-comment */
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const utils_1 = require("./utils");
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.smtp.smtp_host,
        port: parseInt(config_1.default.smtp.smtp_port),
        // service: config.smtp.smtp_service,
        auth: {
            user: config_1.default.smtp.smtp_mail,
            pass: config_1.default.smtp.smtp_password,
        },
    });
    const { email, subject, template, data } = options;
    const templatePath = path_1.default.join(__dirname, '../mails', template);
    const html = yield ejs_1.default.renderFile(templatePath, data);
    const mailOptions = {
        from: `${config_1.default.smtp.NAME} <${config_1.default.smtp.smtp_mail}>`,
        to: email,
        date: utils_1.formattedDate,
        signed_by: 'ansmusiclimited.com',
        subject,
        html,
    };
    yield transporter.sendMail(mailOptions);
});
exports.default = sendEmail;
