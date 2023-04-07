import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		const object = plainToInstance(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			const errorsMessage = errors
				.map((item) => {
					if (item.constraints) return Object.values(item.constraints);
				})
				.join(', ');

			throw new HttpException(
				{ error: errorsMessage, status: HttpStatus.BAD_REQUEST },
				HttpStatus.BAD_REQUEST,
			);
		}
		return value;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
