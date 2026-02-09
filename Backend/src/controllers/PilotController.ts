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
import { Result } from "../responses/types";
import { BadRequest } from "../responses/Responses";

export class PilotController {
    constructor(private readonly service: PilotServices) {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const pilotDto: CreatePilotDto = plainToInstance(CreatePilotDto, req.body);
            const errors: ValidationError[] = await validate(pilotDto);

            if (errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const pilot: Pilot = await this.service.createPilot(pilotDto);
            return res.status(201).json(PilotMappers.toPilotDto(pilot));
        } 
        catch(error) {
            return res.status(500).json({ message: 'Server Error: Failed to create pilots.' });
        }
    }

    async updateById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);            
            const pilotDto: UpdatePilotDto = plainToInstance(UpdatePilotDto, req.body);
            const errors: ValidationError[] = await validate(pilotDto);

            if (isNaN(id) || errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }
            
            const result: Result<Pilot> = await this.service.updatePilot(id, pilotDto);

            if (!result.ok)
                return res.status(result.error.code).json(result);

            return res.status(201).json(PilotMappers.toPilotDto(result.value));
        } 
        catch (error) {
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
            return res.status(500).json({ message: 'Failed to get pilots.' });
        }
    }

    async getById(req: Request, res: Response): Promise<Response<PilotDto>> {
        try {
            const value: number | any = Number(req.params.id);

            if (isNaN(value)) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }
                

            const result: Result<Pilot> = await this.service.getPilotById(value);

            if (!result.ok)
                return res.status(result.error.code).json(result);

            const pilotDto: PilotDto =  PilotMappers.toPilotDto(result.value);
            return res.status(200).json(pilotDto);
        } 
        catch (error) {
            return res.status(500).json({ message: 'Server Error: Failed to get pilot.' });
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try{
            const id: number = Number(req.params.id);

            if (isNaN(id)) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }
                
            const result: Result<string> = await this.service.deletePilotById(id);

            if (!result.ok)
                return res.status(result.error.code).json(result);

            return res.status(200).json({ result });
        } 
        catch (error) {
            return res.status(500).json({ message: 'Server Error: Failed to delete pilot.'});
        }
    }
}