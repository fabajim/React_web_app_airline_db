import { CreateAirportDto } from "../dtos/airport/CreateAirportDto";
import { UpdateAirportDto } from "../dtos/airport/UpdateAirportDto";
import { AirportQueryObject } from "../helpers/queryObjects/AirportQueryObject";
import { IAirportRepository } from "../iRepositories/IAirportRepository";
import { Airport } from "../models/Airport";
import { NotFound } from "../responses/Responses";
import { Result } from "../responses/types";

export class AirportServices {
    constructor(private readonly airportRepo: IAirportRepository) {}

    async getAllAirports(airportQuery: AirportQueryObject): Promise<Airport[]> {
        return this.airportRepo.findAll(airportQuery);
    }

    async createAirport(airportDto: CreateAirportDto): Promise<Airport> {
        return this.airportRepo.createAirport(airportDto);
    }

    async updateAirport(id: number, airportDto: UpdateAirportDto):
    Promise<Result<Airport>> {
        const airport: Airport|null = 
          await this.airportRepo.updateAirport(id, airportDto);
        
        if (!airport)
            return { ok: false, error: new NotFound(id, "Airport") }

        return { ok: true, value: airport };
    }

    async deleteAirportById(id: number): Promise<Result<string>> {
        const isDeleted: boolean = await this.airportRepo.deleteAirport(id);

        if (!isDeleted)
            return { ok: false, error: new NotFound(id, "Airport") };

        return { ok: true, value: "Airport successfully deleted." };
    }
}