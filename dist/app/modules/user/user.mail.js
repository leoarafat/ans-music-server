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
          width: 80%;
          margin: auto;
          overflow: hidden;
        }
        header {
          background: #ffffff;
          color: #000;
          padding-top: 30px;
          min-height: 70px;
          border-bottom: #4caf50 4px solid; /* Green color for success */
        }
        header a {
          color: #000;
          text-decoration: none;
          text-transform: uppercase;
          font-size: 16px;
        }
        header ul {
          padding: 0;
          margin: 0;
          list-style: none;
          overflow: hidden;
        }
        header #logo {
          float: left;
          display: block;
          margin: 0;
          padding: 0;
        }
        header #logo img {
          width: 100%;
        }
        header nav {
          float: right;
          margin-top: 10px;
        }
        header .highlight, header a:hover {
          color: #4caf50; /* Green color for success */
          font-weight: bold;
        }
        header a#login {
          display: inline;
          padding: 2px 10px;
          font-weight: bold;
          color: #fff;
          background: #4caf50; /* Green color for success */
          font-size: 17px;
          border-radius: 5px;
        }
        header #branding img {
          width: 200px;
          height: auto;
          float: left;
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
