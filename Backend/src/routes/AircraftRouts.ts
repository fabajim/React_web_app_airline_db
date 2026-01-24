import { Router } from "express";
import { SequelizeAircraftRepository } from "../database/repositories/SequelizeAircraftRepository";
import { AircraftServices } from "../services/AircraftServices";
import { AircraftController } from "../controllers/AircraftController";

const aircraftRouter: Router = Router();

const repo: SequelizeAircraftRepository = new SequelizeAircraftRepository();
const service: AircraftServices = new AircraftServices(repo);
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

export default aircraftRouter;