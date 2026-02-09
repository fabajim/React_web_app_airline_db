import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { UpdateAircraftDto } from "../dtos/aircraft/UpdateAircraftDto";
import { Aircraft } from "../models/Aircraft";

export interface IAircraftRepository {
    findAll(): Promise<Aircraft[]>;
    getById(id: number): Promise<Aircraft | null>;
    create(data: CreateAircraftDto): Promise<Aircraft | null>;
    updateById(id: number, data: UpdateAircraftDto): Promise<Aircraft | null>;
}