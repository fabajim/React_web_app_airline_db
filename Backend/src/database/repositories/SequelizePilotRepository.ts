import { where } from "sequelize";
import { CreatePilotDto } from "../../dtos/Pilot/CreatePilotDto";
import { IPilotRepository } from "../../interfaceRepo/IPilotRepository";
import { Pilot } from "../../models/Pilot";
import { PilotModel } from "../models/PilotModel";
import { NotFoundError } from "../../shared/Errors";
import { UpdatePilotDto } from "../../dtos/Pilot/UpdatePilotDto";

export class SequelizePilotRepository implements IPilotRepository {

    async update(id: number, pilot: UpdatePilotDto): Promise<Pilot> {
        const pilotToUpdate: PilotModel | null = await PilotModel.findByPk(id);

        if (!pilotToUpdate) {
            throw new NotFoundError('Pilot', id);
        }
        
        await pilotToUpdate.update({
            fname: pilot.fname,
            lname: pilot.lname,
            email: pilot.email,
            phoneNumber: pilot.phoneNumber
        });

        return this.toPilot(pilotToUpdate);
    }

    async deleteById(id: number): Promise<void> {
        const pilotToDelete: PilotModel | null = await PilotModel.findByPk(id);
        if (!pilotToDelete) {
            throw new NotFoundError('Pilot', id);
        }
        console.log("Pilot found")
        await pilotToDelete.destroy();
    }

    async findById(id: number): Promise<Pilot> {
        const pilot: PilotModel | null = await PilotModel.findByPk(id);

        if (!pilot) {
            throw new NotFoundError('Pilot', id);
        }

        return this.toPilot(pilot);
    }
    
    async create(data: CreatePilotDto): Promise<Pilot> {
        const pilot: PilotModel = await PilotModel.create(data);

        return this.toPilot(pilot);
    }
    
    async findAll(): Promise<Pilot[]> {
        const rows: PilotModel[] = await PilotModel.findAll();

        return rows.map(row => this.toPilot(row));
    }

    private toPilot(model: PilotModel): Pilot {
        return new Pilot({
            pilotID: model.pilotID,
            fname: model.fname,
            lname: model.lname,
            email: model.email,
            phoneNumber: model.phoneNumber
        })
    }
}