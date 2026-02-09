import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { CreateAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { AssignmentDetails } from "../models/AssignmentDetails";

export interface IAssignmentDetailsRepository {

    // Get assignments for dto view only
    getAllView(): Promise<AssignmentDetailsDto[]>
    getAllActiveView(): Promise<AssignmentDetailsDto[]>
    getAllMissingPilotView(): Promise<AssignmentDetailsDto[]>
    getByIdView(id: number): Promise<AssignmentDetailsDto | null>

    // get assignment for domain model only
    getByIdDomain(id: number): Promise<AssignmentDetails | null>
    getAllActiveDomain(): Promise<AssignmentDetails[]>

    closeAssignment(id: number): Promise<boolean>
    undoClosedAssignment(id: number): Promise<boolean>
    createAssignment(data: CreateAssignmentDto): Promise<AssignmentDetails>
}