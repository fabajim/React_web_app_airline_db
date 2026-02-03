/**
 * @openapi
 * components:
 *   schemas:
 *     CreateAssignmentDetailDto:
 *       type: object
 *       required:
 *         - pilotID
 *         - aircraftID
 *         - airportID
 *       properties:
 *         pilotID:
 *           type: integer
 *         aircraftID:
 *           type: integer
 *         airportID:
 *           type: integer
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     RemovePilotDto:
 *       type: object
 *       required:
 *         - aircraftID
 *         - airportID
 *       properties:
 *         aircraftID:
 *           type: integer
 *         airportID:
 *           type: integer
 */