/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAircraftDto:
 *       type: object
 *       required:
 *         - serialNum
 *         - lastService
 *         - totalHourFlown
 *         - aircraftTypeID
 *       properties:
 *         serialNum:
 *           type: string
 *         lastService:
 *           type: string
 *         totalHourFlown:
 *           type: integer
 *         aircraftTypeID:
 *           type: integer
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateAircraftDto:
 *       type: object
 *       required:
 *         - lastService
 *         - totalHourFlown
 *       properties:
 *         lastService:
 *           type: string
 *         totalHourFlown:
 *           type: integer
 */

export {}