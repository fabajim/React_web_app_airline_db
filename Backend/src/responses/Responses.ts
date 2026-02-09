import { BAD_REQUEST_BASE, CONFLICT_ERROR_BASE, NOT_FOUND_BASE, VALIDATION_ERROR_BASE } from "./ResponseBase";

export interface HTTP_BODY {
  name: string;
  code: number;
  message: string;
}

export abstract class HTTP_Error_Response {
  public readonly name: string;
  public readonly code: number;
  public readonly message: string;

  protected constructor(body: HTTP_BODY) {
    this.name = body.name;
    this.code = body.code;
    this.message = body.message;
  }
}

export class NotFound extends HTTP_Error_Response {
  constructor(id?: number, entity?: string) {
      super({
        ...NOT_FOUND_BASE,
        message:
          id && entity
            ? `${entity} with id of ${id} not found.`
            : NOT_FOUND_BASE.message
      }) 
  }
}

export class BadRequest extends HTTP_Error_Response {
  constructor(){
      super(BAD_REQUEST_BASE)
  }
}

export class ConflictError extends HTTP_Error_Response {
  constructor() {
    super(CONFLICT_ERROR_BASE)
  }
}

export class BadValidation extends HTTP_Error_Response {
  constructor(message?: string) {
    super({
      ...VALIDATION_ERROR_BASE,
      message:
        message
          ? message
          : VALIDATION_ERROR_BASE.message
    })
  }
}