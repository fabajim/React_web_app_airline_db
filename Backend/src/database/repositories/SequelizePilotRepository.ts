import { IPilotRepository } from "../../interfaceRepo/IPilotRepository";
import { Pilot } from "../../models/Pilot";
import { PilotModel } from "../models/PilotModel";

export class SequelizePilotRepository implements IPilotRepository {
    
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