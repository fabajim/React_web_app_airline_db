export class NotFoundError extends Error {
    constructor(entity: string, id: number) {
        super(`${entity} with ID ${id} not found`);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends Error {
    public readonly statusCode: number;

    constructor(statusCode: number, entity: string) {
        super(`${entity} is an invalid request.`)
        this.name = 'BadRequestError';
        this.statusCode = statusCode;
    }
}

export class DateAndHoursError extends Error {
    constructor() {
        super("Date and Hours cannot be less then what is currently saved.")
        this.name = 'DateAndHoursError';
    }
}
