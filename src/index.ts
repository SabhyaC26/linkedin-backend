import "reflect-metadata";
import express from "express";

(async () => {
    const app = express();

    app.get("/", (_req, res) => {
        res.send("hello");
    });

    const port: number = 8000;
    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
})();
