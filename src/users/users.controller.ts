import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	async getAllUsers(@Res() res: Response): Promise<void> {
		const users = await this.usersService.findAllUsers();
		res.json({ message: 'показать всех пользователей', data: users });
	}

	@Get(':id')
	async getOneUser(@Res() res: Response, @Param('id') id: string): Promise<void> {
		res.json({ message: `пользователь ${id}` });
	}

	@Post()
	async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
		const newUser = await this.usersService.create(createUserDto);
		res.json({ message: 'новый пользователь успешно создан', data: newUser });
	}

	@Put(':id')
	async updateUser(
		@Res() res: Response,
		@Param('id') id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<void> {
		res.json({ message: `пользователь ${id} успешно обновлён`, data: updateUserDto });
	}

	@Delete(':id')
	async removeUser(@Res() res: Response, @Param('id') id: string): Promise<void> {
		res.send({ message: `пользователь ${id} успешно удалён` });
	}
}
