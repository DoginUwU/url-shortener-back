import { container } from 'tsyringe';

import { IPAddressRepository } from '@/modules/shortener/infra/repositories/IPAddressRepository';
import { ShortenerRepository } from '@/modules/shortener/infra/repositories/ShortenerRepository';
import { IIPAddressRepository } from '@/modules/shortener/repositories/IIPAddressRepository';
import { IShortenerRepository } from '@/modules/shortener/repositories/IShortenerRepository';
import { UserRepository } from '@/modules/user/infra/repositories/UserRepository';
import { IUserRepository } from '@/modules/user/repositories/IUserRepository';

import './providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IShortenerRepository>('ShortenerRepository', ShortenerRepository);
container.registerSingleton<IIPAddressRepository>('IPAddressRepository', IPAddressRepository);
