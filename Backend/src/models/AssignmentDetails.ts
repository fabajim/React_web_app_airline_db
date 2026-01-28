import { AssignmentDetailsProps } from "./props/AssignmentDetailsProps";

export class AssignmentDetails {
    constructor(private props: AssignmentDetailsProps) {}

    get assignmentId(): number {
        return this.props.assignmentId;
    }

    get pilotId(): number {
        return this.props.pilotId;
    }

    get aircraftId(): number {
        return this.props.aircraftId;
    }

    get airportId(): number {
        return this.props.airportId;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }
}