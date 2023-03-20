import { hash } from 'bcryptjs';

export class User {
	private _password: string;

	constructor(private readonly _username: string, private readonly _email: string) {}

	get username(): string {
		return this._username;
	}

	get email(): string {
		return this._email;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(password: string): Promise<void> {
		this._password = await hash(password, 10);
	}
}
