import { Router } from "express";
import { SequelizeAirportRepository } from "../database/repositories/SequelizeAirportRepository";
import { AirportServices } from "../services/AirportServices";
import { AirportController } from "../controllers/AirportController";

const airportRouter = Router();

const repo = new SequelizeAirportRepository();
const service = new AirportServices(repo)
const controller = new AirportController(service);

airportRouter.get('/', controller.getAll.bind(controller));

export default airportRouter;