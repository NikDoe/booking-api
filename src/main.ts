import { App } from "./app";
import { LoggerSevice } from "./logger/logger.service";
import { UsersController } from "./users/users.controller";

async function bootstrap() {
    const logger = new LoggerSevice();
    const app = new App(logger, new UsersController(logger));
    await app.init();
};

bootstrap();