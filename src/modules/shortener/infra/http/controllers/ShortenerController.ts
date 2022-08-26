import { IRequestCreateShortenerDTO } from '@/modules/shortener/dtos/ICreateShortenerDTO';
import { CreateShortenerService } from '@/modules/shortener/services/CreateShortenerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ShortenerController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as IRequestCreateShortenerDTO;

        const createShortener = container.resolve(CreateShortenerService);

        const shortener = await createShortener.execute(data);

        return response.json(shortener);
    }

    public async createPrivate(request: Request, response: Response): Promise<Response> {
        const data = request.body as IRequestCreateShortenerDTO;
        const { id: userId } = request.user;

        const createShortener = container.resolve(CreateShortenerService);

        const shortener = await createShortener.execute({
            ...data,
            userId,
        });

        return response.json(shortener);
    }
}

export { ShortenerController };
