import { Request, Response } from "express";
import { AircraftServices } from "../services/AircraftServices";
import { AircraftDto } from "../dtos/aircraft/AircraftDto";
import { Aircraft } from "../models/Aircraft";
import { AircraftMappers } from "../mappers/AircraftMappers";
import { CreateAircraftDto } from "../dtos/aircraft/CreateAircraftDto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export class AircraftController {
    constructor(private readonly service: AircraftServices) {}

    async getAll(req: Request, res: Response): Promise<Response<AircraftDto[]>> {
        try {
            const aircraft: Aircraft[] = await this.service.getAllAircraft();
            const aircraftDto: AircraftDto[] = AircraftMappers.toAircraftDtoList(aircraft)
            
            return res.status(200).json(aircraftDto);
        } catch (error) {
            return res.status(500).json({ message: `Server Error Failed to get Aircraft.` })
        }
    }

    async getById(req: Request, res: Response): Promise<Response<AircraftDto>> {
        try {
            const id: number = Number(req.params.id);

            if (isNaN(id))
                return res.status(400).json({ message: `Bad Request` })

            const aircraft: Aircraft = await this.service.getAircraftById(id);
            const aircraftDto: AircraftDto = AircraftMappers.toAircraftDto(aircraft);

            return res.status(200).json(aircraftDto);
        } catch (error) {
            if (error instanceof Error && error.name == 'NotFoundError') {
                return res.status(404).json({ message: `${error.message}`});
            }
            return res.status(500).json({ message: `Server Error failed to get Aircraft.` })
        }
    }

    async create(req: Request, res: Response): Promise<Response<AircraftDto>> {
        try {
            const aircraftDto: CreateAircraftDto = plainToInstance(CreateAircraftDto, req.body);
            const errors: ValidationError[] = await validate(aircraftDto);

            if (errors.length > 0)
                return res.status(400).json({ message: 'Bad Request Body.' });

            const aircraft: Aircraft = await this.service.createAircraft(aircraftDto);
            return res.status(201).json(AircraftMappers.toAircraftDto(aircraft));
        } catch (error) {
            console.log(`Error at Create: ${error}`);
            return res.status(500).json({ message: `Failed to add aircraft.` })
        }
    }
}