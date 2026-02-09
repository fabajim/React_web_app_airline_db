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
import { Result } from "../responses/types";
import { BadRequest, HTTP_Error_Response } from "../responses/Responses";


export class AirportController {
    constructor(private readonly service: AirportServices) {}

    async getAll(req: Request, res: Response): Promise<Response<AirportDto[]>> {
        try {
            const { city, cityCode, isHub } = req.query;

            const airportQuery: AirportQueryObject = {} 

            if (typeof city === 'string') airportQuery.city = city;

            if (typeof cityCode === 'string') airportQuery.cityCode = cityCode;
            
            if (typeof isHub === 'string') {
                const value: Result<0|1> = parseIsHub(isHub);

                if (!value.ok) {
                    const err: HTTP_Error_Response = value.error;
                    return res.status(err.code).json(err)
                }
                airportQuery.isHub = value.value
            }

            const airports = await this.service.getAllAirports(airportQuery);
            const airportDto = AirportMappers.toAirportDtoList(airports);
            return res.status(200).json(airportDto)
        } 
        catch (error) {
            return res.status(500).json({ message: 'Failed to get all airports' })
        }
    }

    async create(req: Request, res: Response): Promise<Response<AirportDto>> {
        try {
            const airportDto: CreateAirportDto = plainToInstance(CreateAirportDto, req.body);
            const errors = await validate(airportDto);

            if (errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
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
            
            if (isNaN(id)) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const airportDto: UpdateAirportDto = plainToInstance(UpdateAirportDto, req.body);
            const errors: ValidationError[] = await validate(airportDto);

            if (errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const result: Result<Airport> = await this.service.updateAirport(id, airportDto);
            
            if (!result.ok)
                return res.status(result.error.code).json(result);

            return res.status(201).json(AirportMappers.toAirportDto(result.value));

        } 
        catch (error) {
            return res.status(500).json({ message: `Server Error: Failed to update airport.` } )
        }
    }

    async deleteById(req: Request, res: Response): Promise<Response> {
        try {
            const id: number = Number(req.params.id);

            if (isNaN(id)) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const result: Result<string> = await this.service.deleteAirportById(id);

            if (!result.ok)
                return res.status(result.error.code).json(result);

            return res.status(200).json(result);
        } 
        catch (error) {
            return res.status(500).json({ message: `Server Error: Failed to Delete airport` });
        }
    }
}