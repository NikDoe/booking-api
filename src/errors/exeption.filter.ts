import { NextFunction, Request, Response } from "express";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http.error";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
    constructor(@inject(TYPES.ILogger) private exeptionLogger: ILogger) { }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.exeptionLogger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
            res.status(err.statusCode).send({ error: err.message })
        } else {
            this.exeptionLogger.error(`${err.message}`);
            res.status(500).send({ error: err.message })
        }
    }
}