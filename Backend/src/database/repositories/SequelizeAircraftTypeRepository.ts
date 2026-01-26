import { IAircraftTypeRepository } from "../../iRepositories/IAircraftTypeRepository";
import { AircraftType } from "../../models/AircraftType";
import { AircraftTypeModel } from "../models/AircraftTypeModel";

export class SequelizeAircraftTypeRepository implements IAircraftTypeRepository {

    async getAircraftTypeByID(id: number): Promise<AircraftType | null> {
        const row: AircraftTypeModel | null = await AircraftTypeModel.findByPk(id);
        
        if( row === null)
              return row
        
        return this.toAircraftType(row);
    }

    private toAircraftType(model: AircraftTypeModel): AircraftType {
        return new AircraftType({
            aircraftTypeID: model.aircraftTypeID,
            make: model.make,
            model: model.model,
            licenseID: model.licenseID,
            totalSeating: model.totalSeating
        });
    }

}