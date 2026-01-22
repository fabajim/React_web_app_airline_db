import { ILicenseRepository } from "../iRepositories/ILicenseRepository";
import { License } from "../models/License";

export class LicenseServices {
    constructor(private readonly licenseRepo: ILicenseRepository) {}

    async getLicenses(): Promise<License[]> {
        return this.licenseRepo.findAll();
    }
}