import { CreateAirportDto } from "../dtos/airport/CreateAirportDto";
import { UpdateAirportDto } from "../dtos/airport/UpdateAirportDto";
import { AirportQueryObject } from "../helpers/queryObjects/AirportQueryObject";
import { Airport } from "../models/Airport";

export interface IAirportRepository {
    findAll(query: AirportQueryObject): Promise<Airport[]>;
    getById(id: number): Promise<Airport>;
    createAirport(data: CreateAirportDto): Promise<Airport>;
    updateAirport(id: number, data: UpdateAirportDto): Promise<Airport>;
    deleteAirport(id: number): void;
}