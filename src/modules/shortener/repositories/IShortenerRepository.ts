import { ICreateShortenerDTO } from '../dtos/ICreateShortenerDTO';
import { Shortener } from '../entities/Shortener';

interface IShortenerRepository {
    create(data: ICreateShortenerDTO): Promise<Shortener>;
}

export { IShortenerRepository };
