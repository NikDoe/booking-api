import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const PORT = process.env.PORT || 9999;
	const app = await NestFactory.create(AppModule);
	await app.listen(PORT, () => console.log(`сервер запущен на порту ${PORT}`));
}

bootstrap();
