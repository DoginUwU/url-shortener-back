import { prismaClient } from '@/config/db';
import { ICreateIPAddressDTO } from '../../dtos/ICreateIPAddressDTO';
import { IPAddress } from '../../entities/IPAddress';
import { IIPAddressRepository } from '../../repositories/IIPAddressRepository';

class IPAddressRepository implements IIPAddressRepository {
    async create(data: ICreateIPAddressDTO): Promise<IPAddress> {
        const ipAddress = await prismaClient.iPAddress.create({
            data,
        });

        return ipAddress;
    }

    async findByShortId(shortId: string): Promise<IPAddress[]> {
        const ipAddresses = await prismaClient.iPAddress.findMany({
            where: {
                shortId,
            },
        });

        return ipAddresses;
    }
}

export { IPAddressRepository };
