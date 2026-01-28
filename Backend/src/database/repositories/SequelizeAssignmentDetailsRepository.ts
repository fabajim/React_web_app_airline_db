import { AssignmentDetailsDto } from "../../dtos/assignmentDetails/AssignmentDetailsDto";
import { IAssignmentDetailsRepository } from "../../iRepositories/IAssignmentDetailsRepository";
import { AssignmentDetails } from "../../models/AssignmentDetails";
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

    async getByIdDomain(Id: number): Promise<AssignmentDetails> {
        throw new Error("Method not implemented.");
    }

    async updateStatus(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async createAssignment(): Promise<AssignmentDetails> {
        throw new Error("Method not implemented.");
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