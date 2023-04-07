import { Matches, IsNotEmpty, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
	@Matches(/^([^0-9]*)$/, { message: 'имя не должно содержать цифры' })
	@MaxLength(20, { message: 'максимальная длинна имени 20 символов' })
	@MinLength(2, { message: 'имя не должно быть кароче 2 символов' })
	@IsNotEmpty({ message: 'имя пользователя обязательно для заполнения' })
	@IsOptional()
	username?: string;

	@IsEmail({}, { message: 'невалидный email' })
	@IsNotEmpty({ message: 'email обязателен для заполнения' })
	@IsOptional()
	email?: string;

	@MinLength(6, { message: 'пароль не должен быть кароче 6 символов' })
	@IsNotEmpty({ message: 'пароль обязателен для заполнения' })
	@IsOptional()
	password?: string;

	@Matches(/^([^0-9]*)$/, { message: 'роль не должна содержать цифры' })
	@IsNotEmpty({ message: 'имя роли не должно быть пустым' })
	@IsOptional()
	roleValue?: string;
}
