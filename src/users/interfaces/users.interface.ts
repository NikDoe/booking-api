import { RoleModel, UserModel } from '@prisma/client';

export interface User {
	username: string;
	email: string;
	password: string;
}

export interface UserWithRoles extends UserModel {
	roles: RoleModel[];
}

export type UserWithoutPassword = Omit<UserWithRoles, 'password'>;
