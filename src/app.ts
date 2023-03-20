import express, { Express } from "express";
import { Server } from "http";
import { ExeptionFilter } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";
import { UsersController } from "./users/users.controller";
import { injectable, inject } from "inversify";
import { TYPES } from "./types";
import "reflect-metadata";

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.IUsersController) private usersController: UsersController,
        @inject(TYPES.IExeptionFilter) private exeptionFilter: ExeptionFilter,
    ) {
        this.app = express();
        this.port = 9000;
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