"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationSuccessEmailBody = void 0;
const registrationSuccessEmailBody = (userData) => {
    var _a;
    return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }
        p {
          color: #777;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
        }
        .button:hover {
          background-color: #0056b3;
        }
        a {
          color: #007bff;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Music Distribution</h1>
        <p>Hello ${(_a = userData === null || userData === void 0 ? void 0 : userData.user) === null || _a === void 0 ? void 0 : _a.name},</p>
        <p>Thank you for registering with Music Distribution. To activate your account, please use the following activation code:</p>
        <h1>${userData === null || userData === void 0 ? void 0 : userData.activationCode}</h1>
        <p>Please enter this code on the activation page within the next 5 minutes.</p>
        <p>If you didn't register for Music Distribution, please ignore this email.</p>
        <p>Click the button below to take action:</p>
        <a class="button" href="#">Activate Account</a>
        <p>If you have any questions, please contact us at <a href="mailto:yeasinarafat1734@gmail.com">yeasinarafat1734@gmail.com</a>.</p>
      </div>
    </body>
  </html>
`;
};
exports.registrationSuccessEmailBody = registrationSuccessEmailBody;
