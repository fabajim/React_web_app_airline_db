import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { createAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { IAssignmentDetailsRepository } from "../iRepositories/IAssignmentDetailsRepository";
import { AssignmentDetails } from "../models/AssignmentDetails";
import { NotFoundError, UnauthorizedError } from "../shared/Errors";

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

    async createAssignmentDetail(id: number, assignmentDto: createAssignmentDto): 
    Promise<AssignmentDetailsDto> {
        const assignment: AssignmentDetails | null =
            await this.repo.getByIdDomain(id);
        
        if (assignment === null)
            throw new NotFoundError('Assignment', id);

        if (!assignment.isActive)
            throw new UnauthorizedError();

        assignment.closeAssignment();

        await this.repo.updateStatus(id);

        const newAssignment: AssignmentDetails = await this.repo.createAssignment(assignmentDto);

        const dto: AssignmentDetailsDto | null = await this.repo.getByIdView(newAssignment.assignmentId);

        if(dto === null)
            throw new NotFoundError('Assignment', newAssignment.assignmentId);

        return dto;
    }
}