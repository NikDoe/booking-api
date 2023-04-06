import { Injectable } from '@nestjs/common';
import { User } from 'src/users/interfaces/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async registatration(user: User): Promise<User> {
		return await this.usersService.createUser(user);
	}
}
