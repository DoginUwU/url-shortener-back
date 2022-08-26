import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ShowProfileService } from '@/modules/user/services/ShowProfileService';

class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute(id);

        return response.json(user);
    }
}

export { ProfileController };
