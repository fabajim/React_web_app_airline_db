import { ILicenseRepository } from "../../iRepositories/ILicenseRepository";
import { License } from "../../models/License";
import { LicenseModel } from "../models/LicenseModel";

export class SequelizeLicenseRepository implements ILicenseRepository {

    async getById(id: number): Promise<License | null> {
        const license: LicenseModel | null = await LicenseModel.findByPk(id);

        if (license === null)
            return license;

        return this.toLicense(license);
    }

    async findAll(): Promise<License[]> {
        const rows: LicenseModel[] = await LicenseModel.findAll();

        return rows.map(row => this.toLicense(row));
    }

    private toLicense(model: LicenseModel): License {
        return new License({
            licenseId: model.licenseId,
            licenseType: model.licenseType,
            hoursNeeded: model.hoursNeeded
        })
    }
}