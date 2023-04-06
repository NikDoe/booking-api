import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Res() res: Response): Promise<void> {
		res.json({ message: 'вы вошли в систему' });
	}

	@Post('registration')
	async registration(@Body() creatUserdto: CreateUserDto, @Res() res: Response): Promise<void> {
		const newUser = await this.authService.registatration(creatUserdto);
		res.json({ message: 'регистрация прошла успешно', data: newUser });
	}
}
