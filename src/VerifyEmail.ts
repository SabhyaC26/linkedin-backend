import * as nodemailer from "nodemailer";

var transporter = nodemailer.createTransport(
  `smtps://<sabhyachhabria>%40gmail.com:<dagikblinctgycyp>@smtp.gmail.com`
);

var mailOptions = {
  from: "sabhyachhabria@gmail.com",
  to: "sabhyac26@icloud.com",
  subject: "Hello",
  text: "Hello from node.js",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log(`error: ${error}`);
  }
  console.log(`Message Sent ${info.response}`);
});
