import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { IAssignmentDetailsRepository } from "../iRepositories/IAssignmentDetailsRepository";

export class AssignmentDetailsServices {
    constructor(private readonly repo: IAssignmentDetailsRepository) {}

    async getAllAssignmentsToView(): Promise<AssignmentDetailsDto[]> {
        return this.repo.getAllView();   
    }

    async getActiveAssignmentsToView(): Promise<AssignmentDetailsDto[]> {
        return this.repo.getAllActiveView();
    }

    async getPilotNeededToView(): Promise<AssignmentDetailsDto[]> {
        return this.repo.getAllMissingPilotView();
    }
}