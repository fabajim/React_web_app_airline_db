import { where } from "sequelize";
import { CreatePilotDto } from "../../dtos/Pilot/CreatePilotDto";
import { IPilotRepository } from "../../interfaceRepo/IPilotRepository";
import { Pilot } from "../../models/Pilot";
import { PilotModel } from "../models/PilotModel";
import { NotFoundError } from "../../shared/Errors";

export class SequelizePilotRepository implements IPilotRepository {

    async deleteById(id: number): Promise<void> {
        const pilotToDelete = await PilotModel.findByPk(id);
        if (!pilotToDelete) {
            throw new NotFoundError('Pilot', id);
        }
        console.log("Pilot found")
        await pilotToDelete.destroy();
    }

    async findById(id: number): Promise<Pilot> {
        const pilot = await PilotModel.findByPk(id);

        if (!pilot) {
            throw new NotFoundError('Pilot', id);
        }

        return new Pilot({
            pilotID: pilot.pilotID,
            fname: pilot.fname,
            lname: pilot.lname,
            email: pilot.email,
            phoneNumber: pilot.phoneNumber
        });
    }
    
    async create(data: CreatePilotDto): Promise<Pilot> {
        const pilot = await PilotModel.create(data);

        return new Pilot({
            pilotID: pilot.pilotID,
            fname: pilot.fname,
            lname: pilot.lname,
            email: pilot.email,
            phoneNumber: pilot.phoneNumber
        });
    }
    
    async findAll(): Promise<Pilot[]> {
        const rows = await PilotModel.findAll();

        return rows.map(row => new Pilot({
            pilotID: row.pilotID,
            fname: row.fname,
            lname: row.lname,
            email: row.email,
            phoneNumber: row.phoneNumber
        }));
    }

}