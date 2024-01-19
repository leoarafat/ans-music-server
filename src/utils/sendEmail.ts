/* eslint-disable @typescript-eslint/ban-ts-comment */
import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { IEmailOptions } from '../app/modules/user/user.interface';
import config from '../config';

import sgMail from '@sendgrid/mail';
// import { promisify } from 'util';

const sendEmail = async (options: IEmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.smtp.smtp_host,
    port: parseInt(config.smtp.smtp_port || '587'),
    service: config.smtp.smtp_service,
    auth: {
      user: config.smtp.smtp_mail,
      pass: config.smtp.smtp_password,
    },
  });
  const { email, subject, template, data } = options;

  const templatePath = path.join(__dirname, '../mails', template);
  const html: string = await ejs.renderFile(templatePath, data);
  const mailOptions = {
    from: config.smtp.smtp_mail,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
export default sendEmail;
export const sendEmails = async (options: IEmailOptions): Promise<void> => {
  //@ts-ignore
  sgMail.setApiKey(config.sendgrid.api_key);

  const { email, subject, template, data } = options;

  // Construct the path to the EJS template
  const templatePath = path.join(__dirname, '../mails', template);

  try {
    // Render the EJS template file to HTML content using data
    const html = await ejs.renderFile(templatePath, { data });

    const msg = {
      to: email,
      from: config.sendgrid.from_email,
      subject: subject,
      html: html,
    };

    //@ts-ignore
    await sgMail.send(msg);
  } catch (error) {
    //@ts-ignore
    throw new Error(`Error sending email: ${error.message}`);
  }
};
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
