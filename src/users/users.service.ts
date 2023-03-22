import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.inteface';
import { TYPES } from '../types';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './user.entity';
import { IUsersService } from './users.service.interface';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.IconfigService) private configService: IConfigService) {}

	async createUser(dto: RegisterDTO): Promise<User | null> {
		const { username, email, password } = dto;
		const newUser = new User(username, email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return null;
	}

	async validateUser(dto: LoginDTO): Promise<boolean> {
		return true;
	}
}
