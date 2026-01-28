import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { IAssignmentDetailsRepository } from "../iRepositories/IAssignmentDetailsRepository";
import { NotFoundError } from "../shared/Errors";

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

    async getByIdToView(id: number): Promise<AssignmentDetailsDto> {
        const viewDto: AssignmentDetailsDto | null = await this.repo.getByIdView(id);
        
        if (viewDto === null)
            throw new NotFoundError('Assignment', id);

        return viewDto;
    }
}