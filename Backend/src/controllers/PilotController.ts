import { Request, Response } from "express";
import { PilotServices } from "../services/PilotServices"
import { PilotMappers } from "../mappers/PilotMappers";
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { CreatePilotDto } from "../dtos/Pilot/CreatePilotDto";
import { Pilot } from "../models/Pilot";
import { PilotDto } from "../dtos/Pilot/PilotDto";
import { UpdatePilotDto } from "../dtos/Pilot/UpdatePilotDto";
import { PilotQueryObject } from "../helpers/queryObjects/PilotQueryObject";
import { BadRequestError, HttpError } from "../shared/Errors";

export class PilotController {
    constructor(private readonly service: PilotServices) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const pilotDto: CreatePilotDto = plainToInstance(CreatePilotDto, req.body);
            const errors: ValidationError[] = await validate(pilotDto);

            if (errors.length > 0)
                throw new BadRequestError('Pilot');

            const pilot: Pilot = await this.service.createPilot(pilotDto);
            return res.status(201).json(PilotMappers.toPilotDto(pilot));
        } 
        catch(error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({name: error.name, message: error.message});
            return res.status(500).json({ message: 'Server Error: Failed to create pilots.' });
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);            
            const pilotDto: UpdatePilotDto = plainToInstance(UpdatePilotDto, req.body);
            const errors: ValidationError[] = await validate(pilotDto);

            if (errors.length > 0 || isNaN(id))
                throw new BadRequestError('Pilot');
            
            const pilot: Pilot = await this.service.updatePilot(id, pilotDto);
            return res.status(201).json(PilotMappers.toPilotDto(pilot));
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({name: error.name, message: error.message});
            return res.status(500).json({ message: 'Server Error: Failed to update pilots.' });
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const { fname, lname } = req.query;

            const pilotQuery: PilotQueryObject = {};

            if (typeof fname === 'string') pilotQuery.fname = fname;
            if (typeof lname === 'string') pilotQuery.lname = lname;

            const pilots: Pilot[] = await this.service.getAllPilots(pilotQuery);
            const pilotDto: PilotDto[] = PilotMappers.toPilotDtoList(pilots);
            return res.status(200).json(pilotDto)
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({name: error.name, message: error.message});
            return res.status(500).json({ message: 'Failed to get pilots.' });
        }
    }

    async getById(req: Request, res: Response): Promise<Response> {
        try {
            const value: number | any = Number(req.params.id);

            if (isNaN(value))
                throw new BadRequestError('Pilot id');

            const pilot: Pilot = await this.service.getPilotById(value);

            const pilotDto: PilotDto = PilotMappers.toPilotDto(pilot);
            return res.status(200).json(pilotDto);
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({name: error.name, message: error.message});
            return res.status(500).json({ message: 'Failed to get pilot.' });
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try{
            const id: number = Number(req.params.id);

            if (isNaN(id)) 
                throw new BadRequestError('Pilot id');

            await this.service.deletePilotById(id);

            return res.status(200).json({ message: 'Pilot Deleted' });
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({name: error.name, message: error.message});
            return res.status(500).json({ message: 'Failed to delete pilot.'});
        }
    }
}