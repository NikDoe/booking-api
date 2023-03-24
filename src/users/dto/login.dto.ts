import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
	@IsNotEmpty({ message: 'Поле email обязательно для заполнения' })
	@IsEmail({}, { message: 'Неверно указан email' })
	email: string;

	@IsNotEmpty({ message: 'Поле пароль обязательно для заполнения' })
	@IsString({ message: 'укажите пароль' })
	password: string;
}
