import { Logger, ILogObj } from "tslog";

export class LoggerSevice {
    public logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger({
            hideLogPositionForProduction: true,
        });
    }

    log(...args: unknown[]): void {
        this.logger.info(...args);
    }

    error(...args: unknown[]): void {
        this.logger.error(...args);
    }

    warn(...args: unknown[]): void {
        this.logger.warn(...args);
    }
}