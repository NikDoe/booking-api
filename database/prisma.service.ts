import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../src/logger/logger.interface';
import { TYPES } from '../src/types';

@injectable()
export class PrismaService {
	public client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private prismaLogger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.prismaLogger.log('[PrismaService] База данных подключена успешно');
		} catch (error) {
			if (error instanceof Error) {
				this.prismaLogger.error(
					`[PrismaService] Ошибка подключения к базе данных ${error.message}`,
				);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
