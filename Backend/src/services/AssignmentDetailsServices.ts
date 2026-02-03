import { plainToInstance } from "class-transformer";
import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { createAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { RemovePilotDto } from "../dtos/assignmentDetails/RemovePilotDto";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAirportRepository } from "../iRepositories/IAirportRepository";
import { IAssignmentDetailsRepository } from "../iRepositories/IAssignmentDetailsRepository";
import { IPilotRepository } from "../iRepositories/IPilotRepository";
import { Aircraft } from "../models/Aircraft";
import { Airport } from "../models/Airport";
import { AssignmentDetails } from "../models/AssignmentDetails";
import { Pilot } from "../models/Pilot";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../shared/Errors";
import { validate, ValidationError } from "class-validator";

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

    async removePilotFromAssignment(id: number, dto: RemovePilotDto): 
    Promise<AssignmentDetailsDto> {
        const createDto: createAssignmentDto = {
            pilotID: dto.pilotID,
            aircraftID: dto.aircraftID,
            airportID: dto.airportID,
            isActive: dto.isActive
        }

        if (createDto.pilotID !== null) {
            console.log("Pilot was not null");
            throw new BadRequestError('AssignmentDetails');
        }

        const assignment: AssignmentDetails | null = await this.repo.getByIdDomain(id);

        if (!assignment){
            console.log("Assignment was not found in remove");
            throw new BadRequestError('AssignmentDetails');
        }

        if (assignment.aircraftId !== createDto.aircraftID ||
            assignment.airportId !== createDto.airportID ||
            !assignment.isActive) {
            console.log('aircraft and airport not matching!');
            throw new BadRequestError('AssignmentDetails');
        }
        
        this.repo.updateStatus(id);
        assignment.closeAssignment();

        return this.createAssignmentDetail(createDto);
    }

    async createAssignmentDetail(assignmentDto: createAssignmentDto): 
    Promise<AssignmentDetailsDto> {
        if (!await this.isValidDataForNewAssignment(assignmentDto))
            throw new BadRequestError('AssignmentDetails');

        const newAssignment: AssignmentDetails = await this.repo.createAssignment(assignmentDto);

        const dto: AssignmentDetailsDto | null = await this.repo.getByIdView(newAssignment.assignmentId);

        if(dto === null)
            throw new NotFoundError('Assignment', newAssignment.assignmentId);

        return dto;
    }

    private async isValidDataForNewAssignment(dto: createAssignmentDto):
     Promise<boolean> {
        const activeAssignments: AssignmentDetails[] = await this.repo.getAllActiveDomain();
        const aircraft: Aircraft | null = await this.aircraftRepo.getById(dto.aircraftID);
        const airport: Airport | null = await this.airportRepo.getById(dto.airportID);

        if (!aircraft || !airport) return false;

        if (!await this.validateAircraftData(dto, activeAssignments)) return false;

        if (dto.pilotID && !await this.validatePilotData(dto.pilotID, dto.aircraftID, activeAssignments)) {
            return false
        }
        return true
    }

    private async validatePilotData(
        pilotId: number, 
        aircraftId: number, 
        currentAssignments: AssignmentDetails[]): 
    Promise<boolean> {

        const pilot: Pilot | null = await this.pilotRepo.findById(pilotId);
        if (!pilot) return false;
        const isQualified: boolean =  pilot.hasLicense(aircraftId);
        
        const isNotAssigned: boolean = currentAssignments.some(a =>
            a.pilotId !== pilotId
        );

        return isQualified && isNotAssigned
    }

    private async validateAircraftData(
         dto: createAssignmentDto,
         currentAssignments: AssignmentDetails[]
        ): Promise<Boolean> {

        const isAssigned: boolean = currentAssignments.some(a =>
            a.aircraftId === dto.aircraftID
        );

        return isAssigned ? false : true;
    }
}