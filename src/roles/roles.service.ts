import {
	BadRequestException,
	ConflictException,
	HttpException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { Role } from './interfaces/roles.interface';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
	constructor(private readonly rolesRepository: RolesRepository) {}

	async createRole(role: Role): Promise<Role> {
		try {
			const duplicate = await this.rolesRepository.getRoleByValue(role.value);

			if (duplicate) {
				throw new ConflictException('роль с таким значением уже существует');
			}

			if (!role.value || !role.description) throw new BadRequestException('заполните все поля');

			const roleTransform = { value: role.value.toLowerCase(), description: role.description };

			return await this.rolesRepository.createRole(roleTransform);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	async getRoleByValue(value: string): Promise<Role> {
		const valueTransform = value.toLowerCase();
		return await this.rolesRepository.getRoleByValue(valueTransform);
	}

	async getAllRoles(): Promise<Role[]> {
		return await this.rolesRepository.getAllRoles();
	}

	async updateRole(id: number, udpatedRole: UpdateRoleDto): Promise<Role> {
		try {
			const existedRole = await this.rolesRepository.getRoleById(id);

			if (!existedRole) throw new NotFoundException('роль не найдена');

			return await this.rolesRepository.updateRole(id, udpatedRole);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	async removeRole(id: number): Promise<Role> {
		try {
			const existedRole = await this.rolesRepository.getRoleById(id);

			if (!existedRole) throw new NotFoundException('роль не найдена');

			return await this.rolesRepository.removeRole(id);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}
}
