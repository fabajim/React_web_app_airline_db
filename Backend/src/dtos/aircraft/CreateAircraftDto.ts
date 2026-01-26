import { Type } from "class-transformer";
import { IsDate, IsInt, isNotEmpty, IsNotEmpty } from "class-validator";

export class CreateAircraftDto {
    @IsNotEmpty()
    serialNum!: string;

    @Type(() => Date)
    @IsDate()
    lastService!: Date;

    @IsNotEmpty()
    @IsInt()
    totalHourFlown!: number;

    @IsNotEmpty()
    @IsInt()
    aircraftTypeID!: number;
}