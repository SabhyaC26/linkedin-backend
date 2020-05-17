import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";

(async () => {
    const app = express();

    app.get("/", (_req, res) => {
        res.send("hello");
    });

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        })
    });

    apolloServer.applyMiddleware({ app });

    const port: number = 8000;
    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
})();
