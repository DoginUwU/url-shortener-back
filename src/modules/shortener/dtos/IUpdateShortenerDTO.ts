interface IUpdateShortenerDTO {
    url: string;
    clicks: number;
    lifeTime: Date;
    limit: number | null;
    userId: string | null;
    category: string | null;
}

export { IUpdateShortenerDTO };
