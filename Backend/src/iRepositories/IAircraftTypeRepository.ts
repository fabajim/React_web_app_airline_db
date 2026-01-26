import { AircraftType } from "../models/AircraftType";

export interface IAircraftTypeRepository {
    getAircraftTypeByID(id: number): Promise<AircraftType | null>;
}