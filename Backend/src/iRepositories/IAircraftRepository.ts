import { AircraftDto } from "../dtos/aircraft/AircraftDto";
import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { Aircraft } from "../models/Aircraft";

export interface IAircraftRepository {
    findAll(): Promise<Aircraft[]>;
    getById(id: number): Promise<Aircraft>;
    create(data: CreateAircraftDto): Promise<Aircraft>;
}