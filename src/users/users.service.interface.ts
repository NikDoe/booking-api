import { UserModel } from '@prisma/client';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

export interface ISignJWT {
	accessToken?: string;
	refreshToken?: string;
	error?: string;
}

export interface IUsersService {
	createUser: (dto: RegisterDTO) => Promise<UserModel | null>;
	handleUserLogin: (dto: LoginDTO) => Promise<ISignJWT>;
	getAllUsers: () => Promise<UserModel[]>;
}
