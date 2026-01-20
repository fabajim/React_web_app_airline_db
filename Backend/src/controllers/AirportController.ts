import { Request, Response } from "express";
import { AirportServices } from "../services/AirportServices";
import { AirportMappers } from "../mappers/AirportMApper";
import { parseIsHub } from "../helpers/validator/airpoirtValidators";

export class AirportController {
    constructor(private readonly service: AirportServices) {}

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const { city, cityCode, isHub } = req.query;

            const airportQuery: {city?: string; cityCode?: string; isHub?: number} = {} 

            if (typeof city === 'string') airportQuery.city = city;

            if (typeof cityCode === 'string') airportQuery.cityCode = cityCode;

            if (typeof isHub === 'string') {
                airportQuery.isHub = parseIsHub(isHub);
            }

            const airports = await this.service.getAllAirports(airportQuery);
            const airportDto = AirportMappers.toAirportDtoList(airports);
            return res.status(200).json(airportDto)
        } catch (error) {
            if (error instanceof Error && error.name === 'BadRequestError')
                return res.status(400).json({ message: error.message })
            return res.status(500).json({ message: 'Failed to get all airports' })
        }
    }
}