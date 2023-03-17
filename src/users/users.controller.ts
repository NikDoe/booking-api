import { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller";
import { LoggerSevice } from "../logger/logger.service";

export class UsersController extends BaseController {
    constructor(logger: LoggerSevice) {
        super(logger);
        this.bindRoutes([
            { path: "/login", method: "post", func: this.login },
            { path: "/register", method: "post", func: this.register },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "контроллер логина работает")
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "контроллер регистрации работает")
    }
}