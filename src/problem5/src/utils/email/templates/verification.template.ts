import { env } from '../../../env';

export const getVerificationTemplate = (
  otp?: string,
  fullName?: string,
  isResend?: boolean,
) => {
  const subject = `${isResend ? 'Resend : ' : ''}Verify Your Email Address`;
  const html = `
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
          background-color: #f0f0f0;
          color: #171B20;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
        border: 1px solid black;
        }
        .header {
          text-align: center;
          padding: 20px;
          background-color: #111111;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .header img {
          height: 75px;
          width: 150px;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .otp-code {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          color: #6E33CD;
        }
          .btn {

          background-color: #6E33CD;
          color: white !important;
          padding: 10px 24px;
          text-decoration: none !important;
          border-radius: 8px;
          display: inline-block;
          font-weight: bold;
          margin-top: 20px;
            border: 1px solid #6E33CD;
        }
        .btn:hover {
          background-color: #fff !important;
          color: #6E33CD !important;
          border: 1px solid #6E33CD;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #666666;
        }
        .cmp-logo{
            color: white
        }
        /* Dark Mode */
        @media (prefers-color-scheme: dark) {
          body {
            background-color: #1E1E1E;
            color: #f0f0f0;
          }
          .container {
            background-color: #2C2C2C;
          }
          .header {
            background-color: #333333;
          }
          .otp-code {
            color: #6E33CD;
          }
          .btn {
            background-color: #6E33CD;
            color: #fff;
          }
          .footer {
            color: #999999;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 class="cmp-logo">Express Demo</h2>
        </div>
        <div class="content">
          <h2>Hello, ${fullName}</h2>
          <p>Thank you for registering with us! Please verify your email address by entering the OTP below:</p>
          <div class="otp-code">${otp}</div>
          <p>This OTP is valid for the next 10 minutes.</p>
          <a href="${env.app.frontEndUrl}/auth/verify-otp" class="btn">Go to Website</a>
        </div>
        <div class="footer">
          <p>If you did not request this verification, you can safely ignore this email.</p>
        </div>
      </div>
    </body>
  </html>
  `;
  return { subject, html };
};
