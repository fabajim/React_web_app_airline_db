import { CreateAirportDto } from "../dtos/airport/CreateAirportDto";
import { UpdateAirportDto } from "../dtos/airport/UpdateAirportDto";
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

    async updateAirport(id: number, airportDto: UpdateAirportDto) {
        return this.airportRepo.updateAirport(id, airportDto);
    }

    async deleteAirportById(id: number) {
        return this.airportRepo.deleteAirport(id);
    }
}