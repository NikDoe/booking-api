import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({ message: 'укажите пароль' })
	password: string;
}
