import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { Cookies } from './cookies.decorator';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
		const token = await this.authService.login(loginDto);

		res.cookie(process.env.COOKIES_KEY, await this.authService.generateRefreshToken(loginDto), {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.json({ message: 'вы вошли в систему', token });
	}

	@Post('registration')
	async registration(@Body() creatUserdto: CreateUserDto, @Res() res: Response): Promise<void> {
		const newUser = await this.usersService.createUser(creatUserdto);
		res.json({ message: 'регистрация прошла успешно', data: newUser });
	}

	@Get('refresh')
	async refresh(
		@Cookies(process.env.COOKIES_KEY) token: string,
		@Res() res: Response,
	): Promise<void> {
		const newToken = await this.authService.refresh(token);
		res.json({ token: newToken });
	}

	@Post('logout')
	async logout(
		@Cookies(process.env.COOKIES_KEY) token: string,
		@Res() res: Response,
	): Promise<void> {
		if (!token) res.sendStatus(HttpStatus.NO_CONTENT);
		res.clearCookie(process.env.COOKIES_KEY, { httpOnly: true, secure: true, sameSite: 'none' });
		res.json({ message: 'вы вышли из системы' });
	}
}
