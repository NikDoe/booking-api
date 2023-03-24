import { IMiddleware } from './middlewares.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http.error';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.email) {
			return next();
		}
		new HTTPError('Вы не авторизованы', 401);
	}
}
