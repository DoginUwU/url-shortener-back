class Shortener {
    id: string;

    url: string;

    shortId: string;

    clicks: number;

    limit: number | null;

    userId: string | null;

    category: string | null;

    lifeTime: Date;

    createdAt: Date;

    updatedAt: Date;
}

export { Shortener };
