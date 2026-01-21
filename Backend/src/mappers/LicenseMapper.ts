import { LicenseDto } from "../dtos/license/LicenseDto";
import { License } from "../models/License";

export class LicenseMappers {
    static toLicenseDto(license: License): LicenseDto {
        return {
            licenseId: license.licenseId,
            licenseType: license.licenseType,
            hoursNeeded: license.hoursNeeded
        };
    }

    static toLicenseDtoList(license: License[]): LicenseDto[] {
        return license.map(l => this.toLicenseDto(l));
    }
}