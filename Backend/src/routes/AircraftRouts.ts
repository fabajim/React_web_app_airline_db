import { Router } from "express";
import { SequelizeAircraftRepository } from "../database/repositories/SequelizeAircraftRepository";
import { AircraftServices } from "../services/AircraftServices";
import { AircraftController } from "../controllers/AircraftController";
import { SequelizeAircraftTypeRepository } from "../database/repositories/SequelizeAircraftTypeRepository";

const aircraftRouter: Router = Router();

const repo: SequelizeAircraftRepository = new SequelizeAircraftRepository();
const typeRepo: SequelizeAircraftTypeRepository = new SequelizeAircraftTypeRepository();
const service: AircraftServices = new AircraftServices(repo, typeRepo);
const controller: AircraftController = new AircraftController(service);

/**
 * @openapi
 * /api/aircraft:
 *   get:
 *     summary: Get all Aircraft
 *     tags:
 *       - Aircraft
 *     responses:
 *       200:
 *         description: List of pilots
 */
aircraftRouter.get('/', controller.getAll.bind(controller));


/**
 * @openapi
 * /api/aircraft/{id}:
 *   get:
 *     summary: Get Aircraft by id.
 *     tags:
 *       - Aircraft
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get one Aircraft
 *       404:
 *         description: Aircraft Not Found.
 */
aircraftRouter.get('/:id', controller.getById.bind(controller));


/**
 * @openapi
 * /api/aircraft/:
 *   post:
 *     summary: Create a new aircraft
 *     tags: [Aircraft]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAircraftDto'
 *     responses:
 *       201:
 *         description: Aircraft created
 *       500:
 *         description: Failed to add aircraft
 */
aircraftRouter.post('/', controller.create.bind(controller));


/**
 * @openapi
 * /api/aircraft/{id}:
 *   put:
 *     summary: Update existing aircraft by id.
 *     tags: [Aircraft]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *     requestBody:
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAircraftDto'
 *     responses:
 *       201:
 *         description: Aircraft Updated
 */
aircraftRouter.put('/:id', controller.updateAircraft.bind(controller));

export default aircraftRouter;