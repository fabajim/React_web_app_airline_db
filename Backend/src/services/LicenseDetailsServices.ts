import { CreateLicenseDetailsDto } from "../dtos/licenseDetails/CreateLicenseDetailsDto";
import { ILicenseDetailsRepository } from "../iRepositories/ILicenseDetailsRepository";
import { ILicenseRepository } from "../iRepositories/ILicenseRepository";
import { IPilotRepository } from "../iRepositories/IPilotRepository";
import { License } from "../models/License";
import { LicenseDetails } from "../models/LicenseDetails";
import { Pilot } from "../models/Pilot";
import { BadValidation, ConflictError, NotFound } from "../responses/Responses";
import { Result } from "../responses/types";

export class LicenseDetailsServices{
    constructor(private readonly licenseDetailRepo: ILicenseDetailsRepository, 
                private readonly pilotRepo: IPilotRepository,
                private readonly licenseRepo: ILicenseRepository) {}

    async createLicenseDetail(
      licenseDetail: CreateLicenseDetailsDto, 
      pilotId: number, 
      licenseId:number):
    Promise<Result<LicenseDetails>> {

        const pilot: Pilot | null = await this.pilotRepo.findById(pilotId);
        const license: License | null = await this.licenseRepo.getById(licenseId);

        if (license === null)
            return { ok: false, error: new BadValidation("License does not exist.") };

        if (pilot === null)
            return { ok: false, error: new NotFound(pilotId, 'Pilot') };
        
        if (pilot.hasLicense(licenseId))
            return { ok: false, error: new ConflictError() };

        const result: LicenseDetails = 
          await this.licenseDetailRepo.createLicenseDetail(licenseDetail);
        
        return { ok: true, value: result };
    }
}