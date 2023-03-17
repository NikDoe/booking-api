import express, { Express } from "express";
import { Server } from "http";
import { LoggerSevice } from "./logger/logger.service";
import { usersRouter } from "./users/users";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerSevice

    constructor(logger: LoggerSevice) {
        this.app = express();
        this.port = 9000;
        this.logger = logger;
    }

    useRoutes() {
        this.app.use("/users", usersRouter);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`сервер запущен на порту ${this.port}`);
    }
}