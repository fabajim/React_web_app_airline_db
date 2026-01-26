import { IAircraftTypeRepository } from "../iRepositories/IAircraftTypeRepository";
import { AircraftType } from "../models/AircraftType";

export class AircraftTypeServices {
    constructor(private readonly repo: IAircraftTypeRepository) {}

    async getByID(id: number): Promise<AircraftType | null> {
        return this.repo.getAircraftTypeByID(id);
    }
}