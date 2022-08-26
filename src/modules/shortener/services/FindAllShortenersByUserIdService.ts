import { IUserRepository } from '@/modules/user/repositories/IUserRepository';
import { HttpException } from '@/shared/errors/httpException';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { Shortener } from '../entities/Shortener';
import { IShortenerRepository } from '../repositories/IShortenerRepository';

@injectable()
class FindAllShortenersByUserIdService {
    constructor(
        @inject('ShortenerRepository')
        private shortenerRepository: IShortenerRepository,
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(userId: string): Promise<Shortener[]> {
        const userExists = await this.userRepository.findById(userId);

        if (!userExists) {
            throw new HttpException('Usuário não encontrado.', 404);
        }

        const shortenes = await this.shortenerRepository.findByUserId(userId);

        return plainToInstance(Shortener, shortenes);
    }
}

export { FindAllShortenersByUserIdService };
