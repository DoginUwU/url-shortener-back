import { IUserRepository } from '@/modules/user/repositories/IUserRepository';
import { IShortenerProvider } from '@/shared/containers/providers/ShortenerProvider/models/IShortenerProvider';
import { HttpException } from '@/shared/errors/httpException';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
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
    ) {}

    async execute(data: IRequestCreateShortenerDTO): Promise<Shortener> {
        const { userId } = data;

        if (userId) {
            const userExists = await this.userRepository.findById(userId);

            if (!userExists) {
                throw new HttpException('Usuário não encontrado.', 404);
            }
        }

        const shortId = this.shortenerProvider.create();

        const lifeTime = new Date();
        lifeTime.setDate(lifeTime.getDate() + 10);

        const shortener = await this.shortenerRepository.create({
            ...data,
            lifeTime,
            shortId,
        });

        return plainToInstance(Shortener, shortener);
    }
}

export { CreateShortenerService };
