/**
 *   airportValidators.ts
 * 
 *  helper functions to validate airport API data
 */

import { BadRequestError } from "../../shared/Errors";

export function parseIsHub(value: string): 0 | 1  {
    const num = Number(value);

    if (!Number.isInteger(num) || (num !== 0 && num !== 1)) {
        throw new BadRequestError(value);
    }

    return num as 0 | 1;
}