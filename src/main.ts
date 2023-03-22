import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerSevice } from './logger/logger.service';
import { TYPES } from './types';
import { IUsersController } from './users/users.controller.interface';
import { UsersController } from './users/users.controller';
import { IUsersService } from './users/users.service.interface';
import { UsersService } from './users/users.service';
import { IConfigService } from './config/config.service.inteface';
import { ConfigService } from './config/config.service';
import { PrismaService } from '../database/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersRepository } from './users/users.repository';

interface BootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<IConfigService>(TYPES.IconfigService).to(ConfigService).inSingletonScope();
	bind<ILogger>(TYPES.ILogger).to(LoggerSevice).inSingletonScope();
	bind<IUsersController>(TYPES.IUsersController).to(UsersController);
	bind<IUsersService>(TYPES.IUsersService).to(UsersService);
	bind<IExeptionFilter>(TYPES.IExeptionFilter).to(ExeptionFilter);
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
});

const bootstrap = (): BootstrapReturn => {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
};

export const { appContainer, app } = bootstrap();
