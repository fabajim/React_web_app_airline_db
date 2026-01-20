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

export default airportRouter;