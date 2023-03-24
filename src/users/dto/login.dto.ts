import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
	@IsNotEmpty({ message: 'Введите email' })
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsNotEmpty({ message: 'Введите пароль' })
	password: string;
}
