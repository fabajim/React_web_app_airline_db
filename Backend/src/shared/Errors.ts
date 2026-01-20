export class NotFoundError extends Error {
    constructor(entity: string, id: number) {
        super(`${entity} with ID ${id} not found`);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends Error {
    constructor(entity: string) {
        super(`${entity} is an invalid request.`)
        this.name = 'BadRequestError';
    }
}