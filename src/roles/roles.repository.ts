import { RoleModel } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { Role } from './interfaces/roles.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async createRole(data: Role): Promise<RoleModel> {
		return await this.prismaService.roleModel.create({ data });
	}

	async getRoleByValue(value: string): Promise<RoleModel> {
		return await this.prismaService.roleModel.findUnique({ where: { value } });
	}

	async getRoleById(id: number): Promise<RoleModel> {
		return await this.prismaService.roleModel.findUnique({ where: { id } });
	}

	async getAllRoles(): Promise<RoleModel[]> {
		return await this.prismaService.roleModel.findMany();
	}

	async updateRole(id: number, data: UpdateRoleDto): Promise<RoleModel> {
		return await this.prismaService.roleModel.update({ data, where: { id } });
	}

	async removeRole(id: number): Promise<RoleModel> {
		return await this.prismaService.roleModel.delete({ where: { id } });
	}
}
