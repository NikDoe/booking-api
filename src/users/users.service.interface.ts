import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './user.entity';

export interface IUsersService {
	createUser: (dto: RegisterDTO) => Promise<User | null>;
	validateUser: (dto: LoginDTO) => Promise<boolean>;
}
