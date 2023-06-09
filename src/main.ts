import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
	const PORT = process.env.PORT || 9999;
	const app = await NestFactory.create(AppModule);
	app.enableCors({ origin: ['http://localhost:5173'], credentials: true });
	app.use(cookieParser());
	await app.listen(PORT);
}

bootstrap();
