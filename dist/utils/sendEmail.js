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
exports.sendEmails = void 0;
/* eslint-disable @typescript-eslint/ban-ts-comment */
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
// import { promisify } from 'util';
const sendEmail = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.smtp.smtp_host,
        port: parseInt(config_1.default.smtp.smtp_port || '587'),
        service: config_1.default.smtp.smtp_service,
        auth: {
            user: config_1.default.smtp.smtp_mail,
            pass: config_1.default.smtp.smtp_password,
        },
    });
    const { email, subject, template, data } = options;
    const templatePath = path_1.default.join(__dirname, '../mails', template);
    const html = yield ejs_1.default.renderFile(templatePath, data);
    const mailOptions = {
        from: config_1.default.smtp.smtp_mail,
        to: email,
        subject,
        html,
    };
    yield transporter.sendMail(mailOptions);
});
exports.default = sendEmail;
const sendEmails = (options) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    mail_1.default.setApiKey(config_1.default.sendgrid.api_key);
    const { email, subject, template, data } = options;
    // Construct the path to the EJS template
    const templatePath = path_1.default.join(__dirname, '../mails', template);
    try {
        // Render the EJS template file to HTML content using data
        const html = yield ejs_1.default.renderFile(templatePath, { data });
        const msg = {
            to: email,
            from: config_1.default.sendgrid.from_email,
            subject: subject,
            html: html,
        };
        //@ts-ignore
        yield mail_1.default.send(msg);
    }
    catch (error) {
        //@ts-ignore
        throw new Error(`Error sending email: ${error.message}`);
    }
});
exports.sendEmails = sendEmails;
// const renderFileAsync = promisify(ejs.renderFile);
// export const sendEmailS = async (options: IEmailOptions): Promise<void> => {
//   //@ts-ignore
//   sgMail.setApiKey(config.sendgrid.api_key);
//   const { email, subject, template, data } = options;
//   // Construct the path to the EJS template
//   const templatePath = path.join(__dirname, '../mails', template);
//   try {
//     // Render the EJS template file to HTML content using data
//     const html = await renderFileAsync(templatePath, data);
//     const msg = {
//       to: email,
//       from: config.sendgrid.from_email,
//       subject: subject,
//       html: html, // Set the HTML content generated from the EJS template
//     };
//     // Send the email
//     //@ts-ignore
//     await sgMail.send(msg);
//   } catch (error) {
//     //@ts-ignore
//     throw new Error(`Error sending email: ${error.message}`);
//   }
// };
