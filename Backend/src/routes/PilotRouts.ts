import { Router } from "express";
import { SequelizePilotRepository } from "../database/repositories/SequelizePilotRepository";
import { PilotServices } from "../services/PilotServices";
import { PilotController } from "../controllers/PilotController";

const pilotRouter: Router = Router();

const repo: SequelizePilotRepository = new SequelizePilotRepository();
const service: PilotServices = new PilotServices(repo);
const controller: PilotController = new PilotController(service);

/**
 * @openapi
 * /api/pilots:
 *   get:
 *     summary: Get all pilots
 *     tags:
 *       - Pilots
 *     parameters:
 *       - in: query
 *         name: fname
 *         schema:
 *           type: string
 *       - in: query
 *         name: lname
 *         schema:
 *           type: string
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
 * /api/pilots/:
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

/**
 * @openapi
 * /api/pilots/{id}:
 *   put:
 *     summary: Update existing pilot by id.
 *     tags: [Pilots]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePilotDto'
 *     responses:
 *       201:
 *         description: Pilot Updated
 */
pilotRouter.put('/:id', controller.updateById.bind(controller));

/**
 * @openapi
 * /api/pilots/{id}:
 *   delete:
 *     tags: [Pilots]
 *     summary: Delete pilot by id.
  *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Pilot Deleted
 *       404:
 *         description: Pilot not found
 */
pilotRouter.delete('/:id', controller.deleteById.bind(controller));

export default pilotRouter;