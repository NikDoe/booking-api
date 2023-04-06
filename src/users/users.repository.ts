import { Injectable } from '@nestjs/common';
import { UserModel } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { User } from './interfaces/users.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async createUser(data: User & { roleId: number }): Promise<UserModel> {
		const { username, email, password, roleId } = data;

		return await this.prismaService.userModel.create({
			data: {
				username,
				email,
				password,
				roles: {
					connect: [{ id: roleId }],
				},
			},
			include: { roles: true },
		});
	}

	async getUserByEmail(email: string): Promise<UserModel> {
		return await this.prismaService.userModel.findUnique({
			where: { email },
			include: { roles: true },
		});
	}

	async getUserById(id: number): Promise<UserModel> {
		return await this.prismaService.userModel.findUnique({
			where: { id },
			include: { roles: true },
		});
	}

	async getAllUsers(): Promise<UserModel[]> {
		return await this.prismaService.userModel.findMany({ include: { roles: true } });
	}

	async userHasRole(userId: number, roleId: number): Promise<UserModel> {
		return await this.prismaService.userModel.findFirst({
			where: { id: userId, roles: { some: { id: roleId } } },
		});
	}

	async updateUser(userId: number, data: UpdateUserDto, roleId?: number): Promise<UserModel> {
		const { username, email, password } = data;
		return await this.prismaService.userModel.update({
			data: roleId
				? {
						username,
						email,
						password,
						roles: (await this.userHasRole(userId, roleId))
							? { disconnect: { id: roleId } }
							: { connect: { id: roleId } },
				  }
				: { username, email, password },
			where: { id: userId },
			include: { roles: true },
		});
	}

	async removeUser(userId: number): Promise<UserModel> {
		return await this.prismaService.userModel.delete({
			where: { id: userId },
			include: { roles: true },
		});
	}
}
