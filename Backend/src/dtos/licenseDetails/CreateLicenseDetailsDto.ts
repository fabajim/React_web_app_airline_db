import { Type } from "class-transformer";
import { IsInt, IsNotEmpty,IsDate } from "class-validator";

export class CreateLicenseDetailsDto {
    @IsNotEmpty()
    @IsInt()
    pilotID!: number;

    @IsNotEmpty()
    @IsInt()
    licenseID!: number;

    @Type(() => Date)
    @IsDate()
    dateReceived!: Date;
}