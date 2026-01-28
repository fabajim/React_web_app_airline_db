import { Router } from "express";
import { SequelizeAssignmentDetailsRepository } from "../database/repositories/SequelizeAssignmentDetailsRepository";
import { AssignmentDetailsServices } from "../services/AssignmentDetailsServices";
import { AssignmentsController } from "../controllers/AssignmentsController";

const assignmentsRouter: Router = Router();

const repo: SequelizeAssignmentDetailsRepository = new SequelizeAssignmentDetailsRepository();
const service: AssignmentDetailsServices = new AssignmentDetailsServices(repo);
const controller: AssignmentsController = new AssignmentsController(service);

/**
 * @openapi
 * /api/assignments:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: List of Assignments
 */
assignmentsRouter.get('/', controller.getAllView.bind(controller));

export default assignmentsRouter;