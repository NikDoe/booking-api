import { App } from "./app";
import { LoggerSevice } from "./logger/logger.service";

async function bootstrap() {
    const app = new App(new LoggerSevice());
    await app.init();
};

bootstrap();