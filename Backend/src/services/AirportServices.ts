import { CreateAirportDto } from "../dtos/airport/CreateAirportDto";
import { AirportQueryObject } from "../helpers/queryObjects/AirportQueryObject";
import { IAirportRepository } from "../interfaceRepo/IAirportRepository";
import { Airport } from "../models/Airport";

export class AirportServices {
    constructor(private readonly airportRepo: IAirportRepository) {}

    async getAllAirports(airportQuery: AirportQueryObject): Promise<Airport[]> {
        return this.airportRepo.findAll(airportQuery);
    }

    async createAirport(airportDto: CreateAirportDto): Promise<Airport> {
        return this.airportRepo.createAirport(airportDto);
    }
}