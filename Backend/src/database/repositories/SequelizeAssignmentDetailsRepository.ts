import { AssignmentDetailsDto } from "../../dtos/assignmentDetails/AssignmentDetailsDto";
import { IAssignmentDetailsRepository } from "../../iRepositories/IAssignmentDetailsRepository";
import { AircraftModel } from "../models/AircraftModel";
import { AirportModel } from "../models/AirportModel";
import { AssignmentDetailsModel } from "../models/AssignmentDetailsModel";
import { PilotModel } from "../models/PilotModel";

export class SequelizeAssignmentDetailsRepository implements
IAssignmentDetailsRepository {

    async getAllView(): Promise<AssignmentDetailsDto[]> {
        const rows = await AssignmentDetailsModel.findAll({
            include: [
                { model: PilotModel, as: 'pilot', attributes: ['pilotID', 'fname', 'lname'] },
                { model: AircraftModel, as: 'aircraft', attributes: ['aircraftID', 'serialNum'] },
                { model: AirportModel, as: 'airport', attributes: ['airportID', 'cityCode'] }
            ]
        });

        return rows.map(r => this.toAssignmentDetailsDtoView(r));
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

}