import { AddPilotAssignmentDto } from "../dtos/assignmentDetails/AddPilotAssignmentDto";
import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { CreateAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { RemovePilotDto } from "../dtos/assignmentDetails/RemovePilotDto";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAirportRepository } from "../iRepositories/IAirportRepository";
import { IAssignmentDetailsRepository } from "../iRepositories/IAssignmentDetailsRepository";
import { IPilotRepository } from "../iRepositories/IPilotRepository";
import { Aircraft } from "../models/Aircraft";
import { Airport } from "../models/Airport";
import { AssignmentDetails } from "../models/AssignmentDetails";
import { Pilot } from "../models/Pilot";
import { BadRequestError, NotFoundError } from "../shared/Errors";

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

    async createAssignmentDetail(assignmentDto: CreateAssignmentDto): 
    Promise<AssignmentDetailsDto> {
        if (!await this.validateCreateDtoData(assignmentDto))
            throw new BadRequestError('AssignmentDetails');

        const newAssignment: AssignmentDetails = await this.repo.createAssignment(assignmentDto);

        const dto: AssignmentDetailsDto | null = await this.repo.getByIdView(newAssignment.assignmentId);

        if(dto === null)
            throw new NotFoundError('Assignment', 0);

        return dto;
    }

    async removePilotFromAssignment(id: number, dto: RemovePilotDto): 
    Promise<AssignmentDetailsDto> {
        const createDto: CreateAssignmentDto = {
            pilotID: dto.pilotID,
            aircraftID: dto.aircraftID,
            airportID: dto.airportID,
            isActive: dto.isActive
        }

        if (createDto.pilotID !== null) 
            throw new BadRequestError('AssignmentDetails - Pilot must be removed.');

        const current: AssignmentDetails | null = await this.repo.getByIdDomain(id);

        if (!current)
            throw new BadRequestError('Assignment to update not found');

        if (current.pilotId === null)
            throw new BadRequestError('Cannot remove null pilot!');

        if (!this.isSameAirportAndAircraft(current, dto))
            throw new BadRequestError('Aircraft and airport must be the same.');

        if (!this.validateCreateDtoData(createDto))
            throw new BadRequestError('Invalid data for creating new assignment.');
        
        current.closeAssignment();
        await this.repo.closeAssignment(id);

        const newAssignment = await this.repo.createAssignment(createDto);
        const newDto: AssignmentDetailsDto|null = await this.repo.getByIdView(newAssignment.assignmentId)
        
        if (!newDto)
            throw new NotFoundError('New Assignment', 0);

        return newDto;
    }

    async addPilot(id: number, dto: AddPilotAssignmentDto): 
    Promise<AssignmentDetailsDto> {
        const current: AssignmentDetails | null = await this.repo.getByIdDomain(id);
        
        if(!current)
            throw new BadRequestError('Assignment to update not found.');

        if(current.pilotId !== null)
            throw new BadRequestError('Current pilot must be removed first.')

        if (!this.isSameAirportAndAircraft(current, dto))
            throw new BadRequestError('Aircraft and airport must be the same.');

        const createDto: CreateAssignmentDto = {
            pilotID: dto.pilotID,
            aircraftID: dto.aircraftID,
            airportID: dto.airportID,
            isActive: true        
        }

        if (!this.validateCreateDtoData(createDto))
            throw new BadRequestError('New assignment details not valid.');
        
        current.closeAssignment();
        await this.repo.closeAssignment(id);

        const newAssignment = await this.repo.createAssignment(createDto);
        const newDto: AssignmentDetailsDto|null = await this.repo.getByIdView(newAssignment.assignmentId)
        
        if (!newDto)
            throw new NotFoundError('New Assignment', 0);

        return newDto;
    }

    private async validateCreateDtoData(dto: CreateAssignmentDto): Promise<boolean> {
        const current: AssignmentDetails[] = await this.repo.getAllActiveDomain();

        const aircraft: Aircraft|null = await this.aircraftRepo.getById(dto.aircraftID);
        const airport: Airport|null = await this.airportRepo.getById(dto.airportID);

        if (!aircraft || !airport) { return false; }

        if (aircraft.isAssigned(current)) { return false; }

        if(!dto.pilotID) { return true; }
        
        const pilot: Pilot|null = await this.pilotRepo.findById(dto.pilotID);

        if (!pilot) { throw new BadRequestError('Pilot not in database.'); }

        if (!pilot.hasLicense(aircraft.licenseNeeded) ||
            pilot.isAssigned(current)
        ) { 
            return false;
         }

        return true
    }

    private isSameAirportAndAircraft(
      currentAssignment: AssignmentDetails, 
      update: RemovePilotDto | AddPilotAssignmentDto): 
      boolean {

        if (currentAssignment.aircraftId !== update.aircraftID ||
            currentAssignment.airportId !== update.airportID ||
            !currentAssignment.isActive) 
            return false;
        
        return true;
    }
}