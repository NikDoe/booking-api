import express, { Express } from "express";
import { Server } from "http";
import { ExeptionFilter } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";
import { UsersController } from "./users/users.controller";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: ILogger;
    usersController: UsersController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: ILogger,
        usersController: UsersController,
        exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 9000;
        this.logger = logger;
        this.usersController = usersController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes() {
        this.app.use("/users", this.usersController.router);
    }

    useExeptionFilter() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }

    public async init() {
        this.useRoutes();
        this.useExeptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.log(`сервер запущен на порту ${this.port}`);
    }
}