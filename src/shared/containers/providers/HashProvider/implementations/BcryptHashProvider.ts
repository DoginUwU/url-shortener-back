import { compare, hash, genSalt } from 'bcrypt';
import { IHashProvider } from '../models/IHashProvider';

class BcryptHashProvider implements IHashProvider {
    async ecrypt(data: string): Promise<string> {
        const salt = await genSalt(10);
        return hash(data, salt);
    }

    async validate(dataToValidade: string, data: string): Promise<boolean> {
        const isValid = await compare(dataToValidade, data);
        return isValid;
    }
}

export { BcryptHashProvider };
