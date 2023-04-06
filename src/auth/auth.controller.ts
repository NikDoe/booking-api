import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usersService: UsersService,
	) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
		const token = await this.authService.login(loginDto);
		res.json({ message: 'вы вошли в систему', token });
	}

	@Post('registration')
	async registration(@Body() creatUserdto: CreateUserDto, @Res() res: Response): Promise<void> {
		const newUser = await this.usersService.createUser(creatUserdto);
		res.json({ message: 'регистрация прошла успешно', data: newUser });
	}
}
