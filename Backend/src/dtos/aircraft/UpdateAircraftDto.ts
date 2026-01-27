import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class UpdateAircraftDto {
    @Type(() => Date)
    @IsDate()
    lastService!: Date;

    @IsNotEmpty()
    @IsInt()
    totalHourFlown!: number;
}