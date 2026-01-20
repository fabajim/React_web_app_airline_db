import { Op } from "sequelize";
import { AirportQueryObject } from "../../helpers/queryObjects/AirportQueryObject";
import { IAirportRepository } from "../../interfaceRepo/IAirportRepository";
import { Airport } from "../../models/Airport";
import { AirportModel } from "../models/AirportModel";

export class SequelizeAirportRepository implements IAirportRepository {

    async findAll(query: AirportQueryObject): Promise<Airport[]> {
        const where: any = {};

        if (query.city) {
            where.city = { [Op.like]: `${query.city}%` };
        }

        if (query.cityCode) {
            where.cityCode = { [Op.like]: `${query.cityCode}%` };
        }

        if (query.isHub) {
            where.isHub = query.isHub;
        }

        console.log(where);
        
        const rows: AirportModel[] = await AirportModel.findAll({ where });

        return rows.map(row => new Airport({
            airportID: row.airportID,
            city: row.city,
            cityCode: row.cityCode,
            isHub: row.isHub
        }));
    }

}