import { ILicenseRepository } from "../interfaceRepo/ILicenseRepository";
import { License } from "../models/License";

export class LicenseServices {
    constructor(private readonly licenseRepo: ILicenseRepository) {}

    async getLicenses(): Promise<License[]> {
        return this.licenseRepo.findAll();
    }
}