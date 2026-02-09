import { Request, Response } from "express";
import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { AssignmentDetailsServices } from "../services/AssignmentDetailsServices";
import { CreateAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RemovePilotDto } from "../dtos/assignmentDetails/RemovePilotDto";
import { error } from "node:console";
import { AddPilotAssignmentDto } from "../dtos/assignmentDetails/AddPilotAssignmentDto";
import { UpdateAssignmentLocation } from "../dtos/assignmentDetails/UpdateAssignmentLocation";
import { BadRequest, HTTP_Error_Response } from "../responses/Responses";
import { Result } from "../responses/types";

export class AssignmentsController {
    constructor(private readonly service: AssignmentDetailsServices) {}

    async getAllView(req: Request, res: Response): 
    Promise<Response<AssignmentDetailsDto[]>> {
        try{
            const assignmentsDto: 
              AssignmentDetailsDto[] = await this.service.getAllAssignmentsToView();

            return res.status(200).json(assignmentsDto);
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async getAllActiveView(req: Request, res: Response): 
    Promise<Response<AssignmentDetailsDto[]>> {
        try{
            const assignmentsDto: 
              AssignmentDetailsDto[] = await this.service.getActiveAssignmentsToView();

            return res.status(200).json(assignmentsDto);
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async getAllNeedsPilotView(req: Request, res: Response): 
    Promise<Response<AssignmentDetailsDto[]>> {
        try{
            const assignmentsDto: 
              AssignmentDetailsDto[] = await this.service.getPilotNeededToView();

            return res.status(200).json(assignmentsDto);
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async getAssignmentVewById(req: Request, res: Response): 
    Promise<Response<AssignmentDetailsDto>> {
        try{
            const id: number = Number(req.params.id);

            if (isNaN(id)) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const viewDto: Result<AssignmentDetailsDto> =
                await this.service.getByIdToView(id);
            
            if(!viewDto.ok) {
                const err: HTTP_Error_Response = viewDto.error;
                return res.status(err.code).json(err);
            }
            
            return res.status(200).json(viewDto.value);
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async createNewAssignment(req: Request, res: Response):
    Promise<Response<AssignmentDetailsDto>> {
        try {
            const newDto: CreateAssignmentDto = plainToInstance(CreateAssignmentDto, req.body);
            const errors: ValidationError[] = await validate(newDto);

            if (errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const newAssignment: Result<AssignmentDetailsDto> = 
              await this.service.createAssignmentDetail(newDto);
            
            if (!newAssignment.ok) {
                const err: HTTP_Error_Response = newAssignment.error
                return res.status(err.code).json(err);
            }  
              
            return res.status(201).json( newAssignment.value );
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to create assignments.` });
        }
    }

    async removePilotFromAssignment(req: Request, res: Response):
    Promise<Response<AssignmentDetailsDto>> {
        try {
            const id = Number(req.params.id);

            const removeDto: RemovePilotDto = plainToInstance(RemovePilotDto, req.body);
            const errors: ValidationError[] = await validate(removeDto);

            if (isNaN(id)  ||errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const updatedDto: Result<AssignmentDetailsDto> = 
              await this.service.removePilotFromAssignment(id, removeDto);
              
            if (!updatedDto.ok)
                return res.status(updatedDto.error.code).json(updatedDto.error);
            
            return res.status(200).json(updatedDto.value);
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async addPilotToAssignment(req: Request, res: Response):
    Promise<Response<AssignmentDetailsDto>> {
        try {
            const id: number = Number(req.params.id);
            const pilot: AddPilotAssignmentDto = plainToInstance(AddPilotAssignmentDto, req.body);
            const errors: ValidationError[] = await validate(pilot);

            if (isNaN(id)  || errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const pilotAdded: Result<AssignmentDetailsDto> = 
              await this.service.addPilot(id, pilot);
            
            if (!pilotAdded.ok) {
                const err: HTTP_Error_Response = pilotAdded.error
                return res.status(err.code).json(err)
            }

            return res.status(201).json( pilotAdded.value )
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async updateAssignmentLocation(req: Request, res: Response):
    Promise<Response<AddPilotAssignmentDto>> {
        try {
            const id: number = Number(req.params.id);
            const dto: UpdateAssignmentLocation = 
              plainToInstance(UpdateAssignmentLocation, req.body);
            const errors: ValidationError[] = await validate(dto);

            if (isNaN(id)  ||errors.length > 0) {
                const response: BadRequest = new BadRequest();
                return res.status(response.code).json(response);
            }

            const newLocationDto: Result<AssignmentDetailsDto> = 
              await this.service.updateLocation(id, dto);

            if (!newLocationDto.ok) {
                const err: HTTP_Error_Response = newLocationDto.error;
                return res.status(err.code).json(err);
            }
              
            return res.status(201).json( newLocationDto.value );
        }
        catch (error) {
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }
}