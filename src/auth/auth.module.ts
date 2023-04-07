import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Module({
	imports: [
		forwardRef(() => UsersModule),
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		JwtModule.register({
			secret: process.env.JWT_SECRET_KEY,
			signOptions: { expiresIn: '24h' },
		}),
	],
	controllers: [AuthController],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		AuthService,
	],
	exports: [JwtModule],
})
export class AuthModule {}
