import { Airport } from "../models/Airport";

export interface IAirportRepository {
    findAll(): Promise<Airport[]>;
}