import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.inteface';
import { TYPES } from '../types';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { ISignJWT, IUsersService } from './users.service.interface';
import { sign } from 'jsonwebtoken';

@injectable()
export class UsersService implements IUsersService {
	constructor(
		@inject(TYPES.IconfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser(dto: RegisterDTO): Promise<UserModel | null> {
		const { username, email, password } = dto;
		const newUser = new User(username, email);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async handleUserLogin(dto: LoginDTO): Promise<ISignJWT | null> {
		const { email, password } = dto;
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) return null;

		const user = new User(existedUser.username, existedUser.email, existedUser.password);
		const isMatch = user.comparePassword(password);
		if (!isMatch) return null;

		const accessToken = sign(
			{
				id: existedUser.id,
				username: existedUser.username,
				email: existedUser.email,
			},
			this.configService.get('ACCESS_SECRET_TOKEN'),
			{ expiresIn: '15m' },
		);

		const refreshToken = sign(
			{ email: existedUser.email },
			this.configService.get('REFRESH_SECRET_TOKEN'),
			{
				expiresIn: '7d',
			},
		);

		return { accessToken, refreshToken };
	}
}
