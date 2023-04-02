import { INestApplication, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService extends PrismaClient implements OnModuleInit {
	private readonly logger = new Logger(PrismaService.name);

	async onModuleInit(): Promise<void> {
		try {
			await this.$connect();
			this.logger.log('База данных подключена успешно');
		} catch (error) {
			if (error instanceof Error)
				this.logger.error(`Ошибка подключения к базе данных ${error.message}`);
		}
	}

	async enableShutdownHooks(app: INestApplication): Promise<void> {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
