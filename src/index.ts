import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import * as nodemailer from "nodemailer";

(async () => {
  const app = express();

  app.get("/", (_req, res) => {
    res.send("hello");
  });

  // test route to send an email
  app.get("/email", (_req, res) => {
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "sabhyachhabria@gmail.com",
        pass: "",
      },
    });
    var mailOptions = {
      from: "sabhyachhabria@gmail.com",
      to: "sabhyachhabria@gmail.com",
      subject: "Hello",
      text: "Hello from node.js",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`error: ${error}`);
        res.send("email failed");
      }
      console.log(`Message Sent ${info.response}`);
    });
    res.send("email sent");
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  apolloServer.applyMiddleware({ app });

  const port: number = 8000;
  app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });
})();
