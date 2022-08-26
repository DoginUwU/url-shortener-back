import { prismaClient } from '@/config/db';
import { ICreateShortenerDTO } from '../../dtos/ICreateShortenerDTO';
import { Shortener } from '../../entities/Shortener';
import { IShortenerRepository } from '../../repositories/IShortenerRepository';

class ShortenerRepository implements IShortenerRepository {
    async create(data: ICreateShortenerDTO): Promise<Shortener> {
        const shortener = await prismaClient.shortener.create({
            data,
        });

        return shortener;
    }
}

export { ShortenerRepository };
