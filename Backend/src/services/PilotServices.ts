import { error } from 'node:console';
import { CreatePilotDto } from '../dtos/Pilot/CreatePilotDto';
import { IPilotRepository } from '../interfaceRepo/IPilotRepository'
import { PilotMappers } from '../mappers/PilotMappers';
import { Pilot } from '../models/Pilot';

export class PilotServices {
    constructor(private readonly pilotRepo: IPilotRepository) {}

    async createPilot(dto: CreatePilotDto) {
        const pilot = await this.pilotRepo.create(dto);
        return PilotMappers.toPilotDto(pilot);
    }

    async getAllPilots(): Promise<Pilot[]> {
        return this.pilotRepo.findAll();
    }
}