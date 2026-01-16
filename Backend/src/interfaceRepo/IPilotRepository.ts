import { CreatePilotDto } from "../dtos/Pilot/CreatePilotDto";
import { Pilot } from "../models/Pilot";

export interface IPilotRepository {
    create(data: CreatePilotDto): Promise<Pilot>;
    findAll(): Promise<Pilot[]>;
    findById(id: number): Promise<Pilot>;
    deleteById(id: number): void;
}