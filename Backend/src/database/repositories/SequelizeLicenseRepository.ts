import { ILicenseRepository } from "../../interfaceRepo/ILicenseRepository";
import { License } from "../../models/License";
import { LicenseModel } from "../models/LicenseModel";

export class SequelizeLicenseRepository implements ILicenseRepository {

    async findAll(): Promise<License[]> {
        const rows: LicenseModel[] = await LicenseModel.findAll();

        return rows.map(row => new License({
            licenseId: row.licenseId,
            licenseType: row.licenseType,
            hoursNeeded: row.hoursNeeded
        }));
    }

}