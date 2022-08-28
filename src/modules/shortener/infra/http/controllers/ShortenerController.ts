import { Request, Response } from 'express';
import requestIp from 'request-ip';
import { container } from 'tsyringe';

import { IRequestCreateShortenerDTO } from '@/modules/shortener/dtos/ICreateShortenerDTO';
import { CreateShortenerService } from '@/modules/shortener/services/CreateShortenerService';
import { FindAllShortenersByUserIdService } from '@/modules/shortener/services/FindAllShortenersByUserIdService';
import { FindShortenerByShortIdService } from '@/modules/shortener/services/FindShortenerByShortIdService';
import { DeleteShortenerService } from '@/modules/shortener/services/DeleteShortenerService';

class ShortenerController {
    public async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as IRequestCreateShortenerDTO;

        const createShortener = container.resolve(CreateShortenerService);

        const shortener = await createShortener.execute(data);

        return response.status(201).json(shortener);
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
        const password = request.query.password as unknown as string | undefined;
        const { shortId } = request.params;
        const address = requestIp.getClientIp(request);

        const findShortenerByShortId = container.resolve(FindShortenerByShortIdService);

        const shortener = await findShortenerByShortId.execute({
            shortId,
            address,
            password,
        });

        return response.json(shortener);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const { shortId } = request.params;

        const deleteShortener = container.resolve(DeleteShortenerService);

        await deleteShortener.execute(shortId);

        return response.send();
    }
}

export { ShortenerController };
