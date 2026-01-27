import { Request, Response } from "express";
import { AircraftServices } from "../services/AircraftServices";
import { AircraftDto } from "../dtos/aircraft/AircraftDto";
import { Aircraft } from "../models/Aircraft";
import { AircraftMappers } from "../mappers/AircraftMappers";
import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { UpdateAircraftDto } from "../dtos/aircraft/UpdateAircraftDto";
import { BadRequestError, HttpError } from "../shared/Errors";

export class AircraftController {
    constructor(private readonly service: AircraftServices) {}

    async getAll(req: Request, res: Response): Promise<Response<AircraftDto[]>> {
        try {
            const aircraft: Aircraft[] = await this.service.getAllAircraft();
            const aircraftDto: AircraftDto[] = AircraftMappers.toAircraftDtoList(aircraft)
            
            return res.status(200).json(aircraftDto);
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message })
            return res.status(500).json({ message: `Server Error Failed to get Aircraft.` })
        }
    }

    async getById(req: Request, res: Response): Promise<Response<AircraftDto>> {
        try {
            const id: number = Number(req.params.id);

            if (isNaN(id))
                throw new BadRequestError('Aircraft id');

            const aircraft: Aircraft = await this.service.getAircraftById(id);
            const aircraftDto: AircraftDto = AircraftMappers.toAircraftDto(aircraft);

            return res.status(200).json(aircraftDto);
        } 
        catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.statusCode).json({ name: error.name, message: error.message});
            }
            return res.status(500).json({ message: `Server Error failed to get Aircraft.` })
        }
    }

    async create(req: Request, res: Response): Promise<Response<AircraftDto>> {
        try {
            const aircraftDto: CreateAircraftDto = plainToInstance(CreateAircraftDto, req.body);
            const errors: ValidationError[] = await validate(aircraftDto);

            if (errors.length > 0)
                throw new BadRequestError('Aircraft')

            const aircraft: Aircraft = await this.service.createAircraft(aircraftDto);
            return res.status(201).json(AircraftMappers.toAircraftDto(aircraft));
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server Error: Failed to add aircraft.` })
        }
    }

    async updateAircraft(req: Request, res: Response): Promise<Response<AircraftDto>> {
        try {
            const updateDto: UpdateAircraftDto = plainToInstance(UpdateAircraftDto, req.body);
            const errors: ValidationError[] = await validate(updateDto);
            const id: number = Number(req.params.id);

            if (errors.length > 0 || isNaN(id))
                throw new BadRequestError('Aircraft');

            const aircraft: Aircraft = await this.service.UpdateAircraftById(id, updateDto);

            return res.status(201).json(AircraftMappers.toAircraftDto(aircraft));
        } 
        catch (error) {
            if (error instanceof HttpError) 
                return res.status(error.statusCode).json({ name: error.name ,message: error.message });
            return res.status(500).json({ message: `Server error Failed to update aircraft.` })
        }
    }
}