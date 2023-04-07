import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
	@IsEmail({}, { message: 'невалидный email' })
	@IsNotEmpty({ message: 'email обязателен для заполнения' })
	email: string;

	@IsNotEmpty({ message: 'Введите пароль' })
	password: string;
}
