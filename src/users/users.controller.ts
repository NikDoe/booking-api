import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/types/enums';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Roles(Role.Admin)
	@UseGuards(RolesGuard)
	@Get()
	async getAllUsers(@Res() res: Response): Promise<void> {
		const users = await this.usersService.getAllUsers();
		res.json({ message: 'список пользователей получен', data: users });
	}

	@Get(':id')
	async getOneUser(@Res() res: Response, @Param('id') id: string): Promise<void> {
		const user = await this.usersService.getUserById(Number(id));
		res.json({ message: `пользователь ${id}`, data: user });
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
		const newUser = await this.usersService.createUser(createUserDto);
		res.json({ message: 'новый пользователь успешно создан', data: newUser });
	}

	@Put(':id')
	async updateUser(
		@Res() res: Response,
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<void> {
		const updatedUser = await this.usersService.updateUser(Number(id), updateUserDto);
		res.json({ message: `пользователь ${id} успешно обновлён`, data: updatedUser });
	}

	@Delete(':id')
	async removeUser(@Res() res: Response, @Param('id') id: string): Promise<void> {
		const deletedUser = await this.usersService.removeUser(Number(id));
		res.send({ message: `пользователь ${id} успешно удалён`, data: deletedUser });
	}
}
