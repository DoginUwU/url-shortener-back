export class HttpException extends Error {
    readonly status: number;

    readonly message: string;

    constructor(message = 'Error desconhecido.', status = 500) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}
