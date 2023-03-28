import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './middlewares.interface';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToInstance(this.classToValidate, body);

		validate(instance).then((errors) => {
			if (errors.length > 0) {
				const errorsMessage = errors
					.map((item) => {
						if (item.constraints) return Object.values(item.constraints);
					})
					.join(', ');
				res.status(422).send({ error: errorsMessage });
			} else {
				next();
			}
		});
	}
}
