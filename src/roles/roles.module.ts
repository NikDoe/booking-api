import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
	imports: [PrismaModule],
	providers: [RolesService, RolesRepository],
	controllers: [RolesController],
	exports: [RolesRepository],
})
export class RolesModule {}
