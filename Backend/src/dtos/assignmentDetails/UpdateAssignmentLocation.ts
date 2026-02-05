import { IsInt, IsNotEmpty, Min } from "class-validator";

export class UpdateAssignmentLocation {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    pilotID!: number

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    aircraftID!: number

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    airportID!: number

    isActive: boolean = true;
}