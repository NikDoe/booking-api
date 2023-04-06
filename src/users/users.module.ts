import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/database/prisma.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [PrismaModule, RolesModule, forwardRef(() => AuthModule)],
	controllers: [UsersController],
	providers: [UsersService, UsersRepository],
	exports: [UsersService, UsersRepository],
})
export class UsersModule {}
