import { CreatePilotDto } from '../dtos/Pilot/CreatePilotDto';
import { UpdatePilotDto } from '../dtos/Pilot/UpdatePilotDto';
import { PilotQueryObject } from '../helpers/queryObjects/PilotQueryObject';
import { IPilotRepository } from '../iRepositories/IPilotRepository'
import { Pilot } from '../models/Pilot';
import { NotFoundError } from '../shared/Errors';

export class PilotServices {
    constructor(private readonly pilotRepo: IPilotRepository) {}

    async createPilot(dto: CreatePilotDto): Promise<Pilot> {
        const pilot: Pilot = await this.pilotRepo.create(dto);
        return pilot;
    }

    async updatePilot(id: number, dto: UpdatePilotDto): Promise<Pilot> {
        const pilot: Pilot | null = await this.pilotRepo.update(id, dto);

        if (!pilot)
            throw new NotFoundError('Pilot', id);

        return pilot;
    }

    async getAllPilots(pilotQuery: PilotQueryObject): Promise<Pilot[]> {
        return this.pilotRepo.findAll(pilotQuery);
    }

    async getPilotById(id: number): Promise<Pilot> {
        const pilot: Pilot | null = await this.pilotRepo.findById(id);

        if (!pilot)
            throw new NotFoundError('Pilot', id);

        return pilot;
    }

    async deletePilotById(id: number) {
        await this.pilotRepo.deleteById(id);
    }
}