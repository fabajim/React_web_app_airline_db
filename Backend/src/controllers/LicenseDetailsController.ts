import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { CreateLicenseDetailsDto } from "../dtos/licenseDetails/CreateLicenseDetailsDto";
import { LicenseDetailsServices } from "../services/LicenseDetailsServices";
import { validate, ValidationError } from "class-validator";
import { LicenseDetailsDto } from "../dtos/licenseDetails/LicenseDetailDto";
import { LicenseDetailsMapper } from "../mappers/LicenseDetailsMapper";
import { LicenseDetails } from "../models/LicenseDetails";
import { BadRequest } from "../responses/Responses";
import { Result } from "../responses/types";

export class LicenseDetailsController {
    constructor(private readonly service: LicenseDetailsServices) {}

    async create(req: Request, res: Response): Promise<Response<LicenseDetailsDto>> {
        try {
            const createLicenseDetailDto: CreateLicenseDetailsDto = 
              plainToInstance(CreateLicenseDetailsDto, req.body);
            const errors: ValidationError[] = await validate(createLicenseDetailDto);

            if (errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const licenseDetail: Result<LicenseDetails> = 
              await this.service.createLicenseDetail(
              createLicenseDetailDto,
              Number(createLicenseDetailDto.pilotID),
              Number(createLicenseDetailDto.licenseID));
            
            if (!licenseDetail.ok)
                return res.status(licenseDetail.error.code).json(licenseDetail);
            
            return res.status(201).json(LicenseDetailsMapper.toLicenseDetailsDto(licenseDetail.value));
        } 
        catch (error) {
            return res.status(500).json({ message: 'Server Error: Could not add license to pilot.' });
        }
    }
}