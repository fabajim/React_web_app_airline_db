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
 * /api/assignments/current:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: List of current Assignments
 */
assignmentsRouter.get('/current', controller.getAllActiveView.bind(controller));


/**
 * @openapi
 * /api/assignments/all:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: List of Assignments
 */
assignmentsRouter.get('/all', controller.getAllView.bind(controller));

/**
 * @openapi
 * /api/assignments/pilot-needed:
 *   get:
 *     summary: Get all assignments
 *     tags: [Assignments]
 *     responses:
 *       200:
 *         description: List of current Assignments that need pilot 
 */
assignmentsRouter.get('/pilot-needed', controller.getAllNeedsPilotView.bind(controller));

/**
 * @openapi
 * /api/assignments/{id}:
 *   get:
 *     summary: Get a assignment by ID
 *     tags:
 *       - Assignments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assignment ID
 *     responses:
 *       200:
 *         description: Assignment found
 *       404:
 *         description: Assignment not found
 */
assignmentsRouter.get('/:id', controller.getAssignmentVewById.bind(controller));

export default assignmentsRouter;