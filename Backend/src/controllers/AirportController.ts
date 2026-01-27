import { Request, Response } from "express";
import { AirportServices } from "../services/AirportServices";
import { AirportMappers } from "../mappers/AirportMApper";
import { parseIsHub } from "../helpers/validator/airportValidators";
import { CreateAirportDto } from "../dtos/airport/CreateAirportDto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Airport } from "../models/Airport";
import { AirportQueryObject } from "../helpers/queryObjects/AirportQueryObject";
import { UpdateAirportDto } from "../dtos/airport/UpdateAirportDto";
import { AirportDto } from "../dtos/airport/AirportDto";
import { BadRequestError, HttpError } from "../shared/Errors";


export class AirportController {
    constructor(private readonly service: AirportServices) {}

    async getAll(req: Request, res: Response): Promise<Response<AirportDto[]>> {
        try {
            const { city, cityCode, isHub } = req.query;

            const airportQuery: AirportQueryObject = {} 

            if (typeof city === 'string') airportQuery.city = city;

            if (typeof cityCode === 'string') airportQuery.cityCode = cityCode;
            
            if (typeof isHub === 'string') {
                airportQuery.isHub = parseIsHub(isHub);
            }

            const airports = await this.service.getAllAirports(airportQuery);
            const airportDto = AirportMappers.toAirportDtoList(airports);
            return res.status(200).json(airportDto)
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message })
            return res.status(500).json({ message: 'Failed to get all airports' })
        }
    }

    async create(req: Request, res: Response): Promise<Response<AirportDto>> {
        try {
            const airportDto: CreateAirportDto = plainToInstance(CreateAirportDto, req.body);
            const errors = await validate(airportDto);

            if (errors.length > 0) {
                throw new BadRequestError('Airport');
            }

            const airport: Airport = await this.service.createAirport(airportDto);
            return res.status(201).json(AirportMappers.toAirportDto(airport))
        } 
        catch (error) {
            return res.status(500).json({ message: `Failed to create new airport.` })
        }
    }

    async updateAirportById(req: Request, res: Response): Promise<Response<AirportDto>> {
        try {
            const id: number = Number(req.params.id)
            
            if (isNaN(id))
                return res.status(400).json({ message: 'Bad request Body.' })

            const airportDto: UpdateAirportDto = plainToInstance(UpdateAirportDto, req.body);
            const errors: ValidationError[] = await validate(airportDto);

            if (errors.length > 0)
                throw new BadRequestError('Airport');

            const updatedAirport: Airport = await this.service.updateAirport(id, airportDto);
            return res.status(201).json(AirportMappers.toAirportDto(updatedAirport));

        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message })
            return res.status(500).json({ message: `Server Error: Failed to update airport.` } )
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);

            if (isNaN(id))
                throw new BadRequestError('Airport id')

            await this.service.deleteAirportById(id);
            return res.status(200).json({ message: `Airport Deleted: ${id}` });
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server Error: Failed to Delete airport` });
        }
    }
}