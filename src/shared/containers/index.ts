import { UserRepository } from '@/modules/user/infra/repositories/UserRepository';
import { IUserRepository } from '@/modules/user/repositories/IUserRepository';
import { container } from 'tsyringe';

import './providers'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
