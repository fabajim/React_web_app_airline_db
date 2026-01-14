import { AirportDto } from "../dtos/airportDto.ts/airportDto";
import { Airport } from "../models/Airport";

export class AirportMappers {
    static toAirportDto(airport: Airport): AirportDto {
        return {
            airportID: airport.airportID!,
            city: airport.city,
            cityCode: airport.cityCode,
            isHub: airport.isHub
        };
    }

    static toAirportDtoList(airports: Airport[]): AirportDto[] {
        return airports.map(a => this.toAirportDto(a));
    }
}