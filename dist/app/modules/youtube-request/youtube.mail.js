"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeRequestEmailBody = void 0;
const youtubeRequestEmailBody = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Claim Request</title>
  <style>
    /* CSS styles can be placed inline or in a separate stylesheet */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }
    h1, p {
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>New Claim Request Received</h1>
    <p>Hello ${data.name},</p>
    <p>We have received a new ${data.type} request. Please review the details below:</p>
    <ul>
      <li><strong>ID:</strong> ${data.id}</li>
      <li><strong>URL:</strong> ${data.url}</li>
    </ul>
    <p>You can view more details and process the ${data.type} by logging into your account.</p>
    <a href="https://ans-music.com" class="button">Log In to Your Account</a>
    <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
    <p>Thank you,<br>ANS Team</p>
  </div>
</body>
</html>
`;
exports.youtubeRequestEmailBody = youtubeRequestEmailBody;
