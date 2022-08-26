import { Exclude } from 'class-transformer';

class Shortener {
    shortId: string;

    url: string;

    clicks: number;

    limit: number | null;

    @Exclude()
    userId: string | null;

    category: string | null;

    lifeTime: Date;

    createdAt: Date;

    updatedAt: Date;
}

export { Shortener };
