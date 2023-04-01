import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
	async create(user: User): Promise<User> {
		return user;
	}

	async findAllUsers(): Promise<User[]> {
		return [
			{ username: 'NikDoe', email: 'nikdoe@email.ru', password: '12345' },
			{ username: 'Modestal', email: 'modestal@email.ru', password: '12345' },
		];
	}
}
