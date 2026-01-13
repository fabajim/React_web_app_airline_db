import { Pilot } from "../models/Pilot";

export interface IPilotRepository {
    findAll(): Promise<Pilot[]>;
}