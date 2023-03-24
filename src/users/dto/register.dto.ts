import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
	@IsNotEmpty({ message: 'Поле username обязательно для заполнения' })
	username: string;

	@IsNotEmpty({ message: 'Поле username обязательно для заполнения' })
	@IsEmail({}, { message: 'невалидный email' })
	email: string;

	@IsString({ message: 'укажите пароль' })
	password: string;
}
