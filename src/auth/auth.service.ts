import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { UserWithRoles } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly usersRepository: UsersRepository,
	) {}

	async login(loginDto: LoginDto): Promise<any> {
		try {
			const user = await this.validateUser(loginDto);

			return await this.generateToken(user);
		} catch (error) {
			throw new HttpException({ error: error.message, status: error.status }, error.status);
		}
	}

	private async generateToken(user: UserWithRoles): Promise<string> {
		const payload = { id: user.id, username: user.username, email: user.email, roles: user.roles };
		return this.jwtService.sign(payload);
	}

	private async validateUser(loginDto: LoginDto): Promise<any> {
		const existedUser = await this.usersRepository.getUserByEmail(loginDto.email);

		const match = existedUser
			? await bcrypt.compare(loginDto.password, existedUser.password)
			: false;

		if (existedUser && match) return existedUser;

		throw new BadRequestException('неверный email или пароль');
	}
}
