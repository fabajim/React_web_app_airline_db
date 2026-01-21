import { IsInt, IsNotEmpty, Length, Max, Min } from "class-validator";

export class CreateAirportDto {
    @IsNotEmpty()
    @Length(2, 20)
    city!: string;

    @IsNotEmpty()
    @Length(1, 4)
    cityCode!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    isHub!: number;
}