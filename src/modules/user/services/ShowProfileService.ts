import { IHashProvider } from '@/shared/containers/providers/HashProvider/models/IHashProvider';
import { HttpException } from '@/shared/errors/httpException';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
class ShowProfileService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
    ) {}

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new HttpException('Usuário não encontrado.', 404);
        }

        return plainToInstance(User, user);
    }
}

export { ShowProfileService };
