import { CreateLicenseDetailsDto } from "../dtos/licenseDetails/CreateLicenseDetailsDto";
import { LicenseDetails } from "../models/LicenseDetails";

export interface ILicenseDetailsRepository {
    createLicenseDetail(data: CreateLicenseDetailsDto): Promise<LicenseDetails>;
}