import { IAircraftRepository } from "../iRepositories/IAircraftRepository";
import { Aircraft } from "../models/Aircraft";

export class AircraftServices {
    constructor(private readonly aircraftRepo: IAircraftRepository) {}

    async getAllAircraft(): Promise<Aircraft[]> {
        return this.aircraftRepo.findAll();
    }

    async getAircraftById(id: number): Promise<Aircraft> {
        return this.aircraftRepo.getById(id)
    }
}