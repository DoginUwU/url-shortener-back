import { sign } from 'jsonwebtoken';
import { jwt } from '@/config/auth';
import { IHashProvider } from '@/shared/containers/providers/HashProvider/models/IHashProvider';
import { HttpException } from '@/shared/errors/httpException';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new HttpException('Usuário não encontrado', 401);
        }

        const passwordMatch = await this.hashProvider.validate(password, user.password);

        if (!passwordMatch) {
            throw new HttpException('Usuário não encontrado', 401);
        }

        const { secret, expiresIn } = jwt;

        const token = sign(
            {
                subject: user.id,
                expiresIn,
            },
            secret,
        );

        return {
            user: plainToInstance(User, user),
            token,
        };
    }
}

export { AuthenticateUserService };
