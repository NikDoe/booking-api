import express, { Express } from "express";
import { Server } from "http";
import { LoggerSevice } from "./logger/logger.service";
import { usersRouter } from "./users/users";
import { UsersController } from "./users/users.controller";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerSevice
    usersController: UsersController

    constructor(
        logger: LoggerSevice,
        usersController: UsersController
    ) {
        this.app = express();
        this.port = 9000;
        this.logger = logger;
        this.usersController = usersController;
    }

    useRoutes() {
        this.app.use("/users", this.usersController.router);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`сервер запущен на порту ${this.port}`);
    }
}