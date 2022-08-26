import { IHashProvider } from '@/shared/containers/providers/HashProvider/models/IHashProvider';
import { HttpException } from '@/shared/errors/httpException';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    async execute({ username, email, password }: ICreateUserDTO): Promise<User> {
        const usernameExists = await this.userRepository.findByUsername(username);

        if (usernameExists) {
            throw new HttpException('Nome de usuário já existe', 400);
        }

        const emailExists = await this.userRepository.findByEmail(email);

        if (emailExists) {
            throw new HttpException('Email já existe', 400);
        }

        const hashedPassword = await this.hashProvider.ecrypt(password);

        const user = await this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        return plainToInstance(User, user);
    }
}

export { CreateUserService };
