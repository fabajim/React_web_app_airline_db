import { Aircraft } from "../models/Aircraft";

export interface IAircraftRepository {
    findAll(): Promise<Aircraft[]>;
    getById(id: number): Promise<Aircraft>;
}