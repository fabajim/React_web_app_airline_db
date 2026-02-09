/**
 *   airportValidators.ts
 * 
 *  helper functions to validate airport API data
 */

import { BadRequest } from "../../responses/Responses";
import { Result } from "../../responses/types";

export function parseIsHub(value: string): Result<0 | 1>  {
    const num = Number(value);

    if (!Number.isInteger(num) || (num !== 0 && num !== 1)) {
        return { ok : false, error: new BadRequest() };
    }

    return {ok: true, value: num as 0 | 1};
}