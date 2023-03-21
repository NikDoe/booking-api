import { IsEmail, IsString } from 'class-validator';

export class RegisterDTO {
	@IsString({ message: 'укажите username' })
	username: string;

	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsString({ message: 'укажите пароль' })
	password: string;
}
