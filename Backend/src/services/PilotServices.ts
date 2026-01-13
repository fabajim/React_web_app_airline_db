import { IPilotRepository } from '../interfaceRepo/IPilotRepository'
import { Pilot } from '../models/Pilot';

export class PilotServices {
    constructor(private readonly pilotRepo: IPilotRepository) {}

    async getAllPilots(): Promise<Pilot[]> {
        return this.pilotRepo.findAll();
    }
}