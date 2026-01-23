import { Router } from "express";
import { SequelizeLicenseDetailRepository } from "../database/repositories/SequelizeLicenseDetailRepository";
import { LicenseDetailsServices } from "../services/LicenseDetailsServices";
import { SequelizePilotRepository } from "../database/repositories/SequelizePilotRepository";
import { LicenseDetailsController } from "../controllers/LicenseDetailsController";

const licenseDetailsRouter: Router = Router();

const detailsRepo: SequelizeLicenseDetailRepository = new SequelizeLicenseDetailRepository();
const pilotRepo: SequelizePilotRepository = new SequelizePilotRepository()
const service: LicenseDetailsServices = new LicenseDetailsServices(detailsRepo, pilotRepo);
const controller: LicenseDetailsController = new LicenseDetailsController(service);

/**
 * @openapi
 * /api/licenseDetails/:
 *   post:
 *     summary: Create a new airport
 *     tags: [LicenseDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLicenseDetailDto'
 *     responses:
 *       201:
 *         description: License Added to pilot
 */
licenseDetailsRouter.post('/', controller.create.bind(controller));

export default licenseDetailsRouter;