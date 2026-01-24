import { IAircraftRepository } from "../../iRepositories/IAircraftRepository";
import { Aircraft } from "../../models/Aircraft";
import { AircraftModel } from "../models/AircraftModel";
import { AircraftTypeModel } from "../models/AircraftTypeModel";

export class SequelizeAircraftRepository implements IAircraftRepository {

    async findAll(): Promise<Aircraft[]> {
        const rows = await AircraftModel.findAll({
            include: [{
                model: AircraftTypeModel,
                as: 'typeInfo',
                attributes: ['make', 'model']
            }]
        });

        return rows.map(row => new Aircraft({
            aircraftID: row.aircraftID,
            serialNum: row.serialNum,
            lastService: row.lastService,
            totalHourFlown: row.totalHourFlown,
            typeInfo: {
                make: row.typeInfo!.make,
                model: row.typeInfo!.model
            }
        }));
    }
}