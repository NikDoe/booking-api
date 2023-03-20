import { Container } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { LoggerSevice } from "./logger/logger.service";
import { TYPES } from "./types";
import { UsersController } from "./users/users.controller";

const appContainer = new Container();

appContainer.bind<App>(TYPES.Application).to(App);
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerSevice);
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { appContainer, app };