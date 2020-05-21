"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const UserResolver_1 = require("./resolvers/UserResolver");
const typeorm_1 = require("typeorm");
const nodemailer = __importStar(require("nodemailer"));
const dotenv = __importStar(require("dotenv"));
const AuthResolver_1 = require("./resolvers/AuthResolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    dotenv.config();
    app.get("/", (_req, res) => {
        res.send("hello");
    });
    app.get("/email", (_req, res) => {
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "sabhyachhabria@gmail.com",
                pass: process.env.GMAIL_KEY,
            },
        });
        var mailOptions = {
            from: "sabhyachhabria@gmail.com",
            to: "sabhyachhabria@gmail.com",
            subject: "Hello",
            text: "test email 2",
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
    yield typeorm_1.createConnection();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [UserResolver_1.UserResolver, AuthResolver_1.AuthResolver],
        }),
    });
    apolloServer.applyMiddleware({ app });
    const port = 8000;
    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
}))();
//# sourceMappingURL=index.js.map