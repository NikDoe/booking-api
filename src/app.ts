import express, { Express } from "express";
import { Server } from "http";
import { usersRouter } from "./users/users";

export class App {
    app: Express;
    server: Server;
    port: number;

    constructor() {
        this.app = express();
        this.port = 9000;
    }

    useRoutes() {
        this.app.use("/users", usersRouter);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        console.log(`сервер запущен на порту ${this.port}`);
    }
}