interface IRequestCreateShortenerDTO {
    url: string;
    limit: number | null;
    userId: string | null;
    category: string | null;
    password: string | null;
    lifeTime: string;
}

interface ICreateShortenerDTO extends IRequestCreateShortenerDTO {
    shortId: string;
}

export { ICreateShortenerDTO, IRequestCreateShortenerDTO };
