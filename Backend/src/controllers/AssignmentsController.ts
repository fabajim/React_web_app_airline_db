import { Request, Response } from "express";
import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { AssignmentDetailsServices } from "../services/AssignmentDetailsServices";
import { BadRequestError, HttpError } from "../shared/Errors";
import { createAssignmentDto } from "../dtos/assignmentDetails/CreateAssignmentDetailsDto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

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

    async UpdateAndCreateNewAssignment(req: Request, res: Response):
    Promise<Response<AssignmentDetailsDto>> {
        try {
            const id: number = Number(req.params.id)
            const updateDto: createAssignmentDto = plainToInstance(createAssignmentDto, req.body);
            const errors: ValidationError[] = await validate(updateDto);

            if (errors.length > 0 || isNaN(id)) {
                console.log(errors);
                throw new BadRequestError('Assignment');
            }

            const newAssignment: AssignmentDetailsDto = await this.service.createAssignmentDetail(id, updateDto);

            return res.status(201).json(newAssignment);
        }
        catch (error) {
            if (error instanceof HttpError)
                return res.status(error.statusCode).json({ name: error.name, message: error.message });
            console.log(error);
            return res.status(500).json({ message: `Server error failed to get assignments.` });
        }
    }
}