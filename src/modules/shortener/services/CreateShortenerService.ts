import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';

import { IUserRepository } from '@/modules/user/repositories/IUserRepository';
import { IHashProvider } from '@/shared/containers/providers/HashProvider/models/IHashProvider';
import { IShortenerProvider } from '@/shared/containers/providers/ShortenerProvider/models/IShortenerProvider';
import { HttpException } from '@/shared/errors/httpException';
import { IRequestCreateShortenerDTO } from '../dtos/ICreateShortenerDTO';
import { Shortener } from '../entities/Shortener';
import { IShortenerRepository } from '../repositories/IShortenerRepository';

@injectable()
class CreateShortenerService {
    constructor(
        @inject('ShortenerRepository')
        private shortenerRepository: IShortenerRepository,
        @inject('ShortenerProvider')
        private shortenerProvider: IShortenerProvider,
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute(data: IRequestCreateShortenerDTO): Promise<Shortener> {
        const { userId, lifeTime } = data;
        let { password } = data;

        if (userId) {
            const userExists = await this.userRepository.findById(userId);

            if (!userExists) {
                throw new HttpException('Usuário não encontrado.', 404);
            }
        }

        if (password) {
            password = await this.hashProvider.ecrypt(password);
        }

        if (new Date(lifeTime) < new Date()) {
            throw new HttpException('Data de expiração inválida.', 400);
        }

        const shortId = this.shortenerProvider.create();

        const shortener = await this.shortenerRepository.create({
            ...data,
            shortId,
            password,
        });

        return plainToInstance(Shortener, shortener);
    }
}

export { CreateShortenerService };
