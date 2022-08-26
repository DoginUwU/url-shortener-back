import { prismaClient } from '../../../../config/db';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

class UserRepository implements IUserRepository {
    async create(data: ICreateUserDTO): Promise<User> {
        const user = await prismaClient.user.create({
            data,
        });

        return user;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await prismaClient.user.findUnique({
            where: {
                username,
            },
        });

        return user;
    }
}

export { UserRepository };
