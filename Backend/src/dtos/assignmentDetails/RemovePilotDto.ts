import { IsInt, IsNotEmpty } from "class-validator";

export class RemovePilotDto {
    pilotID = null;

    @IsNotEmpty()
    @IsInt()
    aircraftID!: number;

    @IsNotEmpty()
    @IsInt()
    airportID!: number;

    isActive: boolean = true;
}