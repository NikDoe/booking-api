import { UserModel } from '@prisma/client';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

export interface IUsersService {
	createUser: (dto: RegisterDTO) => Promise<UserModel | null>;
	validateUser: (dto: LoginDTO) => Promise<boolean>;
}
