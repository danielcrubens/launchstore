const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "54f61d59085a57",
      pass: "8108e12d421508"
    }
  });
