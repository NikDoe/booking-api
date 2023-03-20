import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http.error';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private usersLogger: ILogger) {
		super(usersLogger);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		next(new HTTPError('ошибка авторизации', 401, 'login'));
	}

	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, 'контроллер регистрации работает');
	}
}
