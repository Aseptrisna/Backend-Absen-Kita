require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("../config/config");

const user = config.user;
const pass = config.pass;
const { SMTP_HOST, SMTP_PORT } = process.env;

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
});

module.exports.sendConfirmationEmail = (token, email) => {
  transport
    .sendMail({
      from:"<pptik@pptik.itb.ac.id>",
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
        <p>Link: ${process.env.URL + token}</p>
        </div>`,
    })
    .catch((err) => console.log(err));
};

module.exports.sendConfirmationResetPasswordEmail = (
  name,
  email,
  confirmationCode
) => {
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Reset Password",
      html: `<h1>Email Confirmation</h1>
          <p>Hello ${name}</p>
          <p>Email: ${email}</p>
          <p>Password Baru anda:${confirmationCode}</p>
          </div>`,
    })
    .catch((err) => console.log(err));
};
