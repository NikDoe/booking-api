import { Injectable } from '@nestjs/common';
import { RoleModel, UserModel } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { User, UserWithRoles } from './interfaces/users.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async createUser(data: User & { roleId: number }): Promise<UserModel> {
		const { username, email, password, roleId } = data;

		return await this.prismaService.userModel.create({
			data: {
				username,
				avatar: this.setAvataTitle(username),
				email,
				password,
				roles: {
					connect: [{ id: roleId }],
				},
			},
			include: { roles: true },
		});
	}

	async getUserByEmail(email: string): Promise<UserWithRoles> {
		return await this.prismaService.userModel.findFirst({
			where: { email },
			select: {
				id: true,
				username: true,
				avatar: true,
				email: true,
				password: true,
				roles: true,
			},
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
			data: {
				username,
				...(username && { avatar: this.setAvataTitle(username) }),
				email,
				password,
				...(roleId && {
					roles: (await this.userHasRole(userId, roleId))
						? { disconnect: { id: roleId } }
						: { connect: { id: roleId } },
				}),
			},
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

	private setAvataTitle(name: string): string {
		return name.toUpperCase().slice(0, 2);
	}
}
