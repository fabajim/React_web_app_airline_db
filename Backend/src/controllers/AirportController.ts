import { Request, Response } from "express";
import { AirportServices } from "../services/AirportServices";
import { AirportMappers } from "../mappers/AirportMApper";

export class AirportController {
    constructor(private readonly service: AirportServices) {}

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const airports = await this.service.getAllAirports();
            const airportDto = AirportMappers.toAirportDtoList(airports);
            return res.status(200).json(airportDto)
        } catch (error) {
            return res.status(500).json({ message: 'Failed to get all airports' })
        }
    }
}