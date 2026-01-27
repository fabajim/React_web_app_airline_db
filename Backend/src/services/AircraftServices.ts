import { AircraftDto } from "../dtos/aircraft/AircraftDto";
import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { UpdateAircraftDto } from "../dtos/aircraft/UpdateAircraftDto";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAircraftTypeRepository } from "../iRepositories/IAircraftTypeRepository";
import { Aircraft } from "../models/Aircraft";
import { AircraftType } from "../models/AircraftType";
import { DateAndHoursError, NotFoundError } from "../shared/Errors";

export class AircraftServices {
    constructor(private readonly aircraftRepo: IAircraftRepository,
        private readonly aircraftTypeRepo: IAircraftTypeRepository
    ) {}

    async getAllAircraft(): Promise<Aircraft[]> {
        return this.aircraftRepo.findAll();
    }

    async getAircraftById(id: number): Promise<Aircraft> {
        return this.aircraftRepo.getById(id)
    }

    async createAircraft(data: CreateAircraftDto): Promise<Aircraft> {
        const aircraftTypeId: number = data.aircraftTypeID;

        // check if the aircraft type id exists in database before adding new aircraft
        const aircraftType: AircraftType | null = 
          await this.aircraftTypeRepo.getAircraftTypeByID(aircraftTypeId);
        
          if (aircraftType === null)
            throw new NotFoundError('AircraftType', aircraftTypeId);

        return await this.aircraftRepo.create(data);
    }

    async UpdateAircraftById(id: number, data: UpdateAircraftDto): Promise<Aircraft> {
        const aircraft: Aircraft = await this.aircraftRepo.getById(id);

        const savedDate: Date = new Date(aircraft.lastServiceDate);
        const savedHours: number = aircraft.hoursFlown;

        // Can't update to previous date or less hours!
        if (savedDate.getTime() > data.lastService.getTime() || 
            savedHours > data.totalHourFlown) {
            throw new DateAndHoursError();
        }

        await this.aircraftRepo.updateById(id, data);
        return await this.getAircraftById(id);
    }
}