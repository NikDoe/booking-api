import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
	imports: [PrismaModule, RolesModule],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
})
export class UsersModule {}
