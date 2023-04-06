import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
				context.getHandler(),
				context.getClass(),
			]);
			if (!requiredRoles) {
				return true;
			}
			const request = context.switchToHttp().getRequest();
			const token = this.extractTokenFromHeader(request);

			if (!token) {
				throw new UnauthorizedException('Вы не авторизованы');
			}

			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET_KEY,
			});

			request['user'] = payload;

			const { user } = context.switchToHttp().getRequest();

			const allowed = await user.roles.some((role) => requiredRoles.includes(role.value));
			if (!allowed) {
				throw new ForbiddenException('Нет доступа');
			}

			return allowed;
		} catch (error) {
			throw new HttpException(
				{
					error: error.status ? error.message : 'Вы не авторизованы',
					status: error.status ? error.status : 401,
				},
				error.status ? error.status : 401,
			);
		}
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	}
}
