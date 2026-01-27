import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { CreateLicenseDetailsDto } from "../dtos/licenseDetails/CreateLicenseDetailsDto";
import { LicenseDetailsServices } from "../services/LicenseDetailsServices";
import { validate, ValidationError } from "class-validator";
import { LicenseDetailsDto } from "../dtos/licenseDetails/LicenseDetailDto";
import { LicenseDetailsMapper } from "../mappers/LicenseDetailsMapper";
import { LicenseDetails } from "../models/LicenseDetails";
import { BadRequestError, HttpError } from "../shared/Errors";

export class LicenseDetailsController {
    constructor(private readonly service: LicenseDetailsServices) {}

    async create(req: Request, res: Response): Promise<Response<LicenseDetailsDto>> {
        try {
            const createLicenseDetailDto: CreateLicenseDetailsDto = 
              plainToInstance(CreateLicenseDetailsDto, req.body);
            const errors: ValidationError[] = await validate(createLicenseDetailDto);

            if (errors.length > 0) 
                throw new BadRequestError('LicenseDetail');

            const licenseDetail: LicenseDetails = await this.service.createLicenseDetail(createLicenseDetailDto,
                Number(createLicenseDetailDto.pilotID), Number(createLicenseDetailDto.licenseID));
            
            return res.status(201).json(LicenseDetailsMapper.toLicenseDetailsDto(licenseDetail));
        } 
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            console.log(error);
            return res.status(500).json({ message: 'Server Error: Could not add license to pilot.' });
        }
    }
}