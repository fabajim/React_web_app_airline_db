import { LicenseDetailsDto } from "../dtos/licenseDetails/LicenseDetailDto";
import { LicenseDetails } from "../models/LicenseDetails";

export class LicenseDetailsMapper {
    static toLicenseDetailsDto(licenseDetail: LicenseDetails): LicenseDetailsDto {
        return {
            licenseDetailsID: licenseDetail.licenseDetailID,
            pilotID: licenseDetail.pilotID,
            licenseID: licenseDetail.licenseID,
            dateReceived: licenseDetail.dateReceivedOn
        }
    }
}