import { AircraftDto } from "../dtos/aircraft/AircraftDto";
import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { IAircraftTypeRepository } from "../iRepositories/IAircraftTypeRepository";
import { Aircraft } from "../models/Aircraft";
import { AircraftType } from "../models/AircraftType";
import { NotFoundError } from "../shared/Errors";

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

        const newAircraft: Aircraft = await this.aircraftRepo.create(data);
        return this.getAircraftById(newAircraft.aircraftId);
    }
}