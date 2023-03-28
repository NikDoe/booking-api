import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
	@IsNotEmpty({ message: 'Поле username обязательно для заполнения' })
	username: string;

	@IsNotEmpty({ message: 'Поле username обязательно для заполнения' })
	@IsEmail({}, { message: 'невалидный email' })
	email: string;

	@IsNotEmpty({ message: 'Поле пароль обязательно для заполнения' })
	@MinLength(4, { message: 'Пароль не должен быть кароче 4 символов' })
	password: string;
}
