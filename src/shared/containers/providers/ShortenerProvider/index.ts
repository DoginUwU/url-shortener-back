import { container } from 'tsyringe';
import { ShortenerProvider } from './implementations/ShortenerProvider';
import { IShortenerProvider } from './models/IShortenerProvider';

container.registerSingleton<IShortenerProvider>('ShortenerProvider', ShortenerProvider);
