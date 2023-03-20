import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { HTTPError } from "../errors/http.error";
import { injectable, inject } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import "reflect-metadata";
import { IUsersController } from "./users.controller.interface";

@injectable()
export class UsersController extends BaseController implements IUsersController {
    constructor(@inject(TYPES.ILogger) private usersLogger: ILogger) {
        super(usersLogger);
        this.bindRoutes([
            { path: "/login", method: "post", func: this.login },
            { path: "/register", method: "post", func: this.register },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError("ошибка авторизации", 401, "login"));
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "контроллер регистрации работает")
    }
}