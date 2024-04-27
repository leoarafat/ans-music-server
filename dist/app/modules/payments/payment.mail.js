"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentReceivedEmailBody = void 0;
const paymentReceivedEmailBody = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Received</title>
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
    <h1>Payment Received</h1>
    <p>Hello ${data.name},</p>
    <p>We're writing to inform you that a payment has been received from the admin. Here are the details:</p>
    <ul>
      <li><strong>Transaction ID:</strong> ${data.transactionId}</li>
      <li><strong>Amount Received:</strong> $${data.amount}</li>
      <li><strong>Payment Date:</strong> ${data.enterDate}</li>
    </ul>
    <p>You can view the details of this payment in your account.</p>
    <a href="https://ans-music.com" class="button">Log In to Your Account</a>
    <p>If you have any questions or concerns, please feel free to contact us.</p>
    <p>Thank you,<br>ANS Team</p>
  </div>
</body>
</html>
`;
exports.paymentReceivedEmailBody = paymentReceivedEmailBody;
