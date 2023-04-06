import { RoleModel } from '@prisma/client';

export interface User {
	username: string;
	email: string;
	password: string;
}

export interface UserWithRoles extends User {
	id: number;
	roles: RoleModel[];
}
