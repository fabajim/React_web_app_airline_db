import { IAirportRepository } from "../interfaceRepo/IAirportRepository";
import { Airport } from "../models/Airport";

export class AirportServices {
    constructor(private readonly airportRepo: IAirportRepository) {}

    async getAllAirports(): Promise<Airport[]> {
        return this.airportRepo.findAll();
    }
}