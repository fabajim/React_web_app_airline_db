import { Request, Response } from "express";
import { PilotServices } from "../services/PilotServices"
import { PilotMappers } from "../mappers/PilotMappers";
import { plainToInstance } from 'class-transformer';
import { Validate, validate } from 'class-validator';
import { CreatePilotDto } from "../dtos/Pilot/CreatePilotDto";
import { Pilot } from "../models/Pilot";
import { PilotDto } from "../dtos/Pilot/PilotDto";
import { UpdatePilotDto } from "../dtos/Pilot/UpdatePilotDto";

export class PilotController {
    constructor(private readonly service: PilotServices) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const pilotDto: CreatePilotDto = plainToInstance(CreatePilotDto, req.body);
            const errors = await validate(pilotDto);

            if (errors.length > 0)
                return res.status(400).json({ message: `Bad request` });

            const pilot: Pilot = await this.service.createPilot(pilotDto);
            return res.status(201).json(PilotMappers.toPilotDto(pilot))
        } catch(error) {
            return res.status(500).json({ message: 'Server Error: Failed to create pilots.' })
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id)

            if (isNaN(id))
                return res.status(400).json({ message: 'Bad Request Body.' })            

            const pilotDto: UpdatePilotDto = plainToInstance(UpdatePilotDto, req.body);
            const errors = await validate(pilotDto);

            if (errors.length)
                return res.status(400).json({ message: `Bad request` });
            
            const pilot: Pilot = await this.service.updatePilot(id, pilotDto);
            return res.status(201).json(PilotMappers.toPilotDto(pilot))
        } catch (error) {
            return res.status(500).json({ message: 'Server Error: Failed to update pilots.' })
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const { fname, lname } = req.query;

            const pilotQuery: {fname?: string; lname?: string} = {};

            if (typeof fname === 'string') pilotQuery.fname = fname;
            if (typeof lname === 'string') pilotQuery.lname = lname;

            const pilots: Pilot[] = await this.service.getAllPilots(pilotQuery);
            const pilotDto: PilotDto[] = PilotMappers.toPilotDtoList(pilots);
            return res.status(200).json(pilotDto)
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get pilots.' })
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const value: number | any = Number(req.params.id);

        if (isNaN(value))
            return res.status(400).json({ message: 'Bad Request Body.' })
        
        console.log(value)

        try {
            const pilot: Pilot = await this.service.getPilotById(value);
            console.log('Pilot from service:', pilot);

            const pilotDto: PilotDto = PilotMappers.toPilotDto(pilot);
            return res.status(200).json(pilotDto)
        } catch (error) {
            console.error('ERROR in getById:', error);
            return res.status(500).json({ message: 'Failed to get pilot.' })
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try{
            const id: number = Number(req.params.id);

            if (isNaN(id)) 
                return res.status(400).json({ message: `Bad Request` });

            await this.service.deletePilotById(id);

            return res.status(200).json({ message: 'Pilot Deleted' })
        } catch (error) {
            if (error instanceof Error && error.name == 'NotFoundError')
                return res.status(404).json({ message: `Pilot not found` })
            return res.status(500).json({ message: 'Failed to delete pilot.'})
        }
    }
}