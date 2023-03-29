import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
	@IsNotEmpty({ message: 'имя пользователя обязательно для заполнения' })
	username: string;

	@IsEmail({}, { message: 'невалидный email' })
	@IsNotEmpty({ message: 'email обязателен для заполнения' })
	email: string;

	@MinLength(4, { message: 'Пароль не должен быть кароче 4 символов' })
	@IsNotEmpty({ message: 'пароль обязателен для заполнения' })
	password: string;
}
