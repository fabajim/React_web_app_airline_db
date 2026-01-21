import { Router } from "express";
import { SequelizeAirportRepository } from "../database/repositories/SequelizeAirportRepository";
import { AirportServices } from "../services/AirportServices";
import { AirportController } from "../controllers/AirportController";

const airportRouter = Router();

const repo = new SequelizeAirportRepository();
const service = new AirportServices(repo)
const controller = new AirportController(service);

/**
 * @openapi
 * /api/airports:
 *   get:
 *     summary: Get all airports
 *     tags:
 *       - Airports
 *     parameters:
 *      - in: query
 *        name: city
 *        schema:
 *          type: string
 *      - in: query
 *        name: cityCode
 *        schema: 
 *          type: string
 *      - in: query
 *        name: isHub
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: List of airports
 */
airportRouter.get('/', controller.getAll.bind(controller));

/**
 * @openapi
 * /api/airports/:
 *   post:
 *     summary: Create a new airport
 *     tags: [Airports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAirportDto'
 *     responses:
 *       201:
 *         description: Airport created
 */
airportRouter.post('/', controller.create.bind(controller));

/**
 * @openapi
 * /api/airports/{id}:
 *   put:
 *     summary: Update existing airport by id.
 *     tags: [Airports]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAirportDto'
 *     responses:
 *       201:
 *         description: Airport Updated
 */
airportRouter.put('/:id', controller.updateAirportById.bind(controller));

/**
 * @openapi
 * /api/airports/{id}:
 *   delete:
 *     tags: [Airports]
 *     summary: Delete airport by id.
  *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Airport Deleted
 *       404:
 *         description: Airport not found
 */
airportRouter.delete('/:id', controller.deleteById.bind(controller));

export default airportRouter;