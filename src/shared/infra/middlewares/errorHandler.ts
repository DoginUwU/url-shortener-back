import type { NextFunction, Request, Response } from 'express';
import { HttpException } from '../../errors/httpException';

export default async function errorHandler(
    error: HttpException,
    _request: Request,
    response: Response,
    _next: NextFunction,
): Promise<Response> {
    if (error instanceof HttpException) {
        return response.status(error.status).json({ error: error.message });
    }

    console.error(error);

    return response.status(500).json({
        status: '500',
        message: 'Internal Server Error',
    });
}
