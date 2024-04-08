// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import nodemailer, { Transporter } from 'nodemailer';
// import ejs from 'ejs';
// import path from 'path';
// import { IEmailOptions } from '../app/modules/user/user.interface';
// import config from '../config';
// import { formattedDate } from './utils';

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
import nodemailer, { Transporter } from 'nodemailer';
import { IEmailOptions } from '../app/modules/user/user.interface';
import config from '../config';
import { formattedDate } from './utils';

const sendEmail = async (options: IEmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: config.smtp.smtp_host,
    port: parseInt(config.smtp.smtp_port as string),
    // service: config.smtp.smtp_service,
    auth: {
      user: config.smtp.smtp_mail,
      pass: config.smtp.smtp_password,
    },
  });
  const { email, subject, html } = options;

  const mailOptions = {
    from: `${config.smtp.NAME} <${config.smtp.smtp_mail}>`,
    to: email,
    date: formattedDate,
    signed_by: 'ansmusiclimited.com',
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
