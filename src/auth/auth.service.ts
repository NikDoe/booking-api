import {
	BadRequestException,
	ForbiddenException,
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { UserWithRoles } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersRepository: UsersRepository,
	) {}

	async login(loginDto: LoginDto): Promise<string> {
		try {
			const user = await this.validateUser(loginDto);

			return await this.generateAccessToken(user);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	async refresh(token: string): Promise<string> {
		try {
			if (!token) throw new UnauthorizedException('Вы не авторизованы');

			const { email } = await this.jwtService
				.verifyAsync<{ email: string }>(token, { secret: process.env.REFRESHTOKEN_SECRET_KEY })
				.catch((error) => {
					throw new ForbiddenException(error.message);
				});

			const existedUser = await this.usersRepository.getUserByEmail(email);
			if (!existedUser) throw new UnauthorizedException('Пользователь не найден');

			return await this.generateAccessToken(existedUser);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	private async JwtSign(payload: object, secret: string, expiresIn: string): Promise<string> {
		const options: JwtSignOptions = {
			secret,
			expiresIn,
		};
		return this.jwtService.sign(payload, options);
	}

	private async generateAccessToken(user: UserWithRoles): Promise<string> {
		const payload = {
			id: user.id,
			username: user.username,
			avatar: user.avatar,
			email: user.email,
			roles: user.roles,
		};
		return await this.JwtSign(payload, process.env.ACCESSTOKEN_SECRET_KEY, '30m');
	}

	async generateRefreshToken(user: LoginDto): Promise<string> {
		const payload = { email: user.email };
		return await this.JwtSign(payload, process.env.REFRESHTOKEN_SECRET_KEY, '7d');
	}

	private async validateUser(loginDto: LoginDto): Promise<UserWithRoles> {
		const existedUser = await this.usersRepository.getUserByEmail(loginDto.email);

		const match = existedUser
			? await bcrypt.compare(loginDto.password, existedUser.password)
			: false;

		if (existedUser && match) return existedUser;

		throw new BadRequestException('неверный email или пароль');
	}
}
