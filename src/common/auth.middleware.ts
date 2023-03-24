import { IMiddleware } from './middlewares.interface';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http.error';
import { verify } from 'jsonwebtoken';
import { UserModel } from '@prisma/client';

type TokenPayloadType = Omit<UserModel, 'password'>;

export class AuthMiddleware implements IMiddleware {
	constructor(private secretKey: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			verify(token, this.secretKey, (error, payload) => {
				if (error) return next(new HTTPError('Доступ запрещен', 403, 'AuthMiddleware'));
				else if (payload) {
					const { id, username, email } = payload as TokenPayloadType;
					req.id = id;
					req.username = username;
					req.email = email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
