import { IHashProvider } from '@/shared/containers/providers/HashProvider/models/IHashProvider';
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
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute({ shortId, address, password }: IFindShortenerByShortIDDTO): Promise<Shortener> {
        const shortener = await this.shortenerRepository.findByShortId(shortId);

        if (!shortener) {
            throw new HttpException('Encurtador não encontrado.', 404);
        }

        if (shortener.limit) {
            if (shortener.clicks >= shortener.limit) {
                await this.shortenerRepository.delete(shortId);
                throw new HttpException('Limite atingido.', 403);
            }
        }

        const date = new Date();

        if (shortener.lifeTime < date) {
            await this.shortenerRepository.delete(shortId);
            throw new HttpException('Link expirado.', 403);
        }

        if (shortener.password) {
            if (!password) {
                throw new HttpException('Link protegido por senha.', 403);
            }

            const validate = await this.hashProvider.validate(password, shortener.password);

            if (!validate) {
                throw new HttpException('Senha incorreta.', 403);
            }
        }

        const ipAddresses = await this.ipAddressRepository.findByShortId(shortId);

        let alreadyOpenThisURL = false;

        ipAddresses.forEach((ipAddress) => {
            if (ipAddress.address === address) {
                alreadyOpenThisURL = true;
            }
        });

        if (!alreadyOpenThisURL && address) {
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
