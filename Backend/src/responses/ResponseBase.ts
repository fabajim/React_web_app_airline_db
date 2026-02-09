export const NOT_FOUND_BASE = {
  name: "NotFound",
  code: 404,
  message: "Resource not found.",
} as const;

export const BAD_REQUEST_BASE = {
  name: "BadRequest",
  code: 400,
  message: "Bad request.",
} as const;

export const CONFLICT_ERROR_BASE = {
  name: "ConflictError",
  code: 409,
  message: "Duplicate Data. Entity exists in database."
}

export const VALIDATION_ERROR_BASE = {
  name: "ValidationError",
  code: 422,
  message: "Data was not valid for transaction."
}