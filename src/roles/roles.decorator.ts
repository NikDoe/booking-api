import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Role } from './interfaces/roles.interface';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);