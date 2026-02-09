import { HTTP_Error_Response } from "./Responses";

/**
 *  types.ts 
 *  Services uses Result to return a boolean flag
 *  and an object. Either an entity or an http error.
 */
export type Result<T> = 
  | {ok: true; value: T }
  | {ok: false; error: HTTP_Error_Response};
