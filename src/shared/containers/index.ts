import { ShortenerRepository } from '@/modules/shortener/infra/repositories/ShortenerRepository';
import { IShortenerRepository } from '@/modules/shortener/repositories/IShortenerRepository';
import { UserRepository } from '@/modules/user/infra/repositories/UserRepository';
import { IUserRepository } from '@/modules/user/repositories/IUserRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IShortenerRepository>('ShortenerRepository', ShortenerRepository);
