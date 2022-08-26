import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthenticateUserService } from '@/modules/user/services/AuthenticateUserService';

class SessionController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const userAndToken = await authenticateUser.execute({
            email,
            password,
        });

        return response.json(userAndToken);
    }
}

export { SessionController };
