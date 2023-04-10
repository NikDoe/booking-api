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
import { Role } from 'src/types/enums';
import { RoleModel } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector, private readonly jwtService: JwtService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
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
				secret: process.env.ACCESSTOKEN_SECRET_KEY,
			});

			request['user'] = payload;

			const { user } = context.switchToHttp().getRequest();

			const allowed = requiredRoles.some((role) =>
				user.roles.map((userRole: RoleModel) => userRole.value).includes(role),
			);
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
