import { CreatePilotDto } from "../dtos/Pilot/CreatePilotDto";
import { UpdatePilotDto } from "../dtos/Pilot/UpdatePilotDto";
import { PilotQueryObject } from "../helpers/queryObjects/PilotQueryObject";
import { Pilot } from "../models/Pilot";

export interface IPilotRepository {
    create(data: CreatePilotDto): Promise<Pilot>;
    update(id: number, data: UpdatePilotDto): Promise<Pilot>;
    findAll(query: PilotQueryObject): Promise<Pilot[]>;
    findById(id: number): Promise<Pilot>;
    deleteById(id: number): void;
}