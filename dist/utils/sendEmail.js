"use strict";
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import nodemailer, { Transporter } from 'nodemailer';
// import ejs from 'ejs';
// import path from 'path';
// import { IEmailOptions } from '../app/modules/user/user.interface';
// import config from '../config';
// import { formattedDate } from './utils';
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
// const sendEmail = async (options: IEmailOptions): Promise<void> => {
//   const transporter: Transporter = nodemailer.createTransport({
//     host: config.smtp.smtp_host,
//     port: parseInt(config.smtp.smtp_port as string),
//     // service: config.smtp.smtp_service,
//     auth: {
//       user: config.smtp.smtp_mail,
//       pass: config.smtp.smtp_password,
//     },
//   });
//   const { email, subject, template, data } = options;
//   const templatePath = path.join(__dirname, '../mails', template);
//   const html: string = await ejs.renderFile(templatePath, data);
//   const mailOptions = {
//     from: `${config.smtp.NAME} <${config.smtp.smtp_mail}>`,
//     to: email,
//     date: formattedDate,
//     signed_by: 'ansmusiclimited.com',
//     subject,
//     html,
//   };
//   await transporter.sendMail(mailOptions);
// };
// export default sendEmail;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const nodemailer_1 = __importDefault(require("nodemailer"));
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
    const { email, subject, html } = options;
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
