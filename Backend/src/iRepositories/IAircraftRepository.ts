import { Aircraft } from "../models/Aircraft";

export interface IAircraftRepository {
    findAll(): Promise<Aircraft[]>;
}