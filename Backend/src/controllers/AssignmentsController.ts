import { Request, Response } from "express";
import { AssignmentDetailsDto } from "../dtos/assignmentDetails/AssignmentDetailsDto";
import { AssignmentDetailsServices } from "../services/AssignmentDetailsServices";

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
            console.log(error);
            return res.status(500).json({ message: `Server error failed to get assignments.` })
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
            console.log(error);
            return res.status(500).json({ message: `Server error failed to get assignments.` })
        }
    }
}