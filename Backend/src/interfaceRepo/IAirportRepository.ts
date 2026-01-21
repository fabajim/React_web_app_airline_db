import { CreateAirportDto } from "../dtos/airport/CreateAirportDto";
import { AirportQueryObject } from "../helpers/queryObjects/AirportQueryObject";
import { Airport } from "../models/Airport";

export interface IAirportRepository {
    findAll(query: AirportQueryObject): Promise<Airport[]>;
    createAirport(data: CreateAirportDto): Promise<Airport>;
}