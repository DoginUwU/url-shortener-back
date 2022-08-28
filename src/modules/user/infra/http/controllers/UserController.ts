import { ICreateUserDTO } from '@/modules/user/dtos/ICreateUserDTO';
import { CreateUserService } from '@/modules/user/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserController {
    async create(request: Request, response: Response): Promise<Response> {
        const data = request.body as ICreateUserDTO;

        const createUserService = container.resolve(CreateUserService);

        const user = await createUserService.execute(data);

        return response.status(201).json(user);
    }
}

export { UserController };
