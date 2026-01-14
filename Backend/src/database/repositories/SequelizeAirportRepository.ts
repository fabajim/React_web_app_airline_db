import { IAirportRepository } from "../../interfaceRepo/IAirportRepository";
import { Airport } from "../../models/Airport";
import { AirportModel } from "../models/AirportModel";

export class SequelizeAirportRepository implements IAirportRepository {

    async findAll(): Promise<Airport[]> {
        const rows = await AirportModel.findAll();

        return rows.map(row => new Airport({
            airportID: row.airportID,
            city: row.city,
            cityCode: row.cityCode,
            isHub: row.isHub
        }));
    }

}