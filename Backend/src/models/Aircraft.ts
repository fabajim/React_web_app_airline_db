import { AircraftTypeInfo } from "../dtos/aircraft/AircraftDto";
import { AssignmentDetails } from "./AssignmentDetails";
import { AircraftProps } from "./props/AircraftProps";

export class Aircraft {
    constructor(private props: AircraftProps) {}

    get aircraftId(): number {
        return this.props.aircraftID;
    }

    get serialNumber(): string {
        return this.props.serialNum;
    }

    get lastServiceDate(): Date {
        return this.props.lastService;
    }

    get hoursFlown(): number {
        return this.props.totalHourFlown;
    }

    get make(): string {
        return this.props.typeInfo.make
    }

    get model(): string {
        return this.props.typeInfo.model
    }

    get licenseNeeded(): number {
        return this.props.typeInfo.licenseNeeded
    }

    public getTypeInfo(): AircraftTypeInfo {
        return this.props.typeInfo;
    }

    public isAssigned(assignments: AssignmentDetails[]): boolean {
        return assignments.some(a => a.aircraftId === this.props.aircraftID)
    }

}