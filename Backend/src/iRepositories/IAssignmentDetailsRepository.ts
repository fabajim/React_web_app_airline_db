import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { AssignmentDetails } from "../models/AssignmentDetails";

export interface IAssignmentDetailsRepository {

    // Get assignments for dto view only
    getAllView(): Promise<AssignmentDetailsDto[]>
    getAllActiveView(): Promise<AssignmentDetailsDto[]>
    getAllMissingPilotView(): Promise<AssignmentDetailsDto[]>
    getByIdView(id: number): Promise<AssignmentDetailsDto>

    // get assignment for domain model only
    getByIdDomain(id: number): Promise<AssignmentDetails>

    updateStatus(): Promise<void>
    createAssignment(): Promise<AssignmentDetails>
}