interface IHashProvider {
    ecrypt(data: string): Promise<string>;
    validate(dataToValidade: string, data: string): Promise<boolean>;
}

export type { IHashProvider };
