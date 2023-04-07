import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Module({
	imports: [PrismaModule],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ValidationPipe,
		},
		RolesService,
		RolesRepository,
	],
	controllers: [RolesController],
	exports: [RolesRepository],
})
export class RolesModule {}
