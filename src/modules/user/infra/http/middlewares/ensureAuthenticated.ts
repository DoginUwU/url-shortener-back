import { jwt } from '@/config/auth';
import { HttpException } from '@/shared/errors/httpException';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IJwtProvider {
    iat: number;
    exp: number;
    sub: string;
}

const ensureAuthenticated = (request: Request, _: Response, next: NextFunction): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new HttpException('Você precisa estar autenticado para acessar essa rota.', 401);

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, jwt.secret);

        const { sub } = decoded as IJwtProvider;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new HttpException('Token invalido', 403);
    }
};

export default ensureAuthenticated;
