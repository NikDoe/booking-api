import { ConflictException, HttpException, NotFoundException, Injectable } from '@nestjs/common';
import { User, UserWithoutPassword } from './interfaces/users.interface';
import { UsersRepository } from './users.repository';
import { RolesRepository } from 'src/roles/roles.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

			if (duplicate) {
				throw new ConflictException('поользователь с таким email уже существует');
			}

			const hashPassword = await bcrypt.hash(user.password, 10);

			return await this.usersRepository.createUser({ ...user, password: hashPassword, roleId });
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
		try {
			const existedUser = await this.usersRepository.getUserById(userId);

			if (!existedUser) throw new NotFoundException('пользователь не найден');

			const updatedUser = { ...updateUserDto };

			if (updateUserDto.email) {
				const duplicate = await this.usersRepository.getUserByEmail(updateUserDto.email);

				if (duplicate) {
					throw new ConflictException('поользователь с таким email уже существует');
				}

				updatedUser.email = updateUserDto.email;
			}

			if (updateUserDto.password) {
				const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
				updatedUser.password = hashPassword;
			}

			if (!updateUserDto.roleValue) {
				return await this.usersRepository.updateUser(existedUser.id, updatedUser);
			}

			const role = await this.rolesRepository.getRoleByValue(updateUserDto.roleValue);

			if (!role) throw new NotFoundException('роль не найдена');

			return await this.usersRepository.updateUser(existedUser.id, updatedUser, role.id);
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

	async getAllUsers(): Promise<UserWithoutPassword[]> {
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
