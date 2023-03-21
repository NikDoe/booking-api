import { injectable } from 'inversify';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UsersService implements IUsersService {
	async createUser(dto: RegisterDTO): Promise<User | null> {
		const { username, email, password } = dto;
		const newUser = new User(username, email);
		await newUser.setPassword(password);
		return null;
	}

	async validateUser(dto: LoginDTO): Promise<boolean> {
		return true;
	}
}
