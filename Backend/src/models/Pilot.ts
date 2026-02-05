import { AssignmentDetails } from "./AssignmentDetails";
import { PilotLicense, PilotProps } from "./props/PilotProps"

export class Pilot {

    constructor(private props: PilotProps){}

    get id(): number | undefined {
        return this.props.pilotID;
    }

    get firstName(): string {
        return this.props.fname;
    }

    get lastName(): string {
        return this.props.lname;
    }

    get pilotEmail(): string {
        return this.props.email;
    }

    get pilotPhoneNumber(): string {
        return this.props.phoneNumber;
    }

    get pilotLicense(): PilotLicense[] {
        return this.props.licenses;
    }

    public hasLicense(licenseId: number): boolean {
        return this.props.licenses.some(l => 
            l.licenseID === licenseId
        );
    }

    public isAssigned(assignments: AssignmentDetails[]): boolean {
        return assignments.some(a => a.pilotId === this.props.pilotID);
    }
}