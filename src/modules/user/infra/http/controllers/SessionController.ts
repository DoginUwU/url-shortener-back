import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { AuthenticateUserService } from '@/modules/user/services/AuthenticateUserService';
import { ValidateSessionService } from '@/modules/user/services/ValidateSessionService';

class SessionController {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticateUser = container.resolve(AuthenticateUserService);

        const userAndToken = await authenticateUser.execute({
            email,
            password,
        });

        return response.status(201).json(userAndToken);
    }

    async validate(request: Request, response: Response): Promise<Response> {
        const { token } = request.body;

        const validateSession = container.resolve(ValidateSessionService);

        const userAndToken = await validateSession.execute(token);

        return response.json(userAndToken);
    }
}

export { SessionController };
