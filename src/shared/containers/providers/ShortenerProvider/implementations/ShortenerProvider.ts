import { IShortenerProvider } from '../models/IShortenerProvider';

class ShortenerProvider implements IShortenerProvider {
    create(): string {
        const id = Math.random().toString(36).substring(2, 10);

        return id;
    }
}

export { ShortenerProvider };
