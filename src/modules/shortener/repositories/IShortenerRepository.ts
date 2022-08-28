import { ICreateShortenerDTO } from '../dtos/ICreateShortenerDTO';
import { IUpdateShortenerDTO } from '../dtos/IUpdateShortenerDTO';
import { Shortener } from '../entities/Shortener';

interface IShortenerRepository {
    create(data: ICreateShortenerDTO): Promise<Shortener>;
    findByShortId(shortId: string): Promise<Shortener | null>;
    findByUserId(userId: string): Promise<Shortener[]>;
    update(shortId: string, data: IUpdateShortenerDTO): Promise<Shortener>;
    delete(shortId: string): Promise<void>;
}

export { IShortenerRepository };
