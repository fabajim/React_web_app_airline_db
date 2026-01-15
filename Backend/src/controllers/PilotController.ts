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

    async getById(req: Request, res: Response): Promise<Response> {
        const value = Number(req.params.id);

        if (isNaN(value)) {
            return res.status(400).json({ message: 'Bad Request Body.' })
        }
        console.log(value)

        try {
            const pilot = await this.service.getPilotById(value);
            console.log('Pilot from service:', pilot);

            const pilotDto = PilotMappers.toPilotDto(pilot);
            return res.status(200).json(pilotDto)
        } catch (error) {
            console.error('ERROR in getById:', error);
            return res.status(500).json({ message: 'Failed to get pilot.' })
        }
    }
}