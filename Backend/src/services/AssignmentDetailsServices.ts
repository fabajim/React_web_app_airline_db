import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { createAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAirportRepository } from "../iRepositories/IAirportRepository";
import { IAssignmentDetailsRepository } from "../iRepositories/IAssignmentDetailsRepository";
import { IPilotRepository } from "../iRepositories/IPilotRepository";
import { AssignmentDetails } from "../models/AssignmentDetails";
import { NotFoundError, UnauthorizedError } from "../shared/Errors";

export class AssignmentDetailsServices {
    constructor(private readonly repo: IAssignmentDetailsRepository,
        private readonly pilotRepo: IPilotRepository,
        private readonly aircraftRepo: IAircraftRepository,
        private readonly airportRepo: IAirportRepository
    ) {}

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
        if (!await this.isValidDataForAssignment(assignmentDto))
            throw new UnauthorizedError('Pilot cannot be assigned to this aircraft!');
        
        console.log('Validation worked!')

        const assignment: AssignmentDetails | null =
            await this.repo.getByIdDomain(id);
        
        if (assignment === null)
            throw new NotFoundError('Assignment', id);

        if (!assignment.isActive)
            throw new UnauthorizedError("Cant update inactive assignment.");

        assignment.closeAssignment();

        await this.repo.updateStatus(id);  // sets isActive for current assignment to false

        const newAssignment: AssignmentDetails = await this.repo.createAssignment(assignmentDto);

        const dto: AssignmentDetailsDto | null = await this.repo.getByIdView(newAssignment.assignmentId);

        if(dto === null)
            throw new NotFoundError('Assignment', newAssignment.assignmentId);

        return dto;
    }

    private async isValidDataForAssignment(dto: createAssignmentDto): Promise<boolean> {
        const pilotId: number | null | undefined = dto.pilotID;
        const aircraftId: number = dto.aircraftID;
        const airportId: number = dto.airportID

        // This will check if aircraft/airport exists first! Throws error if not!
        const aircraft = await this.aircraftRepo.getById(aircraftId);
        const airport = await this.airportRepo.getById(airportId);

        // no need to validate a pilot coming off of assignment.
        if (!pilotId)
            return true             
        
        // This will check if provided pilot exists. Will throw error if not!
        const pilot = await this.pilotRepo.findById(pilotId);

        console.log(`Aircraft lic: ${aircraft.licenseNeeded}`);

        // This checks if pilot is qualifed to fly the aircraft.
        return pilot.hasLicense(aircraft.licenseNeeded);
    }
}