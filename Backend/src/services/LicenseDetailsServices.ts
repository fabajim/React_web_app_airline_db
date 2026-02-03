import { CreateLicenseDetailsDto } from "../dtos/licenseDetails/CreateLicenseDetailsDto";
import { ILicenseDetailsRepository } from "../iRepositories/ILicenseDetailsRepository";
import { ILicenseRepository } from "../iRepositories/ILicenseRepository";
import { IPilotRepository } from "../iRepositories/IPilotRepository";
import { License } from "../models/License";
import { LicenseDetails } from "../models/LicenseDetails";
import { Pilot } from "../models/Pilot";
import { ConflictError, NotFoundError } from "../shared/Errors";

export class LicenseDetailsServices{
    constructor(private readonly licenseDetailRepo: ILicenseDetailsRepository, 
                private readonly pilotRepo: IPilotRepository,
                private readonly licenseRepo: ILicenseRepository) {}

    async createLicenseDetail(licenseDetail: CreateLicenseDetailsDto, 
        pilotId: number, licenseId:number): Promise<LicenseDetails> {
        
        const pilot: Pilot | null = await this.pilotRepo.findById(pilotId);
        const license: License | null = await this.licenseRepo.getById(licenseId);

        if (license === null)
            throw new NotFoundError('License', licenseId);

        if (pilot === null)
            throw new NotFoundError('Pilot', pilotId);
        
        if (pilot.hasLicense(licenseId))
            throw new ConflictError('Duplicate: pilot already has license')

        return this.licenseDetailRepo.createLicenseDetail(licenseDetail);
    }
}