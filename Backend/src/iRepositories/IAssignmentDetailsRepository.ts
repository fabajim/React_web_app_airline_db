import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { AssignmentDetails } from "../models/AssignmentDetails";

export interface IAssignmentDetailsRepository {

    // Get assignments for dto view only
    getAllView(): Promise<AssignmentDetailsDto[]>
    getByIdView(): Promise<AssignmentDetailsDto>

    // get assignment for domain model only
    getByIdDomain(): Promise<AssignmentDetails>
}