import { Request, Response } from "express";
import { LicenseDto } from "../dtos/license/LicenseDto";
import { LicenseMappers } from "../mappers/LicenseMapper";
import { License } from "../models/License";
import { LicenseServices } from "../services/LicenseServices";

export class LicenseController {
    constructor(private readonly service: LicenseServices) {}

    async getAllLicenses(req: Request, res: Response): Promise<Response<LicenseDto[]>> {
        try {
            const licenses: License[] = await this.service.getLicenses();
            const licenseDtoList: LicenseDto[] = LicenseMappers.toLicenseDtoList(licenses);
            return res.status(200).json(licenseDtoList)
        } catch (error) {
            return res.status(500).json({ message: `Server Error: Failed to get Licenses.` })
        }
    }
}