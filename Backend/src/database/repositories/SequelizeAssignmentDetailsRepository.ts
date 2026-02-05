import { AssignmentDetailsDto } from "../../dtos/assignmentDetails/AssignmentDetailsDto";
import { CreateAssignmentDto } from "../../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { IAssignmentDetailsRepository } from "../../iRepositories/IAssignmentDetailsRepository";
import { AssignmentDetails } from "../../models/AssignmentDetails";
import { NotFoundError } from "../../shared/Errors";
import { AircraftModel } from "../models/AircraftModel";
import { AirportModel } from "../models/AirportModel";
import { AssignmentDetailsModel } from "../models/AssignmentDetailsModel";
import { PilotModel } from "../models/PilotModel";

export class SequelizeAssignmentDetailsRepository implements
IAssignmentDetailsRepository {

    async getAllMissingPilotView(): Promise<AssignmentDetailsDto[]> {
        const rows: AssignmentDetailsModel[] = await AssignmentDetailsModel.findAll({
            where: { isActive: true, pilotID: null },
            include: [
                { model: PilotModel, as: 'pilot', attributes: ['pilotID', 'fname', 'lname'] },
                { model: AircraftModel, as: 'aircraft', attributes: ['aircraftID', 'serialNum'] },
                { model: AirportModel, as: 'airport', attributes: ['airportID', 'cityCode'] }
            ]
        });

        return rows.map( r => this.toAssignmentDetailsDtoView(r));
    }

    async getAllView(): Promise<AssignmentDetailsDto[]> {
        const rows: AssignmentDetailsModel[] = await AssignmentDetailsModel.findAll({
            include: [
                { model: PilotModel, as: 'pilot', attributes: ['pilotID', 'fname', 'lname'] },
                { model: AircraftModel, as: 'aircraft', attributes: ['aircraftID', 'serialNum'] },
                { model: AirportModel, as: 'airport', attributes: ['airportID', 'cityCode'] }
            ]
        });

        return rows.map(r => this.toAssignmentDetailsDtoView(r));
    }

    async getAllActiveDomain(): Promise<AssignmentDetails[]> {
        const rows: AssignmentDetailsModel[] = await AssignmentDetailsModel.findAll({
            where: { isActive: true },
        });

        return rows.map( r => this.toDomainModel(r));
    }

    async getAllActiveView(): Promise<AssignmentDetailsDto[]> {
        const rows: AssignmentDetailsModel[] = await AssignmentDetailsModel.findAll({
            where: { isActive: true },
            include: [
                { model: PilotModel, as: 'pilot', attributes: ['pilotID', 'fname', 'lname'] },
                { model: AircraftModel, as: 'aircraft', attributes: ['aircraftID', 'serialNum'] },
                { model: AirportModel, as: 'airport', attributes: ['airportID', 'cityCode'] }
            ]
        });

        return rows.map( r => this.toAssignmentDetailsDtoView(r));
    }

    async getByIdView(id: number): Promise<AssignmentDetailsDto | null> {
        const row: AssignmentDetailsModel | null = await AssignmentDetailsModel.findByPk(id, {
            include: [
                { model: PilotModel, as: 'pilot', attributes: ['pilotID', 'fname', 'lname'] },
                { model: AircraftModel, as: 'aircraft', attributes: ['aircraftID', 'serialNum'] },
                { model: AirportModel, as: 'airport', attributes: ['airportID', 'cityCode'] }
            ]
        });

        return row ? this.toAssignmentDetailsDtoView(row) : null;
    }

    async getByIdDomain(id: number): Promise<AssignmentDetails | null> {
        const row: AssignmentDetailsModel | null = await AssignmentDetailsModel.findByPk(id, {
            include: [
                { model: PilotModel, as: 'pilot', attributes: ['pilotID', 'fname', 'lname'] },
                { model: AircraftModel, as: 'aircraft', attributes: ['aircraftID', 'serialNum'] },
                { model: AirportModel, as: 'airport', attributes: ['airportID', 'cityCode'] }
            ]
        });

        return row ? this.toDomainModel(row) : null
    }

    async closeAssignment(id: number): Promise<void> {
        const row: AssignmentDetailsModel | null = 
            await AssignmentDetailsModel.findByPk(id);
        
        if (row === null)
            throw new NotFoundError('Assignment', id);

        await row.update({
            isActive: false
        });
    }
    
    async createAssignment(data: CreateAssignmentDto): Promise<AssignmentDetails> {
        const assignment: AssignmentDetailsModel = await AssignmentDetailsModel.create(data);
        return this.toDomainModel(assignment);
    }

    private toAssignmentDetailsDtoView(model: AssignmentDetailsModel): AssignmentDetailsDto {
        return {
            assignmentId: model.assignmentDetailID,
            pilotId: model.pilotID,
            pilotName: model.pilot 
                       ? `${model.pilot?.fname} ${model.pilot?.lname}` 
                       : "No Pilot Assigned",
            aircraftId: model.aircraftID,
            aircraftSerial: model.aircraft!.serialNum,
            airportId: model.airport!.airportID,
            airportCode: model.airport!.cityCode,
            isActive: model.isActive
        }
    }

    private toDomainModel(model: AssignmentDetailsModel): AssignmentDetails {
        return new AssignmentDetails({
            assignmentId: model.assignmentDetailID,
            pilotId: model.pilotID
                     ? model.pilotID
                     : null,
            aircraftId: model.aircraftID,
            airportId: model.airportID,
            isActive: model.isActive
        })
    }

}