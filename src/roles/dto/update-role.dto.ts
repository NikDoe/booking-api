import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateRoleDto {
	@Matches(/^([^0-9]*)$/, { message: 'роль не должна содержать цифры' })
	@IsNotEmpty({ message: 'имя роли не должно быть пустым' })
	@IsOptional()
	value?: string;

	@IsNotEmpty({ message: 'описание роли не должно быть пустым' })
	@IsOptional()
	description?: string;
}
