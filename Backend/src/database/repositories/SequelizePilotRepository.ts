import { where, Op, WhereOptions } from "sequelize";
import { CreatePilotDto } from "../../dtos/Pilot/CreatePilotDto";
import { IPilotRepository } from "../../iRepositories/IPilotRepository";
import { Pilot } from "../../models/Pilot";
import { PilotAttributes, PilotModel } from "../models/PilotModel";
import { UpdatePilotDto } from "../../dtos/Pilot/UpdatePilotDto";
import { PilotQueryObject } from "../../helpers/queryObjects/PilotQueryObject";
import { LicenseModel } from "../models/LicenseModel";

export class SequelizePilotRepository implements IPilotRepository {

    async update(id: number, pilot: UpdatePilotDto): Promise<Pilot | null> {
        const pilotToUpdate: PilotModel | null = await PilotModel.findByPk(id);

        if (!pilotToUpdate) 
            return null;
        
        await pilotToUpdate.update({
            fname: pilot.fname,
            lname: pilot.lname,
            email: pilot.email,
            phoneNumber: pilot.phoneNumber
        });

        return this.toPilot(pilotToUpdate);
    }

    async deleteById(id: number): Promise<boolean> {
        const pilotToDelete: PilotModel | null = await PilotModel.findByPk(id);

        if (!pilotToDelete)
            return false;

        await pilotToDelete.destroy();

        return true;
    }

    async findById(id: number): Promise<Pilot | null> {
        const pilot: PilotModel | null = await PilotModel.findByPk(id, {
            include: [{
                model: LicenseModel,
                as: 'licenses',
                through: { 
                    attributes: ['dateReceived'] 
                }
            }]
        });

        if (!pilot) 
            return null;

        return this.toPilot(pilot);
    }
    
    async create(data: CreatePilotDto): Promise<Pilot> {
        const pilot: PilotModel = await PilotModel.create(data);
        return this.toPilot(pilot);
    }
    
    async findAll(pilotQuery: PilotQueryObject): Promise<Pilot[]> {
        const where: WhereOptions<PilotAttributes> | undefined = {};

        if (pilotQuery.fname) {
            where.fname = { [Op.like]: `${pilotQuery.fname}%` };
        }

        if (pilotQuery.lname) {
            where.lname = { [Op.like]: `${pilotQuery.lname}%` };
        }

        const rows: PilotModel[] = await PilotModel.findAll({ where, 
            include: [{
                model: LicenseModel,
                as: 'licenses',
                through: { attributes: ['dateReceived']  }
            }]
         });

        return rows.map(row => this.toPilot(row));
    }

    private toPilot(model: PilotModel): Pilot {

        const pilotLicenses = model.licenses?.map((l) => ({
            licenseID: l.licenseId,
            licenseType: l.licenseType,
            dateReceived: new Date(l.LicenseDetailModel!.dateReceived)
        })) ?? [];

        return new Pilot({
            pilotID: model.pilotID,
            fname: model.fname,
            lname: model.lname,
            email: model.email,
            phoneNumber: model.phoneNumber,
            licenses: pilotLicenses
        })
    }
}