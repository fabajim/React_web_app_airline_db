import { CreatePilotDto } from "../../dtos/Pilot/CreatePilotDto";
import { IPilotRepository } from "../../interfaceRepo/IPilotRepository";
import { Pilot } from "../../models/Pilot";
import { PilotModel } from "../models/PilotModel";

export class SequelizePilotRepository implements IPilotRepository {

    async findById(id: number): Promise<Pilot> {
        const pilot = await PilotModel.findByPk(id);

        if (!pilot) {
            throw new Error('Pilot not found.');
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