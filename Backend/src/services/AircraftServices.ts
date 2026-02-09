import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { UpdateAircraftDto } from "../dtos/aircraft/UpdateAircraftDto";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAircraftTypeRepository } from "../iRepositories/IAircraftTypeRepository";
import { Aircraft } from "../models/Aircraft";
import { AircraftType } from "../models/AircraftType";
import { NotFound, BadValidation } from "../responses/Responses";
import { Result } from "../responses/types";

export class AircraftServices {
    constructor(private readonly aircraftRepo: IAircraftRepository,
        private readonly aircraftTypeRepo: IAircraftTypeRepository
    ) {}

    async getAllAircraft(): Promise<Aircraft[]> {
        return this.aircraftRepo.findAll();
    }

    async getAircraftById(id: number): 
    Promise<Result<Aircraft>> {
        const aircraft: Aircraft | null = await this.aircraftRepo.getById(id)

        if (!aircraft)
            return { ok: false, error: new NotFound(id, "Aircraft") };

        return { ok: true, value: aircraft };
    }

    async createAircraft(data: CreateAircraftDto): 
    Promise<Result<Aircraft>> {
        const aircraftTypeId: number = data.aircraftTypeID;

        // check if the aircraft type id exists in database before adding new aircraft
        const aircraftType: AircraftType | null = 
          await this.aircraftTypeRepo.getAircraftTypeByID(aircraftTypeId);
        
        if (aircraftType === null)
            return { ok: false, error: new BadValidation("Aircraft type does not exist.")};

        const newAircraft: Aircraft | null =  await this.aircraftRepo.create(data);

        if (newAircraft === null)
            return { ok: false, error: new NotFound(0, "New Aircraft") };

        return { ok: true, value: newAircraft };

    }

    async UpdateAircraftById(id: number, data: UpdateAircraftDto): 
    Promise<Result<Aircraft>> {
        const aircraft: Aircraft | null = await this.aircraftRepo.getById(id);

        if (!aircraft)
            return { ok: false, error: new NotFound(id, "Aircraft") };

        const savedDate: Date = new Date(aircraft.lastServiceDate);
        const savedHours: number = aircraft.hoursFlown;

        // Can't update to previous date or less hours!
        if (savedDate.getTime() > data.lastService.getTime() || 
            savedHours > data.totalHourFlown) {
            return { ok: false, error: new BadValidation("Date and hours cannot update backwards!") };
        }

        const result: Aircraft | null = await this.aircraftRepo.updateById(id, data);

        if(!result)
            return { ok: false, error: new NotFound(id, "Updated Aircraft") }

        return { ok: true, value: result };
    }
}