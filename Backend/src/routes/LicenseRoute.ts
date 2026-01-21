import { Router } from "express";
import { LicenseServices } from "../services/LicenseServices";
import { SequelizeLicenseRepository } from "../database/repositories/SequelizeLicenseRepository";
import { LicenseController } from "../controllers/LicenseController";

const licenseRouter: Router = Router();

const repo: SequelizeLicenseRepository = new SequelizeLicenseRepository();
const service: LicenseServices = new LicenseServices(repo);
const controller: LicenseController = new LicenseController(service);

/**
 * @openapi
 * /api/licenses:
 *   get:
 *     summary: Get all Licenses
 *     tags: [Licenses]
 *     responses:
 *       200:
 *         description: List of Licenses
 */
licenseRouter.get('/', controller.getAllLicenses.bind(controller));

export default licenseRouter;