import { prismaClient } from '@/config/db';
import { ICreateShortenerDTO } from '../../dtos/ICreateShortenerDTO';
import { IUpdateShortenerDTO } from '../../dtos/IUpdateShortenerDTO';
import { Shortener } from '../../entities/Shortener';
import { IShortenerRepository } from '../../repositories/IShortenerRepository';

class ShortenerRepository implements IShortenerRepository {
    async create(data: ICreateShortenerDTO): Promise<Shortener> {
        const shortener = await prismaClient.shortener.create({
            data,
        });

        return shortener;
    }

    async update(shortId: string, data: IUpdateShortenerDTO): Promise<Shortener> {
        const shortener = await prismaClient.shortener.update({
            where: {
                shortId,
            },
            data,
        });

        return shortener;
    }

    async findByShortId(shortId: string): Promise<Shortener | null> {
        const shortener = await prismaClient.shortener.findUnique({
            where: {
                shortId,
            },
        });

        return shortener;
    }

    async findByUserId(userId: string): Promise<Shortener[]> {
        const shorteners = await prismaClient.shortener.findMany({
            where: {
                userId,
            },
        });

        return shorteners;
    }
}

export { ShortenerRepository };
