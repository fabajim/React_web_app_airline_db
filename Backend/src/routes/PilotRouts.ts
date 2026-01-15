import { Router } from "express";
import { SequelizePilotRepository } from "../database/repositories/SequelizePilotRepository";
import { PilotServices } from "../services/PilotServices";
import { PilotController } from "../controllers/PilotController";

const pilotRouter = Router();

const repo = new SequelizePilotRepository();
const service = new PilotServices(repo);
const controller = new PilotController(service);

/**
 * @openapi
 * /api/pilots:
 *   get:
 *     summary: Get all pilots
 *     tags:
 *       - Pilots
 *     responses:
 *       200:
 *         description: List of pilots
 */
pilotRouter.get('/', controller.getAll.bind(controller));

/**
 * @openapi
 * /api/pilots/{id}:
 *   get:
 *     summary: Get a pilot by ID
 *     tags:
 *       - Pilots
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Pilot ID
 *     responses:
 *       200:
 *         description: Pilot found
 *       404:
 *         description: Pilot not found
 */
pilotRouter.get('/:id', controller.getById.bind(controller));


/**
 * @openapi
 * /api/pilots:
 *   post:
 *     summary: Create a new pilot
 *     tags: [Pilots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePilotDto'
 *     responses:
 *       201:
 *         description: Pilot created
 */
pilotRouter.post('/', controller.create.bind(controller));

export default pilotRouter;