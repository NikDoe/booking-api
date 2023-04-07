import { IsNotEmpty, Matches } from 'class-validator';

export class CreateRoleDto {
	@Matches(/^([^0-9]*)$/, { message: 'роль не должна содержать цифры' })
	@IsNotEmpty({ message: 'имя роли не должно быть пустым' })
	value: string;

	@IsNotEmpty({ message: 'описание роли не должно быть пустым' })
	description: string;
}
