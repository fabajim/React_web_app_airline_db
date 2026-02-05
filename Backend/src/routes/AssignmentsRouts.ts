import { Router } from "express";
import { SequelizeAssignmentDetailsRepository } from "../database/repositories/SequelizeAssignmentDetailsRepository";
import { AssignmentDetailsServices } from "../services/AssignmentDetailsServices";
import { AssignmentsController } from "../controllers/AssignmentsController";
import { SequelizePilotRepository } from "../database/repositories/SequelizePilotRepository";
import { SequelizeAircraftRepository } from "../database/repositories/SequelizeAircraftRepository";
import { SequelizeAirportRepository } from "../database/repositories/SequelizeAirportRepository";

const assignmentsRouter: Router = Router();

const repo: SequelizeAssignmentDetailsRepository = new SequelizeAssignmentDetailsRepository();
const pilotRepo: SequelizePilotRepository = new SequelizePilotRepository();
const aircraftRepo: SequelizeAircraftRepository = new SequelizeAircraftRepository();
const airportRepo: SequelizeAirportRepository = new SequelizeAirportRepository();
const service: AssignmentDetailsServices = new AssignmentDetailsServices(repo, pilotRepo, aircraftRepo, airportRepo);
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

/**
 * @openapi
 * /api/assignments/:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAssignmentDetailDto'
 *     responses:
 *       201:
 *         description: Assignment Created
 */
assignmentsRouter.post('/', controller.createNewAssignment.bind(controller));

/**
 * @openapi
 * /api/assignments/remove-pilot/{id}:
 *   put:
 *     summary: Removes Pilot from assignment
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RemovePilotDto'
 *     responses:
 *       201:
 *         description: Assignment Updated
 */
assignmentsRouter.put('/remove-pilot/:id', controller.removePilotFromAssignment.bind(controller));

/**
 * @openapi
 * /api/assignments/add-pilot/{id}:
 *   put:
 *     summary: Adds new pilot to assignment.
 *     tags: [Assignments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddPilotToAssignmentPilotDto'
 *     responses:
 *       201:
 *         description: Assignment Updated
 */
assignmentsRouter.put('/add-pilot/:id', controller.addPilotToAssignment.bind(controller));

export default assignmentsRouter;