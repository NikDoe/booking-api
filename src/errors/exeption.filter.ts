import { NextFunction, Request, Response } from "express";
import { LoggerSevice } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http.error";


export class ExeptionFilter implements IExeptionFilter {
    logger: LoggerSevice;

    constructor(logger: LoggerSevice) {
        this.logger = logger;
    }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
            res.status(err.statusCode).send({ error: err.message })
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send({ error: err.message })
        }
    }
}