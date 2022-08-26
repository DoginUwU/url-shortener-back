interface IRequestCreateShortenerDTO {
    url: string;
    limit: number | null;
    userId: string | null;
    category: string | null;
}

interface ICreateShortenerDTO {
    url: string;
    shortId: string;
    limit: number | null;
    userId: string | null;
    category: string | null;
    lifeTime: Date;
}

export { ICreateShortenerDTO, IRequestCreateShortenerDTO };
