import { Request, Response } from "express";
import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { AssignmentDetailsServices } from "../services/AssignmentDetailsServices";
import { BadRequestError, HttpError } from "../shared/Errors";
import { CreateAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RemovePilotDto } from "../dtos/assignmentDetails/RemovePilotDto";
import { error } from "node:console";
import { AddPilotAssignmentDto } from "../dtos/assignmentDetails/AddPilotAssignmentDto";
import { UpdateAssignmentLocation } from "../dtos/assignmentDetails/UpdateAssignmentLocation";

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
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
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
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
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
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async getAssignmentVewById(req: Request, res: Response): 
    Promise<Response<AssignmentDetailsDto>> {
        try{
            const id: number = Number(req.params.id);

            if (isNaN(id))
                throw new BadRequestError('Assignment');

            const viewDto: AssignmentDetailsDto =
                await this.service.getByIdToView(id);
            
            return res.status(200).json(viewDto);
        }
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async createNewAssignment(req: Request, res: Response):
    Promise<Response<AssignmentDetailsDto>> {
        try {
            const newDto: CreateAssignmentDto = plainToInstance(CreateAssignmentDto, req.body);
            const errors: ValidationError[] = await validate(newDto);

            if (errors.length > 0) {
                console.log("Error found", errors)
                throw new BadRequestError('Assignment');
            }

            const newAssignment: AssignmentDetailsDto = await this.service.createAssignmentDetail(newDto);
            return res.status(201).json({ newAssignment });
        }
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server error failed to create assignments.` });
        }
    }

    async removePilotFromAssignment(req: Request, res: Response):
    Promise<Response<AssignmentDetailsDto>> {
        try {
            const currentId = Number(req.params.id);

            if (isNaN(currentId))
                throw new BadRequestError('Id missing from assignment.');

            const removeDto: RemovePilotDto = plainToInstance(RemovePilotDto, req.body);
            const errors: ValidationError[] = await validate(removeDto);

            if (errors.length > 0) 
                throw new BadRequestError('New Assignment DTO');

            const updatedAssignment: AssignmentDetailsDto = 
            await this.service.removePilotFromAssignment(currentId, removeDto); 
            
            return res.status(200).json({ updatedAssignment });
        }
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async addPilotToAssignment(req: Request, res: Response):
    Promise<Response<AssignmentDetailsDto>> {
        try {
            const assignmentId: number = Number(req.params.id);

            if (isNaN(assignmentId))
                throw new BadRequestError('Assignment Id needed.');

            const pilot: AddPilotAssignmentDto = plainToInstance(AddPilotAssignmentDto, req.body);
            const errors: ValidationError[] = await validate(pilot);

            if (errors.length > 0)
                throw new BadRequestError("Assignment data not valid.");

            const pilotAdded: AssignmentDetailsDto = await this.service.addPilot(assignmentId, pilot);
            return res.status(201).json({ pilotAdded })
        }
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }

    async updateAssignmentLocation(req: Request, res: Response):
    Promise<Response<AddPilotAssignmentDto>> {
        try {
            const assignmentId: number = Number(req.params.id);

            if (isNaN(assignmentId))
                throw new BadRequestError('Assignment Id needed.');

            const dto: UpdateAssignmentLocation = 
              plainToInstance(UpdateAssignmentLocation, req.body);
            
            const errors: ValidationError[] = await validate(dto);

            if (errors.length > 0)
                throw new BadRequestError('Assignment data not valid.')

            const newLocationDto: AssignmentDetailsDto = 
              await this.service.updateLocation(assignmentId,dto);
              
            return res.status(201).json({ newLocationDto });
        }
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }
}