import { Router } from "express";
import { SequelizePilotRepository } from "../database/repositories/SequelizePilotRepository";
import { PilotServices } from "../services/PilotServices";
import { PilotController } from "../controllers/PilotController";

const pilotRouter = Router();

const repo = new SequelizePilotRepository();
const service = new PilotServices(repo);
const controller = new PilotController(service);

pilotRouter.get('/', controller.getAll.bind(controller));

export default pilotRouter;