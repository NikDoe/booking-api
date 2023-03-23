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
import { IUsersService } from './users.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private usersLogger: ILogger,
		@inject(TYPES.IUsersService) private usersService: IUsersService,
	) {
		super(usersLogger);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(LoginDTO)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(RegisterDTO)],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, LoginDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.handleUserLogin(body);
		if (!result) return next(new HTTPError('ошибка авторизации', 401, 'login'));

		res.cookie('jwt', result.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		this.ok(res, { message: 'Вы вошли в систему', token: result.accessToken });
	}

	async register(
		{ body }: Request<{}, {}, RegisterDTO>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.usersService.createUser(body);
		if (!result) {
			return next(new HTTPError('Такой пользователь уже существует', 422, 'register'));
		}
		this.ok(res, {
			message: 'Регистрация прошла успешно',
			id: result.id,
			username: result.username,
			email: result.email,
		});
	}
}
