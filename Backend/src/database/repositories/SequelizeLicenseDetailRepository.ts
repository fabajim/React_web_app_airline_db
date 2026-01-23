import { CreateLicenseDetailsDto } from "../../dtos/licenseDetails/CreateLicenseDetailsDto";
import { ILicenseDetailsRepository } from "../../iRepositories/ILicenseDetailsRepository";
import { LicenseDetails } from "../../models/LicenseDetails";
import { LicenseDetailModel } from "../models/LicenseDetailModel";

export class SequelizeLicenseDetailRepository implements ILicenseDetailsRepository {

    async createLicenseDetail(data: CreateLicenseDetailsDto): Promise<LicenseDetails> {
        const licenseDetail: LicenseDetailModel = await LicenseDetailModel.create(data);
        return new LicenseDetails({
            licenseDetailsID: licenseDetail.licenseDetailsID,
            pilotID: licenseDetail.pilotID,
            licenseID: licenseDetail.licenseID,
            dateReceived: new Date(licenseDetail.dateReceived)
        });
    }

}