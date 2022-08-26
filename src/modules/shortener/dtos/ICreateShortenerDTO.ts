interface IRequestCreateShortenerDTO {
    url: string;
    limit?: number;
    userId?: string;
    category?: string;
}

interface ICreateShortenerDTO {
    url: string;
    shortId: string;
    limit?: number;
    userId?: string;
    category?: string;
    lifeTime: Date;
}

export { ICreateShortenerDTO, IRequestCreateShortenerDTO };
