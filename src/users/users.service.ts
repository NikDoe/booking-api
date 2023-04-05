import {
	BadRequestException,
	ConflictException,
	HttpException,
	NotFoundException,
	Injectable,
} from '@nestjs/common';
import { User } from './interfaces/users.interface';
import { UsersRepository } from './users.repository';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesRepository } from 'src/roles/roles.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleModel } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly rolesRepository: RolesRepository,
	) {}

	async createUser(user: User): Promise<User> {
		try {
			const { email } = user;
			const duplicate = await this.usersRepository.getUserByEmail(email);
			const { id: roleId } = await this.rolesRepository.getRoleByValue('user');

			if (!user.username || !user.email || !user.password)
				throw new BadRequestException('заполните все поля');

			if (duplicate) {
				throw new ConflictException('поользователь с таким email уже существует');
			}

			const newUser = { ...user, roleId };

			return await this.usersRepository.createUser(newUser);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
		try {
			const existedUser = await this.usersRepository.getUserById(userId);

			if (!existedUser) throw new NotFoundException('пользователь не найден');

			if (!updateUserDto.roleValue)
				return await this.usersRepository.updateUser(existedUser.id, updateUserDto);

			const role = await this.rolesRepository.getRoleByValue(updateUserDto.roleValue);

			if (!role) throw new NotFoundException('роль не найдена');

			return await this.usersRepository.updateUser(existedUser.id, updateUserDto, role.id);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	async getUserById(id: number): Promise<User> {
		try {
			const user = await this.usersRepository.getUserById(id);
			if (!user) throw new NotFoundException('пользователь не найден');
			return user;
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	async getAllUsers(): Promise<User[]> {
		return await this.usersRepository.getAllUsers();
	}

	async removeUser(userId: number): Promise<User> {
		try {
			const existedUser = await this.usersRepository.getUserById(userId);

			if (!existedUser) throw new NotFoundException('пользователь не найден');

			return await this.usersRepository.removeUser(userId);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}
}
