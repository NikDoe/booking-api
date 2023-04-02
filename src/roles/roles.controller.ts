import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
	constructor(private readonly rolesService: RolesService) {}

	@Get()
	async getAllRoles(@Res() res: Response): Promise<void> {
		const roles = await this.rolesService.getAllRoles();
		res.json({ data: roles });
	}

	@Post()
	async createRole(@Body() createRoleDto: CreateRoleDto, @Res() res: Response): Promise<void> {
		const newRole = await this.rolesService.createRole(createRoleDto);
		res.json({ message: `новая роль ${newRole.value} успешно создана`, data: newRole });
	}

	@Put(':id')
	async updateRole(
		@Body() updateRoleDto: UpdateRoleDto,
		@Param('id') id: string,
		@Res() res: Response,
	): Promise<void> {
		const updatedRole = await this.rolesService.updateRole(Number(id), updateRoleDto);
		res.json({ message: `роль ${updatedRole.value} обновлена`, data: updatedRole });
	}

	@Delete(':id')
	async remodeRole(@Param('id') id: string, @Res() res: Response): Promise<void> {
		const deleted = await this.rolesService.removeRole(Number(id));
		res.send({ message: `роль ${deleted.value} успешно удалена` });
	}
}
