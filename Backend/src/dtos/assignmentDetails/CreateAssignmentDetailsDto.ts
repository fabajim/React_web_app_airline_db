import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';

/**
 *  CreateAssignmentDto.ts
 *  Props needed to create a new assignment.
 * @member pilotID?: number
 * @member aircraftID!: number
 * @member airportID!: number
 * @member isActive!: boolean = true
 */
export class createAssignmentDto {
    @Transform(({ value }) => 
        value === "" || value === null
        ? null 
        : value
    )
    @ValidateIf((_, value: any) => 
        value !== null && value !== undefined 
    )
    @IsInt()
    @Min(1)
    pilotID?: number | null;

    @IsNotEmpty()
    @IsInt()
    aircraftID!: number;

    @IsNotEmpty()
    @IsInt()
    airportID!: number;

    isActive: boolean = true;
}