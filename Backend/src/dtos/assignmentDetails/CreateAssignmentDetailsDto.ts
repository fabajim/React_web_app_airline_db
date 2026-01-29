import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';


export class createAssignmentDto {
    @Transform(({ value }) => 
        (typeof value === 'string' && value.trim() === '') 
        ? null 
        : value
    )
    @ValidateIf((_, value: any) => 
        value !== null && value !== undefined &&
        (typeof value === 'string' && value.trim() !== '')
    )
    @IsOptional()
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