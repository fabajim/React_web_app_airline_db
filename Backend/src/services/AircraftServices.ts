import { AircraftDto } from "../dtos/aircraft/AircraftDto";
import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { UpdateAircraftDto } from "../dtos/aircraft/UpdateAircraftDto";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAircraftTypeRepository } from "../iRepositories/IAircraftTypeRepository";
import { Aircraft } from "../models/Aircraft";
import { AircraftType } from "../models/AircraftType";
import { BadRequestError, DateAndHoursError, NotFoundError } from "../shared/Errors";

export class AircraftServices {
    constructor(private readonly aircraftRepo: IAircraftRepository,
        private readonly aircraftTypeRepo: IAircraftTypeRepository
    ) {}

    async getAllAircraft(): Promise<Aircraft[]> {
        return this.aircraftRepo.findAll();
    }

    async getAircraftById(id: number): Promise<Aircraft> {
        const aircraft: Aircraft | null = await this.aircraftRepo.getById(id)

        if (!aircraft)
            throw new NotFoundError('Aircraft', id);

        return aircraft
    }

    async createAircraft(data: CreateAircraftDto): Promise<Aircraft> {
        const aircraftTypeId: number = data.aircraftTypeID;

        // check if the aircraft type id exists in database before adding new aircraft
        const aircraftType: AircraftType | null = 
          await this.aircraftTypeRepo.getAircraftTypeByID(aircraftTypeId);
        
        if (aircraftType === null)
            throw new BadRequestError('Aircraft Type Does Not Exists');

        const newAircraft: Aircraft | null =  await this.aircraftRepo.create(data);

        if (newAircraft === null)
            throw new BadRequestError('Could not get new aircraft');

        return newAircraft;

    }

    async UpdateAircraftById(id: number, data: UpdateAircraftDto): Promise<Aircraft> {
        const aircraft: Aircraft | null = await this.aircraftRepo.getById(id);

        if (!aircraft)
            throw new NotFoundError('Aircraft', id);

        const savedDate: Date = new Date(aircraft.lastServiceDate);
        const savedHours: number = aircraft.hoursFlown;

        // Can't update to previous date or less hours!
        if (savedDate.getTime() > data.lastService.getTime() || 
            savedHours > data.totalHourFlown) {
            throw new DateAndHoursError();
        }

        const updatedAircraft: Aircraft = await this.aircraftRepo.updateById(id, data);
        return updatedAircraft;
    }
}