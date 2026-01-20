import { AirportQueryObject } from "../helpers/queryObjects/AirportQueryObject";
import { Airport } from "../models/Airport";

export interface IAirportRepository {
    findAll(query: AirportQueryObject): Promise<Airport[]>;
}