import { HttpException } from '@/shared/errors/httpException';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { IFindShortenerByShortIDDTO } from '../dtos/IFindShortenerDTO';
import { Shortener } from '../entities/Shortener';
import { IIPAddressRepository } from '../repositories/IIPAddressRepository';
import { IShortenerRepository } from '../repositories/IShortenerRepository';

@injectable()
class FindShortenerByShortIdService {
    constructor(
        @inject('ShortenerRepository')
        private shortenerRepository: IShortenerRepository,
        @inject('IPAddressRepository')
        private ipAddressRepository: IIPAddressRepository,
    ) {}

    async execute({ shortId, address }: IFindShortenerByShortIDDTO): Promise<Shortener> {
        const shortener = await this.shortenerRepository.findByShortId(shortId);

        if (!shortener) {
            throw new HttpException('Encurtador não encontrado.', 404);
        }

        if (shortener.limit) {
            if (shortener.clicks >= shortener.limit) {
                throw new HttpException('Limite atingido.', 403);
            }
        }

        const date = new Date();

        if (shortener.lifeTime < date) {
            throw new HttpException('Link expirado.', 403);
        }

        const ipAddresses = await this.ipAddressRepository.findByShortId(shortId);

        let alreadyOpenThisURL = false;

        ipAddresses.forEach((ipAddress) => {
            if (ipAddress.address === address) {
                alreadyOpenThisURL = true;
            }
        });

        if (!alreadyOpenThisURL) {
            await this.ipAddressRepository.create({ shortId, address });
        }

        const updatedShortener = await this.shortenerRepository.update(shortId, {
            ...shortener,
            clicks: alreadyOpenThisURL ? shortener.clicks : shortener.clicks + 1,
        });

        return plainToInstance(Shortener, updatedShortener);
    }
}

export { FindShortenerByShortIdService };
