import { CreateAircraftDto } from "../../dtos/aircraft/CreateAircraftDto";
import { UpdateAircraftDto } from "../../dtos/aircraft/UpdateAircraftDto";
import { IAircraftRepository } from "../../iRepositories/IAircraftRepository";
import { Aircraft } from "../../models/Aircraft";
import { NotFoundError } from "../../shared/Errors";
import { AircraftModel } from "../models/AircraftModel";
import { AircraftTypeModel } from "../models/AircraftTypeModel";

export class SequelizeAircraftRepository implements IAircraftRepository {


    async updateById(id: number, data: UpdateAircraftDto): Promise<Aircraft> {
        const aircraftToUpdate: AircraftModel | null = await AircraftModel.findByPk(id);

        if (aircraftToUpdate === null)
            throw new NotFoundError('Aircraft', id);

        await aircraftToUpdate.update({
            lastService: data.lastService,
            totalHourFlown: data.totalHourFlown
        });

        return this.toAircraft(aircraftToUpdate)
    }

    async create(data: CreateAircraftDto): Promise<Aircraft | null> {
        const aircraft: AircraftModel = await AircraftModel.create({
            serialNum: data.serialNum,
            lastService: data.lastService,
            totalHourFlown: data.totalHourFlown,
            aircraftTypeID: data.aircraftTypeID
        });

        return await this.getById(aircraft.aircraftID);
    }

    async getById(id: number): Promise<Aircraft | null> {
        const row: AircraftModel | null = await AircraftModel.findByPk(id, {
            include: [{
                model: AircraftTypeModel,
                as: 'typeInfo',
                attributes: ['make', 'model', 'licenseID']
            }]
        });

        if (row === null)
            return null;

        return this.toAircraft(row);
    }

    async findAll(): Promise<Aircraft[]> {
        const rows: AircraftModel[] = await AircraftModel.findAll({
            include: [{
                model: AircraftTypeModel,
                as: 'typeInfo',
                attributes: ['make', 'model']
            }]
        });

        return rows.map(row => this.toAircraft(row));
    }

    private toAircraft(model: AircraftModel) : Aircraft {
        return new Aircraft({
            aircraftID: model.aircraftID,
            serialNum: model.serialNum,
            lastService: model.lastService,
            totalHourFlown: model.totalHourFlown,
            typeInfo: {
                make: model.typeInfo!.make,
                model: model.typeInfo!.model,
                licenseNeeded: model.typeInfo!.licenseID
            }
        })
    }
}