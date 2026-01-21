import { Op } from "sequelize";
import { AirportQueryObject } from "../../helpers/queryObjects/AirportQueryObject";
import { IAirportRepository } from "../../interfaceRepo/IAirportRepository";
import { Airport } from "../../models/Airport";
import { AirportModel } from "../models/AirportModel";
import { CreateAirportDto } from "../../dtos/airport/CreateAirportDto";

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

        return rows.map(row => this.toAirport(row));
    }

    async createAirport(data: CreateAirportDto): Promise<Airport> {
        const airport: AirportModel = await AirportModel.create(data);
        return this.toAirport(airport);
    }

    private toAirport(model: AirportModel): Airport {
        return new Airport({
            airportID: model.airportID,
            city: model.city,
            cityCode: model.cityCode,
            isHub: model.isHub
        })
    }
}