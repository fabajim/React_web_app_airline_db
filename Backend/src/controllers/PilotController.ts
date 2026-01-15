import { Request, Response } from "express";
import { PilotServices } from "../services/PilotServices"
import { PilotMappers } from "../mappers/PilotMappers";

export class PilotController {
    constructor(private readonly service: PilotServices) {}

    async create(req: Request, res: Response) {
        try {
            const pilot = await this.service.createPilot(req.body);
            res.status(201).json(pilot);
        } catch (error) {
            return res.status(500).json({ message: 'Failed to create pilot.' })
        }

    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const pilots = await this.service.getAllPilots();
            const pilotDto = PilotMappers.toPilotDtoList(pilots);
            return res.status(200).json(pilotDto)
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get pilots.' })
        }
    }
}