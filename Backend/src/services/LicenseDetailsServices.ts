import { CreateLicenseDetailsDto } from "../dtos/licenseDetails/CreateLicenseDetailsDto";
import { ILicenseDetailsRepository } from "../iRepositories/ILicenseDetailsRepository";
import { IPilotRepository } from "../iRepositories/IPilotRepository";
import { LicenseDetails } from "../models/LicenseDetails";
import { Pilot } from "../models/Pilot";
import { ConflictError } from "../shared/Errors";

export class LicenseDetailsServices{
    constructor(private readonly licenseDetailRepo: ILicenseDetailsRepository, 
        private readonly pilotRepo: IPilotRepository) {}

    async createLicenseDetail(licenseDetail: CreateLicenseDetailsDto, 
        pilotId: number, licenseId:number): Promise<LicenseDetails> {
        
        const pilot: Pilot = await this.pilotRepo.findById(pilotId);

        console.log(`Pilot Licenses: ${pilot.pilotLicense}`);
        
        if (pilot.hasLicense(licenseId))
            throw new ConflictError('Duplicate: pilot already has license')

        return this.licenseDetailRepo.createLicenseDetail(licenseDetail);
    }
}