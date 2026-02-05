export abstract class HttpError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends HttpError {
    constructor(entity: string, 
                id: number,
                message = `${entity} not found.`
    ) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends HttpError {
    constructor(entity: string,
                message: string = `Validation failed for: ${entity}`
    ) {
        super(message, 400)
        this.name = 'BadRequestError';
    }
}

export class DateAndHoursError extends HttpError {
    constructor() {
        super("Date and Hours cannot be less then what is currently saved.", 422)
        this.name = 'DateAndHoursError';
    }
}

export class ConflictError extends HttpError {
    constructor( message: string) {
        super(message, 409)
        this.name = 'ConflictError'
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message = `Unauthorized update!`) {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}
