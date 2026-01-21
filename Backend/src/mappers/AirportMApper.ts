import { AirportDto } from "../dtos/airport/airportDto";
import { Airport } from "../models/Airport";

export class AirportMappers {
    static toAirportDto(airport: Airport): AirportDto {
        return {
            airportId: airport.airportID!,
            city: airport.city,
            cityCode: airport.cityCode,
            isHub: airport.isHub
        };
    }

    static toAirportDtoList(airports: Airport[]): AirportDto[] {
        return airports.map(a => this.toAirportDto(a));
    }
}