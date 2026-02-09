import { CreatePilotDto } from '../dtos/Pilot/CreatePilotDto';
import { UpdatePilotDto } from '../dtos/Pilot/UpdatePilotDto';
import { PilotQueryObject } from '../helpers/queryObjects/PilotQueryObject';
import { IPilotRepository } from '../iRepositories/IPilotRepository'
import { Pilot } from '../models/Pilot';
import { NotFound } from '../responses/Responses';
import { Result } from '../responses/types';

export class PilotServices {
    constructor(private readonly pilotRepo: IPilotRepository) {}

    async createPilot(dto: CreatePilotDto): Promise<Pilot> {
        const pilot: Pilot = await this.pilotRepo.create(dto);
        return pilot;
    }

    async updatePilot(id: number, dto: UpdatePilotDto): Promise<Result<Pilot>> {
        const pilot: Pilot | null = await this.pilotRepo.update(id, dto);

        if (!pilot)
            return { ok: false, error: new NotFound(id, 'Pilot') }

        return { ok: true, value:pilot };
    }

    async getAllPilots(pilotQuery: PilotQueryObject): Promise<Pilot[]> {
        return this.pilotRepo.findAll(pilotQuery);
    }

    async getPilotById(id: number): Promise<Result<Pilot>> {
        const pilot: Pilot | null = await this.pilotRepo.findById(id);

        if (!pilot)
            return { ok: false, error: new NotFound(id, 'Pilot') };

        return { ok: true, value: pilot };
    }

    async deletePilotById(id: number): Promise<Result<string>> {
        const isDeleted: boolean = await this.pilotRepo.deleteById(id);

        if(!isDeleted)
            return { ok: false, error: new NotFound(id, 'Pilot') }

        return { ok: true, value: "Delete Successful." }
    }
}