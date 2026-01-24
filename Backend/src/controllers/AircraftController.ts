import { Request, Response } from "express";
import { AircraftServices } from "../services/AircraftServices";
import { AircraftDto } from "../dtos/aircraft/AircraftDto";
import { Aircraft } from "../models/Aircraft";
import { AircraftMappers } from "../mappers/AircraftMappers";

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
}