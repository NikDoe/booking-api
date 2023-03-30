import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
	@IsEmail({}, { message: 'Неверно указан email' })
	@IsNotEmpty({ message: 'Введите email' })
	email: string;

	@IsNotEmpty({ message: 'Введите пароль' })
	password: string;
}
