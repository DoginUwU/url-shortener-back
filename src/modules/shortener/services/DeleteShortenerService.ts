import { HttpException } from '@/shared/errors/httpException';
import { inject, injectable } from 'tsyringe';
import { IShortenerRepository } from '../repositories/IShortenerRepository';

@injectable()
class DeleteShortenerService {
    constructor(
        @inject('ShortenerRepository')
        private shortenerRepository: IShortenerRepository,
    ) {}

    async execute(shortId: string): Promise<void> {
        const shortenerExists = await this.shortenerRepository.findByShortId(shortId);

        if (!shortenerExists) {
            throw new HttpException('Encurtador não encontrado.', 404);
        }

        await this.shortenerRepository.delete(shortId);
    }
}

export { DeleteShortenerService };
