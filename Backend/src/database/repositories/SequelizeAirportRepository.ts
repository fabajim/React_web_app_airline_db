import { Op, WhereOptions } from "sequelize";
import { AirportQueryObject } from "../../helpers/queryObjects/AirportQueryObject";
import { IAirportRepository } from "../../iRepositories/IAirportRepository";
import { Airport } from "../../models/Airport";
import { AirportAttributes, AirportModel } from "../models/AirportModel";
import { CreateAirportDto } from "../../dtos/airport/CreateAirportDto";
import { UpdateAirportDto } from "../../dtos/airport/UpdateAirportDto";

export class SequelizeAirportRepository implements IAirportRepository {

    async getById(id: number): Promise<Airport | null> {
        const airport: AirportModel | null = await AirportModel.findByPk(id);

        if (!airport)
            return null;

        return this.toAirport(airport);
    }

    async deleteAirport(id: number): Promise<boolean> {
        const airportToDelete: AirportModel | null = await AirportModel.findByPk(id);

        if (!airportToDelete)
            return false;

        await airportToDelete.destroy();
        return true;
    }

    async updateAirport(id: number, data: UpdateAirportDto): Promise<Airport|null> {
        const airportToUpdate: AirportModel | null = await AirportModel.findByPk(id);

        if (!airportToUpdate)
            return null;

        await airportToUpdate.update({
            city: data.city,
            cityCode: data.cityCode,
            isHub: data.isHub
        });

        return this.toAirport(airportToUpdate);
    }

    async findAll(query: AirportQueryObject): Promise<Airport[]> {
        const where: WhereOptions<AirportAttributes> | undefined = {};

        if (query.city) {
            where.city = { [Op.like]: `${query.city}%` };
        }

        if (query.cityCode) {
            where.cityCode = { [Op.like]: `${query.cityCode}%` };
        }

        if (query.isHub !== undefined) {
            where.isHub = { [Op.eq]: query.isHub };
        }
        
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
        });
    }
}