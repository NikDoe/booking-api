import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new HttpException(
				{ error: 'Вы не авторизованы', status: HttpStatus.UNAUTHORIZED },
				HttpStatus.UNAUTHORIZED,
			);
		}

		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET_KEY,
			});

			request['user'] = payload;
		} catch {
			throw new HttpException(
				{ error: 'Вы не авторизованы', status: HttpStatus.UNAUTHORIZED },
				HttpStatus.UNAUTHORIZED,
			);
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
