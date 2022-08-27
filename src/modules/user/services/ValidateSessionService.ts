import { jwt } from '@/config/auth';
import { HttpException } from '@/shared/errors/httpException';
import { plainToInstance } from 'class-transformer';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class ValidateSessionService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(token: string): Promise<IResponse> {
        const { secret } = jwt;

        try {
            const { subject: id } = verify(token, secret) as { subject: string; expiresIn: string };

            const user = await this.userRepository.findById(id);

            if (!user) {
                throw new HttpException('Usuário não encontrado', 401);
            }

            return {
                user: plainToInstance(User, user),
                token,
            };
        } catch (error) {
            throw new HttpException('Token invalido.', 401);
        }
    }
}

export { ValidateSessionService };
