import { IsInt, IsNotEmpty } from 'class-validator';

export class createAssignmentDto {
    @IsInt()
    pilotID?: number | null;

    @IsNotEmpty()
    @IsInt()
    aircraftID!: number;

    @IsNotEmpty()
    @IsInt()
    airportID!: number;

    isActive: boolean = true;
}