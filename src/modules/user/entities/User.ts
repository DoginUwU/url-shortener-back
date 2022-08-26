import { Exclude } from 'class-transformer';

class User {
    id: string;

    username: string;

    email: string;

    @Exclude()
    password: string;

    createdAt: Date;
}

export { User };
