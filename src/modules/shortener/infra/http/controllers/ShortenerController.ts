import { IRequestCreateShortenerDTO } from '@/modules/shortener/dtos/ICreateShortenerDTO';
import { CreateShortenerService } from '@/modules/shortener/services/CreateShortenerService';
import { FindAllShortenersByUserIdService } from '@/modules/shortener/services/FindAllShortenersByUserIdService';
import { FindShortenerByShortIdService } from '@/modules/shortener/services/FindShortenerByShortIdService';
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

    public async findAllByUserId(request: Request, response: Response): Promise<Response> {
        const { id: userId } = request.user;

        const findAllShortenerByUserId = container.resolve(FindAllShortenersByUserIdService);

        const shortenes = await findAllShortenerByUserId.execute(userId);

        return response.json(shortenes);
    }

    public async findByShortId(request: Request, response: Response): Promise<Response> {
        const { shortId } = request.params;
        const address = (request.ip || request.headers['x-forwarded-for'] || request.socket.remoteAddress) as string;

        const findShortenerByShortId = container.resolve(FindShortenerByShortIdService);

        const shortener = await findShortenerByShortId.execute({
            shortId,
            address,
        });

        return response.json(shortener);
    }
}

export { ShortenerController };
