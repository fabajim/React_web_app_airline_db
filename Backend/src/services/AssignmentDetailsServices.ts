import { AddPilotAssignmentDto } from "../dtos/assignmentDetails/AddPilotAssignmentDto";
import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { CreateAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { RemovePilotDto } from "../dtos/assignmentDetails/RemovePilotDto";
import { UpdateAssignmentLocation } from "../dtos/assignmentDetails/UpdateAssignmentLocation";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAirportRepository } from "../iRepositories/IAirportRepository";
import { IAssignmentDetailsRepository } from "../iRepositories/IAssignmentDetailsRepository";
import { IPilotRepository } from "../iRepositories/IPilotRepository";
import { Aircraft } from "../models/Aircraft";
import { Airport } from "../models/Airport";
import { AssignmentDetails } from "../models/AssignmentDetails";
import { Pilot } from "../models/Pilot";
import { BadValidation, NotFound } from "../responses/Responses";
import { Result } from "../responses/types";

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

    async getByIdToView(id: number): Promise<Result<AssignmentDetailsDto>> {
        const viewDto: AssignmentDetailsDto | null = await this.repo.getByIdView(id);

        if (viewDto === null)
            return { ok: false, error: new NotFound(id, "Assignment") };

        return { ok: true, value: viewDto };
    }

    async createAssignmentDetail(assignmentDto: CreateAssignmentDto): 
    Promise<Result<AssignmentDetailsDto>> {
        if (!await this.validateCreateDtoData(assignmentDto))
            return { ok: false, error: new BadValidation("Invalid data!") }

        const newAssignment: AssignmentDetails = await this.repo.createAssignment(assignmentDto);

        const dto: AssignmentDetailsDto | null = await this.repo.getByIdView(newAssignment.assignmentId);

        if(dto === null)
            return { ok: false, error: new NotFound(0, "New Assignment") }

        return { ok: true, value: dto };
    }

    async removePilotFromAssignment(id: number, dto: RemovePilotDto): 
    Promise<Result<AssignmentDetailsDto>> {
        const createDto: CreateAssignmentDto = {
            pilotID: dto.pilotID,
            aircraftID: dto.aircraftID,
            airportID: dto.airportID,
            isActive: dto.isActive
        }

        if (createDto.pilotID !== null)
            return { ok: false, error: new BadValidation("Pilot must be removed")  };

        const current: AssignmentDetails | null = await this.repo.getByIdDomain(id);

        if (!current)
            return { ok: false, error: new NotFound(id, "Assignment") };

        if (
            current.pilotId === null                     ||
            !this.isSameAirportAndAircraft(current, dto) ||
            !await this.validateCreateDtoData(createDto) 
        ) {
            return { ok: false, error: new BadValidation(
                `Cannot remove null pilot, Aircraft and airport must remain the same,
                 or invalid data for creating a new assignment.`
            ) }
        }
        
        current.updateAssignmentStatus(false);
        await this.repo.closeAssignment(id);

        const newAssignment = await this.repo.createAssignment(createDto);
        const newDto: AssignmentDetailsDto|null = await this.repo.getByIdView(newAssignment.assignmentId)
        
        if (!newDto)
            return { ok: false, error: new NotFound(0, "New Assignment.") }

        return { ok: true, value: newDto };
    }

    async addPilot(id: number, dto: AddPilotAssignmentDto): 
    Promise<Result<AssignmentDetailsDto>> {
        const current: AssignmentDetails | null = await this.repo.getByIdDomain(id);
        
        if(!current)
            return { ok: false, error: new NotFound(id, "Assignment") };

        if (
            current.pilotId !== null ||
            !this.isSameAirportAndAircraft(current, dto)
        ) {
            return { ok: false, error: new BadValidation() }
        }

        const createDto: CreateAssignmentDto = {
            pilotID: dto.pilotID,
            aircraftID: dto.aircraftID,
            airportID: dto.airportID,
            isActive: true        
        };

        if (!await this.validateCreateDtoData(createDto))
            return { ok: false, error: new BadValidation() };
        
        current.updateAssignmentStatus(false);
        await this.repo.closeAssignment(id);

        const newAssignment = await this.repo.createAssignment(createDto);
        const newDto: AssignmentDetailsDto|null = await this.repo.getByIdView(newAssignment.assignmentId)
        
        if (!newDto)
            return { ok: false, error: new NotFound(0, "New assignment.") };

        return { ok: true, value: newDto };
    }

    async updateLocation(id: number, dto: UpdateAssignmentLocation):
    Promise<Result<AssignmentDetailsDto>> {
        const current: AssignmentDetails|null = await this.repo.getByIdDomain(id);

        if (!current)
            return { ok: false, error: new NotFound(id, "Assignment") };

        if (
            current.aircraftId !== dto.aircraftID ||
            current.pilotId !== dto.pilotID       ||
            current.airportId === dto.airportID
        ){
            return { ok: false, error: new BadValidation("Aircraft, Pilot, and Airport cannot change.") } ;
        }

        const createDto: CreateAssignmentDto = {
            pilotID: dto.pilotID,
            aircraftID: dto.aircraftID,
            airportID: dto.airportID,
            isActive: true   
        }

        await this.repo.closeAssignment(id);
        current.updateAssignmentStatus(false);

        if (!await this.validateCreateDtoData(createDto)){
            await this.repo.undoClosedAssignment(id);
            current.updateAssignmentStatus(true);
            return { ok: false, error: new BadValidation("Invalid data to update assignment.") };
        }
            

        const newAssignment = await this.repo.createAssignment(createDto);
        const newDto: AssignmentDetailsDto|null = await this.repo.getByIdView(newAssignment.assignmentId)
        
        if (!newDto)
            return { ok: false, error: new NotFound(0, "Updated Assignment.") };

        return { ok: true, value: newDto };
    }

    private async validateCreateDtoData(dto: CreateAssignmentDto): Promise<boolean> {
        const current: AssignmentDetails[] = await this.repo.getAllActiveDomain();

        const aircraft: Aircraft|null = await this.aircraftRepo.getById(dto.aircraftID);
        const airport: Airport|null = await this.airportRepo.getById(dto.airportID);

        if (!aircraft || !airport) { return false; }

        if (aircraft.isAssigned(current)) { return false; }

        if(!dto.pilotID) { return true; }
        
        const pilot: Pilot|null = await this.pilotRepo.findById(dto.pilotID);

        if (!pilot) { return false; }

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
            currentAssignment.airportId !== update.airportID   ||
            !currentAssignment.isActive) 
            return false;
        
        return true;
    }
}