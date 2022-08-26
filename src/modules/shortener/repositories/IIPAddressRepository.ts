import { ICreateIPAddressDTO } from '../dtos/ICreateIPAddressDTO';
import { IPAddress } from '../entities/IPAddress';

interface IIPAddressRepository {
    create(data: ICreateIPAddressDTO): Promise<IPAddress>;
    findByShortId(shortId: string): Promise<IPAddress[]>;
}

export { IIPAddressRepository };
