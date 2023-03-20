import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http.error';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUsersController } from './users.controller.interface';
import 'reflect-metadata';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './user.entity';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private usersLogger: ILogger) {
		super(usersLogger);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
		]);
	}

	async login(req: Request<{}, {}, LoginDTO>, res: Response, next: NextFunction): Promise<void> {
		console.log(req.body);
		next(new HTTPError('ошибка авторизации', 401, 'login'));
	}

	async register(
		{ body }: Request<{}, {}, RegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new User(body.username, body.email);
		await newUser.setPassword(body.password);
		this.ok(res, newUser);
	}
}
